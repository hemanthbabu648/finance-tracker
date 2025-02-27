import axiosInstance from "@/lib/axiosInstance";
import { showErrorToast } from "@/lib/reactToasts";
import { AuthState, UserResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

const initialState: AuthState = {
    loading: false,
    userDetails: null
}

const UserSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        saveUserDetails: (state, action: PayloadAction<UserResponse | null>) => {
            state.userDetails = action.payload
        }
    }
})

export const { changeLoading, saveUserDetails } = UserSlice.actions;

export const getAuthUser = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        showErrorToast("Can't get auth user details.")
        return null
    }
    return data.user
}


export const fetchUserDetails = (loading = true): AppThunk<Promise<UserResponse | null>> => async (dispatch) => {
    if (loading) {
        dispatch(changeLoading(true));
    }
    try {
        const data = await getAuthUser()
        const { data: user } = await axiosInstance.get('/users/current-user', {
            // Use params to pass query parameters
            params: { id: data?.id }
        });
        dispatch(saveUserDetails(user.data))
        return user

    } catch (err) {
        showErrorToast(JSON.stringify(err))
        return null
    }
    finally {
        if (loading) {
            dispatch(changeLoading(false));
        }
    }
}

export default UserSlice.reducer