'use client';

import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { showErrorToast } from '@/lib/reactToasts';
import { resetPassword } from '@/serverActions/auth';

import Button from '../commons/Button';
import PasswordInput from '../commons/PasswordInput';

const ResetPasswordForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(
          value,
        )
          ? null
          : 'Password must be at least 8 characters',
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const code = searchParams.get('code');
    const res = await resetPassword(values.password, code as string);

    if (res.status === 'success') {
      form.reset();
      router.push('/dashboard');
    } else {
      showErrorToast(res.status);
    }
  };

  return (
    <form
      className="mt-6 flex flex-col gap-y-6 rounded-md border border-gray-200 bg-white p-6 text-black shadow-md"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <PasswordInput
        label="New Password"
        placeholder="Enter new password"
        variant="filled"
        withAsterisk
        size="md"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm new password"
        variant="filled"
        withAsterisk
        size="md"
        key={form.key('confirmPassword')}
        {...form.getInputProps('confirmPassword')}
      />

      <div className="flex items-center justify-between">
        <Link
          href="/auth/login"
          className="text-sm text-primary-light hover:underline sm:text-base"
        >
          Back to login
        </Link>
        <Button type="submit">Reset Password</Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
