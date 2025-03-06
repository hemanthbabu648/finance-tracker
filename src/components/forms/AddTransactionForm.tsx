import { Select } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'

import axiosInstance from '@/lib/axiosInstance'
import { showErrorToast, showSuccessToast } from '@/lib/reactToasts'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchAllTransactions } from '@/redux/slices/TransactionSlice'
import { TransactionType, TransactionTypeValue } from '@/types/ui'
import { getCategories } from '@/utils/Utils'

import Button from '../commons/Button'
import NumberInput from '../commons/NumberInput'
import SegmentedControl from '../commons/SegmentedControl'
import TextInput from '../commons/TextInput'

const tabs: TransactionType[] = [
  {
    label: 'Income',
    value: 'INCOME',
  },
  {
    label: 'Expense',
    value: 'EXPENSE',
  },
  {
    label: 'Transfer',
    value: 'TRANSFER',
  },
]

const AddTransactionForm = () => {
  const dispatch = useAppDispatch()
  const { userAccounts } = useAppSelector((state) => state.account)
  const [transactionType, setTransactionType] =
    useState<TransactionTypeValue>('EXPENSE')
  const [loading, setLoading] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState('')
  const category = getCategories[transactionType]

  const getMappedAccounts = () => {
    return userAccounts?.map((account) => {
      return {
        label: account.accountName,
        value: account.id,
      }
    })
  }

  const unSelectedAccounts = () => {
    return getMappedAccounts().filter(
      (account) => account.value !== selectedAccount,
    )
  }

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      account: '',
      category: '',
      amount: '',
      note: '',
      dateAndTime: new Date(),
      otherAccount: '',
    },
    validate: {
      account: (value) => (value ? null : 'Account is required'),
      category: (value) => (value ? null : 'Category is required'),
      amount: (value) => (value ? null : 'Amount is required'),
      note: (value) => (value ? null : 'Note is required'),
      dateAndTime: (value) => (value ? null : 'Date and Time is required'),
      otherAccount: (value) =>
        transactionType === 'TRANSFER' && !value
          ? 'To Account is required'
          : null,
    },
  })

  form.watch('account', (value) => {
    setSelectedAccount(value.value)
  })

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        accountId: values.account,
        transactionType,
        category: values.category,
        amount: values.amount,
        note: values.note,
        createdAt: values.dateAndTime,
      }

      if (transactionType === 'TRANSFER') {
        payload.toAccountId = values.otherAccount
      }

      const res = await axiosInstance.post('/transactions', payload)

      if (res?.data?.statusCode === 201) {
        form.reset()
        showSuccessToast(res?.data?.message)
        dispatch(fetchAllTransactions())
      } else {
        showErrorToast(res?.data?.message)
      }
    } catch (error) {
      showErrorToast(JSON.stringify(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <SegmentedControl
        fullWidth
        value={transactionType}
        onChange={(value) => setTransactionType(value as TransactionTypeValue)}
        data={tabs}
      />
      <form
        className="mt-5 flex flex-col gap-4"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className="flex gap-x-4">
          <Select
            label={transactionType === 'TRANSFER' ? 'From Account' : 'Account'}
            required
            data={getMappedAccounts()}
            key={form.key('account')}
            {...form.getInputProps('account')}
            placeholder="Select Account"
          />
          <Select
            label="Category"
            required
            data={category}
            key={form.key('category')}
            {...form.getInputProps('category')}
            placeholder="Select Category"
          />
        </div>
        {transactionType === 'TRANSFER' && (
          <Select
            label="To Account"
            required
            data={unSelectedAccounts()}
            key={form.key('otherAccount')}
            {...form.getInputProps('otherAccount')}
            className="w-1/2"
            placeholder="Select Account to Transfer"
          />
        )}
        <NumberInput
          label="Amount"
          placeholder="Enter amount"
          required
          min={0}
          key={form.key('amount')}
          {...form.getInputProps('amount')}
        />
        <TextInput
          label="Note"
          placeholder="Short note"
          required
          key={form.key('note')}
          {...form.getInputProps('note')}
        />
        <DateTimePicker
          clearable
          valueFormat="DD MMM YYYY hh:mm A"
          label="Pick date and time"
          placeholder="Pick date and time"
          required
          key={form.key('dateAndTime')}
          {...form.getInputProps('dateAndTime')}
        />
        <div className="mt-4 flex justify-end">
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddTransactionForm
