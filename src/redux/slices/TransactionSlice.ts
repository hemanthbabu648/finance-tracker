import axiosInstance from "@/lib/axiosInstance";
import { showErrorToast } from "@/lib/reactToasts";
import { TransactionState } from "@/types";
import { TRANSACTIONTYPEENUM } from "@/types/ui";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

const initialState: TransactionState = {
    loading: false,
    allTransactions: [],
    miscTransactions: []
}

const TransactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload
        },
        saveAllTransactions: (state, action) => {
            state.allTransactions = action.payload
        },
        saveMiscTransactions: (state, action) => {
            state.miscTransactions = action.payload
        }
    }
})

export const { changeLoading, saveAllTransactions, saveMiscTransactions } = TransactionSlice.actions

export const fetchAllMiscTransactions = (userId: string, transactionType: TRANSACTIONTYPEENUM): AppThunk<Promise<void>> => async (dispatch) => {
    dispatch(changeLoading(true))
    try {
        const { data } = await axiosInstance.get('/misc-transactions', {
            params: {
                id: userId,
                transactionType
            }
        });
        dispatch(saveMiscTransactions(data?.data))
    } catch (err) {
        showErrorToast(JSON.stringify(err))
    } finally {
        dispatch(changeLoading(false))
    }
}

export const fetchAllTransactions = (userId: string, transactionType: TRANSACTIONTYPEENUM): AppThunk<Promise<void>> => async (dispatch) => {
    dispatch(changeLoading(true))
    try {
        const { data } = await axiosInstance.get('/misc-transactions', {
            params: {
                id: userId,
                transactionType
            }
        });
        dispatch(saveAllTransactions(data?.data))
    } catch (err) {
        showErrorToast(JSON.stringify(err))
    } finally {
        dispatch(changeLoading(false))
    }
}

export default TransactionSlice.reducer