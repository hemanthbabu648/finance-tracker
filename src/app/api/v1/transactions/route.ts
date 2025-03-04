import { NextRequest, NextResponse } from "next/server";

import { ApiStatus, ApiStatusCode } from "@/types";
import { ApiErrorResponse, ApiSuccessResponse } from "@/utils/responses";
import { getAuthUserDetails } from "@/utils/supabase/db";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/supabaseAdmin";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
    try {
        // TODO: Implement pagination
        // const url = req.nextUrl;
        // const userId = url.searchParams.get('id');

        const user = await getAuthUserDetails();

        if (!user) {
            return NextResponse.json(new ApiErrorResponse(ApiStatusCode.UNAUTHORIZED, ApiStatus.UNAUTHORIZED, 'Authorization failed.'));
        }

        const supabase = await createClient();
        const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .eq("userId", user.id)
            .limit(100);

        if (error) {
            return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch transactions.'));
        }
        return NextResponse.json(new ApiSuccessResponse(ApiStatusCode.OK, ApiStatus.OK, 'Fetched Transactions Successfully', data));
    } catch (error) {
        return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch transactions.', error));
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await getAuthUserDetails();
        const body = await req.json();
        const {
            accountId,
            transactionType,
            category,
            amount,
            note,
            createdAt,
            toAccountId
        } = body

        if (!user) {
            return NextResponse.json(new ApiErrorResponse(ApiStatusCode.UNAUTHORIZED, ApiStatus.UNAUTHORIZED, 'Authorization failed.'));
        }

        if (!accountId || !category || !note || !amount || !createdAt) {
            return NextResponse.json(new ApiErrorResponse(ApiStatusCode.BAD_REQUEST, ApiStatus.BAD_REQUEST, 'Missing accountId, category, note, amount, createdAt fields'))
        }

        const supabase = await createClient();

        if (transactionType === "TRANSFER") {
            if (!toAccountId) {
                return NextResponse.json(new ApiErrorResponse(ApiStatusCode.BAD_REQUEST, ApiStatus.BAD_REQUEST, 'Missing field toAccount'))
            }
            const { data, error } = await supabase
                .from("transactions")
                .insert([
                    {
                        userId: user.id,
                        transactionType: transactionType,
                        accountId: accountId,
                        category: category,
                        amount: amount,
                        note: note,
                        createdAt: createdAt,
                        toAccount: toAccountId,
                    }
                ]).select()

            const { data: accounts, error: accountsError } = await supabaseAdmin
                .from("accounts")
                .select("*")
                .in("id", [accountId, toAccountId]);

            if (accountsError) {
                return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch accounts with [accountId, toAccountId]'));
            }

            const updatedAccounts = accounts.map(account => {
                if (account.id === accountId) {
                    return { ...account, amount: account.amount - amount };
                }
                if (account.id === toAccountId) {
                    return { ...account, amount: account.amount + amount };
                }
                return account;
            });

            const updatedAmountInDebitAccount = updatedAccounts.find(account => account.id === accountId)?.amount;
            const updatedAmountInCreditAccount = updatedAccounts.find(account => account.id === toAccountId)?.amount;

            if (updatedAmountInDebitAccount !== undefined) {
                const { error: updateDebitAccountError } = await supabaseAdmin
                    .from("accounts")
                    .update({ amount: updatedAmountInDebitAccount })
                    .eq("id", accountId);
                if (updateDebitAccountError) {
                    return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to update debit account amount.'));
                }
            }
            if (updatedAmountInCreditAccount !== undefined) {
                const { error: updateCreditAccountError } = await supabaseAdmin
                    .from("accounts")
                    .update({ amount: updatedAmountInCreditAccount })
                    .eq("id", toAccountId);
                if (updateCreditAccountError) {
                    return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to update credit account amount.'));
                }
            }

            if (error) {
                return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch accounts.'));
            }
            return NextResponse.json(new ApiSuccessResponse(ApiStatusCode.CREATED, ApiStatus.CREATED, 'Transaction created', data));
        } else {
            const { data, error } = await supabase
                .from("transactions")
                .insert([
                    {
                        userId: user.id,
                        transactionType: transactionType,
                        accountId: accountId,
                        category: category,
                        amount: amount,
                        note: note,
                        createdAt: createdAt,
                    }
                ])

            const { data: accounts, error: accountsError } = await supabaseAdmin
                .from("accounts")
                .select("*")
                .eq("id", accountId);

            if (accountsError) {
                return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch accounts with [accountId]'));
            }

            const updatedAccount = accounts.map(account => {
                if (transactionType === "INCOME" && account.id === accountId) {
                    return { ...account, amount: account.amount + amount };
                }

                if (transactionType === "EXPENSE" && account.id === accountId) {
                    return { ...account, amount: account.amount - amount };
                }
                return account;
            });

            if (updatedAccount) {
                const { error: updateDebitAccountError } = await supabaseAdmin
                    .from("accounts")
                    .update({ amount: updatedAccount[0].amount })
                    .eq("id", accountId);
                if (updateDebitAccountError) {
                    return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to update debit account amount.'));
                }
            }

            if (error) {
                return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch accounts.'));
            }
            return NextResponse.json(new ApiSuccessResponse(ApiStatusCode.CREATED, ApiStatus.CREATED, 'Transaction created', data));
        }
    } catch (error) {
        return NextResponse.json(new ApiErrorResponse(ApiStatusCode.INTERNAL_SERVER_ERROR, ApiStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch accounts.', error));
    }
}