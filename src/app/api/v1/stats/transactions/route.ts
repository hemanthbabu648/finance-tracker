import { NextRequest, NextResponse } from 'next/server';

import { ApiStatus, ApiStatusCode } from '@/types';
import { ApiErrorResponse, ApiSuccessResponse } from '@/utils/responses';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const userId = url.searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        new ApiErrorResponse(
          ApiStatusCode.UNAUTHORIZED,
          ApiStatus.UNAUTHORIZED,
          'Authorization failed.',
        ),
      );
    }

    const supabase = await createClient();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    ); // Last day of current month
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999,
    );

    // Current Month
    const { data: currentMonthData, error: currentMonthError } = await supabase
      .from('transactions')
      .select('*')
      .eq('userId', userId)
      .gte('createdAt', startOfMonth.toISOString())
      .lte('createdAt', endOfMonth.toISOString())
      .order('amount', { ascending: true })
      .limit(100);

    // Last Month
    const { data: lastMonthData, error: lastMonthError } = await supabase
      .from('transactions')
      .select('*')
      .eq('userId', userId)
      .gte('createdAt', startOfLastMonth.toISOString())
      .lte('createdAt', endOfLastMonth.toISOString())
      .order('amount', { ascending: true })
      .limit(100);

    if (currentMonthError || lastMonthError) {
      return NextResponse.json(
        new ApiErrorResponse(
          ApiStatusCode.INTERNAL_SERVER_ERROR,
          ApiStatus.INTERNAL_SERVER_ERROR,
          'Failed to fetch transactions.',
        ),
      );
    }

    //  // Current Month Overview
    const currentMonthOverview = {
      income: 0,
      expenses: 0,
      savings: 0,
      remaining: 0,
    };

    currentMonthData?.forEach((transaction) => {
      if (transaction.transactionType === 'TRANSFER') {
        if (
          transaction.accountId === transaction.toAccountId ||
          transaction.toAccountId === transaction.accountId
        ) {
          return;
        }
      } else if (
        transaction.transactionType === 'TRANSFER' &&
        transaction.category === 'SAVINGS'
      ) {
        currentMonthOverview.savings += transaction.amount || 0;
      } else if (transaction.transactionType === 'INCOME') {
        currentMonthOverview.income += transaction.amount || 0;
      } else {
        currentMonthOverview.expenses += transaction.amount || 0;
      }
    });
    currentMonthOverview.remaining =
      currentMonthOverview.income - currentMonthOverview.expenses;

    // Last Month Overview
    const lastMonthOverview = {
      income: 0,
      expenses: 0,
      savings: 0,
      remaining: 0,
    };

    lastMonthData?.forEach((transaction) => {
      if (transaction.transactionType === 'TRANSFER') {
        if (
          transaction.accountId === transaction.toAccountId ||
          transaction.toAccountId === transaction.accountId
        ) {
          return;
        }
      } else if (
        transaction.transactionType === 'TRANSFER' &&
        transaction.category === 'SAVINGS'
      ) {
        lastMonthOverview.savings += transaction.amount || 0;
      } else if (transaction.transactionType === 'INCOME') {
        lastMonthOverview.income += transaction.amount || 0;
      } else {
        lastMonthOverview.expenses += transaction.amount || 0;
      }
    });

    lastMonthOverview.remaining =
      lastMonthOverview.income - lastMonthOverview.expenses;
    return NextResponse.json(
      new ApiSuccessResponse(
        ApiStatusCode.OK,
        ApiStatus.OK,
        'Fetched Transaction Stats',
        {
          currentMonthOverview,
          lastMonthOverview,
        },
      ),
    );
  } catch (error) {
    return NextResponse.json(
      new ApiErrorResponse(
        ApiStatusCode.INTERNAL_SERVER_ERROR,
        ApiStatus.INTERNAL_SERVER_ERROR,
        'Failed to fetch transaction stats.',
        error,
      ),
    );
  }
}
