'use client';

import { useForm } from '@mantine/form';
import React from 'react';
import { useSelector } from 'react-redux';

import axiosInstance from '@/lib/axiosInstance';
import { showErrorToast, showSuccessToast } from '@/lib/reactToasts';
import { useAppDispatch } from '@/redux/hooks';
import { fetchUserAccounts } from '@/redux/slices/AccountSlice';
import { RootState } from '@/redux/store';
import { AccountTypeEnum } from '@/types/ui';
import { accountTypes } from '@/utils/Utils';

import Button from '../commons/Button';
import NumberInput from '../commons/NumberInput';
import Select from '../commons/Select';
import TextInput from '../commons/TextInput';



const CreateAccountForm = () => {
  const dispatch = useAppDispatch();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = React.useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      accountName: '',
      accountType: AccountTypeEnum.SAVINGS,
      initialAmount: '',
    },
    validate: {
      accountName: (value) =>
        value.length >= 1 ? null : 'Account name must be at least 1 character',
      accountType: (value) => (value ? null : 'Account type must be selected'),
      initialAmount: (value) =>
        Number(value) >= 0
          ? null
          : 'Initial Amount should be greater than or equal to zero',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post('/accounts', {
        userId: userDetails?.id,
        accountName: values.accountName,
        accountType: values.accountType,
        initialAmount: values.initialAmount,
      });

      if (res?.data?.statusCode === 201) {
        showSuccessToast(res?.data?.message);
        form.reset();
      } else {
        showErrorToast(res?.data?.message);
        setLoading(false);
        return;
      }
      if (userDetails) {
        await dispatch(fetchUserAccounts(userDetails.id));
      }
      setLoading(false);
    } catch (err) {
      showErrorToast(JSON.stringify(err));
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <TextInput
        label="Account Name"
        placeholder="Enter account name"
        required
        key={form.key('accountName')}
        {...form.getInputProps('accountName')}
      />
      <Select
        label="Account Type"
        required
        data={accountTypes}
        key={form.key('accountType')}
        {...form.getInputProps('accountType')}
      />
      <NumberInput
        label="Initial Amount"
        placeholder="Enter initial amount"
        required
        min={0}
        key={form.key('initialAmount')}
        {...form.getInputProps('initialAmount')}
      />
      <div className="mt-4 flex justify-end">
        <Button type="submit" loading={loading}>
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default CreateAccountForm;
