import { ApiStatus, ApiStatusCode } from "@/types";
import { ApiErrorResponse, ApiSuccessResponse } from "@/utils/responses";
import { getAuthUserDetails } from "@/utils/supabase/db";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/supabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

async function updateAccountAmount(accountId: string, amountChange: number) {
    const { data: account, error: accountError } = await supabaseAdmin
        .from("accounts")
        .select("amount")
        .eq("id", accountId)
        .single();

    if (accountError || !account) {
        throw new Error("Failed to fetch account");
    }

    const updatedAmount = account.amount + amountChange;
    const { error: updateError } = await supabaseAdmin
        .from("accounts")
        .update({ amount: updatedAmount })
        .eq("id", accountId);

    if (updateError) {
        throw new Error("Failed to update account amount");
    }
}

export async function GET(req: NextRequest) {
    try {
        const user = await getAuthUserDetails();
        if (!user) return NextResponse.json(new ApiErrorResponse(ApiStatusCode.UNAUTHORIZED, ApiStatus.UNAUTHORIZED, 'Authorization failed.'));

        const transactionType = req.nextUrl.searchParams.get('transactionType');
        if (!transactionType) return NextResponse.json(new ApiErrorResponse(ApiStatusCode.BAD_REQUEST, ApiStatus.BAD_REQUEST, 'Missing transactionType'));

        // TODO: Implement pagination
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("misc_transactions")
            .select("*")
            .eq("userId", user.id)
            .match({ transactionType })
            .limit(100);

        if (error) throw new Error("Failed to fetch transactions");

        return NextResponse.json(new ApiSuccessResponse(ApiStatusCode.OK, ApiStatus.OK, 'Fetched Transactions Successfully', data));
    } catch (error) {
        return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch transactions.', error));
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await getAuthUserDetails();
        if (!user) return NextResponse.json(new ApiErrorResponse(ApiStatusCode.UNAUTHORIZED, ApiStatus.UNAUTHORIZED, 'Authorization failed.'));

        const body = await req.json();
        const { transactionType, transactionSubType, accountId, category, amount, note, createdAt, returnAt, takenFrom, returnedTo, givenTo, receivedFrom } = body;

        if (!accountId || !category || !note || !amount || !createdAt) {
            return NextResponse.json(new ApiErrorResponse(ApiStatusCode.BAD_REQUEST, ApiStatus.BAD_REQUEST, 'Missing required fields'));
        }

        const supabase = await createClient();
        let personName, status, amountChange, returnDate;

        if (transactionType === "BORROW") {
            if (transactionSubType === "TAKEN" && takenFrom && returnAt) {
                personName = takenFrom;
                status = "RECEIVED";
                amountChange = amount;
                returnDate = returnAt;
            } else if (transactionSubType === "RETURNED" && returnedTo) {
                personName = returnedTo;
                status = "RETURNED";
                amountChange = -amount;
                returnDate = createdAt;

            } else {
                return NextResponse.json(new ApiErrorResponse(ApiStatusCode.BAD_REQUEST, ApiStatus.BAD_REQUEST, 'Missing required fields for BORROW transaction'));
            }
        } else if (transactionType === "LEND") {
            if (transactionSubType === "GIVEN" && givenTo && returnAt) {
                personName = givenTo;
                status = "SENT";
                amountChange = -amount;
                returnDate = returnAt;
            } else if (transactionSubType === "RECEIVED" && receivedFrom) {
                personName = receivedFrom;
                status = "RECEIVED";
                amountChange = amount;
                returnDate = createdAt;
            } else {
                return NextResponse.json(new ApiErrorResponse(ApiStatusCode.BAD_REQUEST, ApiStatus.BAD_REQUEST, 'Missing required fields for LEND transaction'));
            }
        } else {
            return NextResponse.json(new ApiErrorResponse(ApiStatusCode.BAD_REQUEST, ApiStatus.BAD_REQUEST, 'Invalid transaction type'));
        }

        // Insert transaction
        const { data, error } = await supabase
            .from("misc_transactions")
            .insert([{ userId: user.id, transactionType, transactionSubType, personName, accountId, category, amount, note, createdAt, returnAt: returnDate, status }])
            .select();

        if (error) throw new Error("Failed to create transaction");

        // Update account balance
        await updateAccountAmount(accountId, amountChange);

        return NextResponse.json(new ApiSuccessResponse(ApiStatusCode.CREATED, ApiStatus.CREATED, 'Transaction created', data));
    } catch (error) {
        return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Unable to create transaction', error));
    }
}
