'use client'

import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

import { showErrorToast, showSuccessToast } from '@/lib/reactToasts'
import { signup } from '@/serverActions/auth'

import Button from '../commons/Button'
import Checkbox from '../commons/Checkbox'
import Modal from '../commons/Modal'
import PasswordInput from '../commons/PasswordInput'
import TextInput from '../commons/TextInput'



const RegisterForm: React.FC = () => {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
            agreement: false,
        },
        validate: {
            firstName: (value) => (value.length >= 1 ? null : 'First name must be at least 1 character'),
            lastName: (value) => (value.length >= 1 ? null : 'Last name must be at least 1 character'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value) ? null : 'Password must be at least 8 characters'),
            confirmPassword: (value, values) => (value === values.password ? null : 'Passwords do not match'),
            terms: (value) => (value ? null : 'You must agree to the terms and conditions'),
            agreement: (value) => (value ? null : 'You must agree to the agreement'),
        },

    })

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true)
        const res = await signup({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            terms: values.terms,
            agreement: values.agreement
        })

        if (res.status === 'success') {
            showSuccessToast('Account created successfully')
            form.reset()
            open()
        } else {
            showErrorToast("Can't signup. Something went wrong on signup")
        }
        setLoading(false)
    }

    return (
        <>
            <form
                className="bg-white border-[5px] border-black px-5 md:px-8 pb-10 pt-3 rounded-md flex flex-col gap-3"
                onSubmit={form.onSubmit(handleSubmit)}
            >
                <p className='text-primary-dark text-lg font-semibold'>
                    Please fill out the form to get started.
                </p>
                <div className="flex justify-start gap-2 flex-col sm:flex-row">
                    <TextInput
                        label="First Name"
                        placeholder="First Name"
                        variant="filled"
                        withAsterisk
                        size="md"
                        className="md:w-1/2"
                        key={form.key('firstName')}
                        {...form.getInputProps('firstName')}
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Last Name"
                        variant="filled"
                        withAsterisk
                        size="md"
                        className="md:w-1/2"
                        key={form.key('lastName')}
                        {...form.getInputProps('lastName')}
                    />
                </div>

                <TextInput
                    label="Email"
                    placeholder="your@gmail.com"
                    variant="filled"
                    withAsterisk
                    size="md"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Please enter your password"
                    variant="filled"
                    withAsterisk
                    size="md"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />

                <PasswordInput
                    label="Confirm Password"
                    placeholder="Please re-enter your password"
                    variant="filled"
                    withAsterisk
                    size="md"
                    key={form.key('confirmPassword')}
                    {...form.getInputProps('confirmPassword')}
                />

                <div className="flex gap-2 ">
                    <Checkbox
                        label=""
                        variant="filled"
                        key={form.key('terms')}
                        {...form.getInputProps('terms')}
                    />
                    <p className="text-gray">
                        By checking this box, I agree to the{" "}
                        <Link href="/privary" className="hover:underline text-navy-blue-300">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privary" className="hover:underline text-navy-blue-300">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
                <div className="flex gap-2 ">
                    <Checkbox
                        label=""
                        variant="filled"
                        key={form.key('agreement')}
                        {...form.getInputProps('agreement')}
                    />
                    <p className="text-gray">
                        By checking this box, I consent by electronic signature to receive
                        emails from Radiant Ways, LLC and its affiliates made by any means or
                        technology for informational, marketing, or any other purposes at the
                        email I provided above. I understand that my consent to such emails is
                        not required to use the services of Radiant Ways, LLC.
                    </p>
                </div>
                <p className="text-sm sm:text-base text-gray-500 mt-2">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="text-sm sm:text-base hover:underline text-primary-light"
                    >
                        Login
                    </Link>
                </p>
                <div className="mt-5">
                    <Button
                        size="md"
                        fullWidth
                        variant="gradient"
                        gradient={{ from: "cyan", to: "blue", deg: 90 }}
                        type="submit"
                        loading={loading}
                    >
                        Register
                    </Button>
                </div>
            </form>
            <Modal
                opened={opened}
                onClose={close}
                centered
                withCloseButton={false}
                size="auto"
            >
                <div className="flex flex-col items-center justify-center p-6">
                    <h1 className="text-3xl font-bold mb-4">
                        Welcome to <span className="text-primary-blue-light">Finomic</span>! 🎉
                    </h1>

                    <p className="text-lg text-center max-w-lg mb-6">
                        You&apos;ve successfully registered. We&apos;re excited to have you on board! Explore all the features we offer and start your journey with us. If you have any questions, feel free to check out our help center or reach out to our support team.
                    </p>

                    <Button
                        size="md"
                        fullWidth
                        variant="gradient"
                        gradient={{ from: "cyan", to: "blue", deg: 90 }}
                        onClick={
                            () => {
                                router.push('/auth/login')
                                close()
                            }
                        }
                    >
                        Go to Login
                    </Button>

                </div>

            </Modal>
        </>
    )
}

export default RegisterForm