'use client'

import { useForm } from '@mantine/form'
import Link from 'next/link'
import React from 'react'

import { showErrorToast, showSuccessToast } from '@/lib/reactToasts'
import { forgotPassword } from '@/serverActions/auth'

import Button from '../commons/Button'
import TextInput from '../commons/TextInput'

const ForgotPasswordForm: React.FC = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const res = await forgotPassword(values.email)

    if (res.status === 'success') {
      form.reset()
      showSuccessToast('Password reset link sent to your email')
    } else {
      showErrorToast(res.status)
    }
  }

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

      <div className="flex items-center justify-between">
        <Link
          href="/auth/login"
          className="text-sm text-primary-light hover:underline sm:text-base"
        >
          Back to login
        </Link>
        <Button type="submit">Confirm</Button>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
