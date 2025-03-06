import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import axiosInstance from '@/lib/axiosInstance'
import { showErrorToast } from '@/lib/reactToasts'
import { AccountResponse, AccountState } from '@/types'

import { AppThunk } from '../store'

const initialState: AccountState = {
  loading: false,
  userAccounts: [],
  accountStats: {
    savings: 0,
    current: 0,
    creditCard: 0,
    total: 0,
  },
}

const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    saveUserAccounts: (
      state,
      action: PayloadAction<AccountResponse[] | []>,
    ) => {
      state.userAccounts = action.payload
    },
    saveAccountStats: (
      state,
      action: PayloadAction<AccountResponse[] | []>,
    ) => {
      const balance = {
        savings: 0,
        current: 0,
        creditCard: 0,
        total: 0,
      }

      action.payload?.forEach((account) => {
        balance.total += account.amount || 0
        if (account.accountType === 'SAVINGS') {
          balance.savings += account.amount || 0
        } else if (account.accountType === 'CREDIT CARD') {
          balance.creditCard += account.amount || 0
        } else {
          balance.current += account.amount || 0
        }
      })

      state.accountStats = balance
    },
  },
})

export const { changeLoading, saveUserAccounts, saveAccountStats } =
  AccountSlice.actions

export const fetchUserAccounts =
  (userId: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch(changeLoading(true))
    try {
      const { data } = await axiosInstance.get('/accounts', {
        params: {
          id: userId,
        },
      })
      dispatch(saveUserAccounts(data?.data))
      dispatch(saveAccountStats(data?.data))
    } catch (error) {
      showErrorToast(JSON.stringify(error))
    } finally {
      dispatch(changeLoading(false))
    }
  }

export default AccountSlice.reducer
