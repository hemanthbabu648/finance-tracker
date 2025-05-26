import { NextRequest, NextResponse } from 'next/server';

import { ApiStatus, ApiStatusCode } from '@/types';
import { ApiErrorResponse, ApiSuccessResponse } from '@/utils/responses';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const authUserId = url.searchParams.get('id');

    if (!authUserId) {
      return NextResponse.json(
        new ApiErrorResponse(
          ApiStatusCode.UNAUTHORIZED,
          ApiStatus.UNAUTHORIZED,
          'Authorization failed.',
        ),
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('accounts')
      .select(`*, user_profiles(*)`)
      .eq('userId', authUserId)
      .limit(100);

    if (error) {
      return NextResponse.json(
        new ApiErrorResponse(
          ApiStatusCode.INTERNAL_SERVER_ERROR,
          ApiStatus.INTERNAL_SERVER_ERROR,
          error.message,
          error,
        ),
      );
    }

    return NextResponse.json(
      new ApiSuccessResponse(
        ApiStatusCode.OK,
        ApiStatus.OK,
        'Fetched user accounts',
        data,
      ),
    );
  } catch (error) {
    return NextResponse.json(
      new ApiErrorResponse(
        ApiStatusCode.INTERNAL_SERVER_ERROR,
        ApiStatus.INTERNAL_SERVER_ERROR,
        JSON.stringify(error),
        error,
      ),
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accountName, accountType, initialAmount, userId } = body;

    if (!userId) {
      return NextResponse.json(
        new ApiErrorResponse(
          ApiStatusCode.UNAUTHORIZED,
          ApiStatus.UNAUTHORIZED,
          'Authorization failed.',
        ),
      );
    }

    if (!accountName || !accountType) {
      return NextResponse.json(
        new ApiErrorResponse(
          ApiStatusCode.BAD_REQUEST,
          ApiStatus.BAD_REQUEST,
          'Missing fields accountName, accountType',
        ),
      );
    }

    if (initialAmount < 0) {
      return NextResponse.json(
        new ApiErrorResponse(
          ApiStatusCode.BAD_REQUEST,
          ApiStatus.BAD_REQUEST,
          "Initial Amount Can't be less than zero (0)",
        ),
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('accounts')
      .insert([
        {
          userId: userId,
          accountName: accountName,
          accountType: accountType,
          amount: initialAmount,
          createdAt: new Date(),
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        new ApiErrorResponse(
          ApiStatusCode.INTERNAL_SERVER_ERROR,
          ApiStatus.INTERNAL_SERVER_ERROR,
          error.message,
          error,
        ),
      );
    }

    return NextResponse.json(
      new ApiSuccessResponse(
        ApiStatusCode.CREATED,
        ApiStatus.CREATED,
        'Account created successfully',
        data,
      ),
    );
  } catch (error) {
    return NextResponse.json(
      new ApiErrorResponse(
        ApiStatusCode.INTERNAL_SERVER_ERROR,
        ApiStatus.INTERNAL_SERVER_ERROR,
        JSON.stringify(error),
        error,
      ),
    );
  }
}
