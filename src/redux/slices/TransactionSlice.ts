import axiosInstance from "@/lib/axiosInstance";
import { showErrorToast } from "@/lib/reactToasts";
import { TransactionState, TransactionTypeValue } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

const initialState: TransactionState = {
    loading: false,
    statsLoading: false,
    allTransactions: [],
    miscTransactions: [],
    transactionStats: {
        currentMonthOverView: {
            income: 0,
            expenses: 0,
            savings: 0,
            remaining: 0
        },
        lastMonthOverView: {
            income: 0,
            expenses: 0,
            savings: 0,
            remaining: 0
        }
    },
    miscTransactionStats: {
        currentMonth: {
            sent: 0,
            received: 0,
            remaining: 0
        },
        lastMonth: {
            sent: 0,
            received: 0,
            remaining: 0
        }
    }
}

const TransactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload
        },
        changeStatsLoading: (state, action) => {
            state.statsLoading = action.payload
        },
        saveAllTransactions: (state, action) => {
            state.allTransactions = action.payload
        },
        saveMiscTransactions: (state, action) => {
            state.miscTransactions = action.payload
        },
        saveTransactionStats: (state, action) => {
            state.transactionStats.currentMonthOverView = action.payload.currentMonthOverview;
            state.transactionStats.lastMonthOverView = action.payload.lastMonthOverview;
        },
        saveMiscTransactionStats: (state, action) => {
            state.miscTransactionStats.currentMonth = action.payload.currentMonth;
            state.miscTransactionStats.lastMonth = action.payload.lastMonth;
        }
    }
})

export const { changeLoading, changeStatsLoading, saveAllTransactions, saveMiscTransactions, saveTransactionStats, saveMiscTransactionStats } = TransactionSlice.actions

export const fetchAllTransactions = (): AppThunk<Promise<void>> => async (dispatch) => {
    dispatch(changeLoading(true))
    try {
        const { data } = await axiosInstance.get('/transactions');
        dispatch(saveAllTransactions(data?.data))
    } catch (err) {
        showErrorToast(JSON.stringify(err))
    } finally {
        dispatch(changeLoading(false))
    }
}
export const fetchTransactionStats = (): AppThunk<Promise<void>> => async (dispatch) => {
    dispatch(changeStatsLoading(true))
    try {
        const { data } = await axiosInstance.get('/stats/transactions')
        dispatch(saveTransactionStats(data?.data))
    } catch (err) {
        showErrorToast(JSON.stringify(err))
    } finally {
        dispatch(changeStatsLoading(false))
    }
}
export const fetchAllMiscTransactions = (transactionType: TransactionTypeValue): AppThunk<Promise<void>> => async (dispatch) => {
    dispatch(changeLoading(true))
    try {
        const { data } = await axiosInstance.get('/misc-transactions', {
            params: {
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
export const fetchMiscTransactionStats = (transactionType: TransactionTypeValue): AppThunk<Promise<void>> => async (dispatch) => {
    dispatch(changeStatsLoading(true))
    try {
        const { data } = await axiosInstance.get('/stats/misc-transactions', {
            params: {
                transactionType
            }
        })
        dispatch(saveMiscTransactionStats(data?.data))
    } catch (err) {
        showErrorToast(JSON.stringify(err))
    } finally {
        dispatch(changeStatsLoading(false))
    }
}

export default TransactionSlice.reducer