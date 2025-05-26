import { Select } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';

import axiosInstance from '@/lib/axiosInstance';
import { showErrorToast, showSuccessToast } from '@/lib/reactToasts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchAllMiscTransactions,
  fetchMiscTransactionStats,
} from '@/redux/slices/TransactionSlice';
import { useAuthUserId } from '@/redux/slices/UserSlice';
import { BorrowLendTabTypes, BorrowTabValues } from '@/types/ui';
import { getCategories } from '@/utils/Utils';

import Button from '../commons/Button';
import NumberInput from '../commons/NumberInput';
import SegmentedControl from '../commons/SegmentedControl';
import TextInput from '../commons/TextInput';

const tabs: BorrowLendTabTypes[] = [
  {
    label: 'Taken',
    value: 'TAKEN',
  },
  {
    label: 'Returned',
    value: 'RETURNED',
  },
];

const BorrowTransactionForm = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(useAuthUserId);
  const { userAccounts } = useAppSelector((state) => state.account);
  const [tab, setTab] = useState<BorrowTabValues>('TAKEN');
  const [loading, setLoading] = useState(false);

  const category = getCategories["BORROW"];

  const getMappedAccounts = () => {
    return userAccounts?.map((account) => {
      return {
        label: account.accountName,
        value: account.id,
      };
    });
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      fromPerson: '',
      account: '',
      category: '',
      amount: '',
      note: '',
      dateAndTime: new Date(),
      toPerson: '',
      returnDate: new Date(),
    },
    validate: {
      account: (value) => (value ? null : 'Account is required'),
      category: (value) => (value ? null : 'Category is required'),
      amount: (value) => (value ? null : 'Amount is required'),
      note: (value) => (value ? null : 'Note is required'),
      dateAndTime: (value) => (value ? null : 'Date and Time is required'),
      fromPerson: (value) =>
        tab === 'TAKEN' && !value ? 'Taken From is required' : null,
      toPerson: (value) =>
        tab === 'RETURNED' && !value ? 'Given To is required' : null,
      returnDate: (value) =>
        tab === 'TAKEN' && !value ? 'Return Date is required' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        userId,
        transactionType: 'BORROW',
        transactionSubType: tab,
        accountId: values.account,
        category: values.category,
        amount: values.amount,
        note: values.note,
        createdAt: values.dateAndTime,
      };

      if (tab === 'TAKEN') {
        payload.takenFrom = values.fromPerson;
        payload.returnAt = values.returnDate;
      } else {
        payload.returnedTo = values.toPerson;
      }

      const res = await axiosInstance.post('/misc-transactions', payload);

      if (res?.data?.statusCode === 201) {
        form.reset();
        showSuccessToast(res?.data?.message);
        dispatch(fetchAllMiscTransactions(userId!, 'BORROW'));
        dispatch(fetchMiscTransactionStats(userId!, 'BORROW'));
      } else {
        showErrorToast(res?.data?.message);
      }
    } catch (error) {
      showErrorToast(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SegmentedControl
        fullWidth
        value={tab}
        onChange={(value) => setTab(value as BorrowTabValues)}
        data={tabs}
      />
      <form
        className="mt-5 flex flex-col gap-4"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        {tab === 'TAKEN' ? (
          <TextInput
            label="Taken From"
            placeholder="Person Name"
            required
            key={form.key('fromPerson')}
            {...form.getInputProps('fromPerson')}
          />
        ) : (
          <TextInput
            label="Returned To"
            placeholder="Person Name"
            required
            key={form.key('toPerson')}
            {...form.getInputProps('toPerson')}
          />
        )}
        <div className="flex gap-x-4">
          <Select
            label={tab === 'TAKEN' ? 'Credit to Account' : 'Debit from Account'}
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
          label="Pick Date and Time"
          placeholder="Pick date and time"
          required
          key={form.key('dateAndTime')}
          {...form.getInputProps('dateAndTime')}
        />

        {tab === 'TAKEN' && (
          <DateTimePicker
            clearable
            valueFormat="DD MMM YYYY hh:mm A"
            label="Pick Return Date and Time"
            placeholder="Pick date and time"
            required
            key={form.key('returnDate')}
            {...form.getInputProps('returnDate')}
          />
        )}
        <div className="mt-4 flex justify-end">
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BorrowTransactionForm;
