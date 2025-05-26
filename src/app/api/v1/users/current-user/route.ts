import { NextRequest, NextResponse } from 'next/server';

import { ApiStatus, ApiStatusCode } from '@/types';
import { ApiErrorResponse, ApiSuccessResponse } from '@/utils/responses';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
  try {
    // Step 1: Parse the request body
    const url = req.nextUrl;
    const authUserId = url.searchParams.get('id');

    // Step 2: Validate the authUserId
    if (!authUserId) {
      return NextResponse.json(
        new ApiErrorResponse(
          ApiStatusCode.UNAUTHORIZED,
          ApiStatus.UNAUTHORIZED,
          'Authorization failed.',
        ),
      );
    }

    // Step 3: Initialize Supabase client
    const supabase = await createClient();

    // Step 4: Query the user profile
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', authUserId)
      .single();

    // Step 5: Handle error in fetching user profile
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

    // Step 7: Return success response with user data
    return NextResponse.json(
      new ApiSuccessResponse(
        ApiStatusCode.OK,
        ApiStatus.OK,
        'Fetched user accounts',
        data,
      ),
    );
  } catch (error) {
    // Step 8: Catch any unexpected errors
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
