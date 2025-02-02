'use client'

import { useForm } from '@mantine/form'
import Link from 'next/link'
import React from 'react'
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
    return (
        <form
            className="flex flex-col gap-y-6 shadow-md bg-white border border-gray-200 rounded-md p-6 mt-6 text-black"
            onSubmit={form.onSubmit((values) => console.log(values))}
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

            <div className="flex justify-between items-center">
                <Link
                    href="/auth/flogin"
                    className="text-sm sm:text-base text-primary-light hover:underline"
                >
                    Back to login
                </Link>
                <Button type="submit">
                    Reset Password
                </Button>
            </div>
        </form>
    )
}

export default ForgotPasswordForm