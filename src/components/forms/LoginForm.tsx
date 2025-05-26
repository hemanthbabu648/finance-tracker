'use client';

import { useForm } from '@mantine/form';
import Link from 'next/link';
import React from 'react';

import { showErrorToast } from '@/lib/reactToasts';
import { login } from '@/serverActions/auth';

import { validatePassword } from './RegisterForm';
import Button from '../commons/Button';
import Checkbox from '../commons/Checkbox';
import PasswordInput from '../commons/PasswordInput';
import TextInput from '../commons/TextInput';

const LoginForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => validatePassword(value),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const res = await login({
      email: values.email,
      password: values.password,
    });

    if (res.status === 200) {
      form.reset();
    } else {
      showErrorToast(res.message);
    }
    setLoading(false);
  };

  return (
    <form
      className="mt-6 flex flex-col gap-y-6 rounded-md border border-gray-200 bg-white p-6 text-black shadow-md"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <TextInput
        label="Email"
        placeholder="your@email.com"
        variant="filled"
        withAsterisk
        size="md"
        key={form.key('email')}
        {...form.getInputProps('email')}
        autoComplete="true"
      />
      <PasswordInput
        label="Password"
        placeholder="Your Password"
        variant="filled"
        withAsterisk
        size="md"
        key={form.key('password')}
        {...form.getInputProps('password')}
        autoComplete="true"
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          variant="filled"
          key={form.key('remember')}
          {...form.getInputProps('remember')}
        />
        <Link
          href="/auth/forgot-password"
          className="text-sm text-primary-light hover:underline sm:text-base"
        >
          Forgot password?
        </Link>
      </div>
      <Button
        size="md"
        fullWidth
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 60 }}
        type="submit"
        loading={loading}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
