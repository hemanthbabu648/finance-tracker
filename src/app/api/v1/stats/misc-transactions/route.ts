import { NextRequest, NextResponse } from "next/server";

import { ApiStatus, ApiStatusCode } from "@/types";
import { ApiErrorResponse, ApiSuccessResponse } from "@/utils/responses";
import { getAuthUserDetails } from "@/utils/supabase/db";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
    try {
        const user = await getAuthUserDetails();

        if (!user) {
            return NextResponse.json(new ApiErrorResponse(ApiStatusCode.UNAUTHORIZED, ApiStatus.UNAUTHORIZED, 'Authorization failed.'));
        }

        const transactionType = req.nextUrl.searchParams.get('transactionType');
        if (!transactionType) return NextResponse.json(new ApiErrorResponse(ApiStatusCode.BAD_REQUEST, ApiStatus.BAD_REQUEST, 'Missing transactionType'));

        const supabase = await createClient();

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

        // Current Month
        const { data: currentMonthData, error: currentMonthError } = await supabase
            .from("misc_transactions")
            .select("*")
            .eq("userId", user.id)
            .gte("createdAt", startOfMonth.toISOString())
            .lte("createdAt", endOfMonth.toISOString())
            .order("amount", { ascending: true })
            .match({ transactionType })
            .limit(100);

        // Last Month
        const { data: lastMonthData, error: lastMonthError } = await supabase
            .from("misc_transactions")
            .select("*")
            .eq("userId", user.id)
            .gte("createdAt", startOfLastMonth.toISOString())
            .lte("createdAt", endOfLastMonth.toISOString())
            .order("amount", { ascending: true })
            .match({ transactionType })
            .limit(100);

        if (currentMonthError || lastMonthError) {
            return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch transactions.'));
        }

        // Current Month Overview
        const currentMonthOverview = {
            sent: 0,
            received: 0,
            remaining: 0
        }

        currentMonthData?.forEach(transaction => {
            if (transaction.transactionSubType === "TAKEN") {
                currentMonthOverview.received += transaction.amount || 0;
            }
            else if (transaction.transactionSubType === "RETURNED") {
                currentMonthOverview.sent += transaction.amount || 0;
            }
            else if (transaction.transactionSubType === "GIVEN") {
                currentMonthOverview.sent += transaction.amount || 0;
            } else if (transaction.transactionSubType === "RECEIVED") {
                currentMonthOverview.received += transaction.amount || 0;
            }
        });

        if (transactionType === "BORROW") {
            currentMonthOverview.remaining = currentMonthOverview.received - currentMonthOverview.sent;
        } else {
            currentMonthOverview.remaining = currentMonthOverview.sent - currentMonthOverview.received;
        }

        // Last Month Overview
        const lastMonthOverview = {
            sent: 0,
            received: 0,
            remaining: 0
        }

        lastMonthData?.forEach(transaction => {
            if (transaction.transactionSubType === "TAKEN") {
                lastMonthOverview.received += transaction.amount || 0;
            }
            else if (transaction.transactionSubType === "RETURNED") {
                lastMonthOverview.sent += transaction.amount || 0;
            }
            else if (transaction.transactionSubType === "GIVEN") {
                lastMonthOverview.sent += transaction.amount || 0;
            } else if (transaction.transactionSubType === "RECEIVED") {
                lastMonthOverview.received += transaction.amount || 0;
            }
        });

        if (transactionType === "BORROW") {
            lastMonthOverview.remaining = lastMonthOverview.received - lastMonthOverview.sent;
        } else {
            lastMonthOverview.remaining = lastMonthOverview.sent - lastMonthOverview.received;
        }

        return NextResponse.json(new ApiSuccessResponse(ApiStatusCode.OK, ApiStatus.OK, 'Fetched Transaction Stats', {
            currentMonth: currentMonthOverview,
            lastMonth: lastMonthOverview
        }));
    } catch (error) {
        return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch transaction stats.', error));
    }
}
