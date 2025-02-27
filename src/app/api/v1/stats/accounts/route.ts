import { ApiStatus, ApiStatusCode } from "@/types";
import { ApiErrorResponse, ApiSuccessResponse } from "@/utils/responses";
import { getAuthUserDetails } from "@/utils/supabase/db";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await getAuthUserDetails();

        if (!user) {
            return NextResponse.json(new ApiErrorResponse(ApiStatusCode.UNAUTHORIZED, ApiStatus.UNAUTHORIZED, 'Authorization failed.'));
        }

        const supabase = await createClient();
        const { data, error } = await supabase
            .from("accounts")
            .select("*")
            .eq("userId", user.id)
            .limit(100);

        if (error) {
            return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch accounts.'));
        }

        const balance = {
            savings: 0,
            current: 0,
            creditCard: 0,
            total: 0
        }

        data?.forEach(account => {
            balance.total += account.amount || 0;
            if (account.accountType === "SAVINGS") {
                balance.savings += account.amount || 0;
            } else if (account.accountType === "CREDIT CARD") {
                balance.creditCard += account.amount || 0;
            } else {
                balance.current += account.amount || 0;
            }
        });
        return NextResponse.json(new ApiSuccessResponse(ApiStatusCode.OK, ApiStatus.OK, 'Fetched Accounts Stats', balance));
    } catch (error) {
        return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch accounts stats.', error));
    }
}
