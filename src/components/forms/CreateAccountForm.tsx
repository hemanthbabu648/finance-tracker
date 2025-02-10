'use client';

import React from 'react'
import TextInput from '../commons/TextInput';
import Select from '../commons/Select';
import { accountType, ACCOUNTTYPEENUM } from '@/types/finance';
import Button from '../commons/Button';
import { useForm } from '@mantine/form';
import NumberInput from '../commons/NumberInput';


const accountTypes: accountType[] = [
    {
        label: 'Savings',
        value: ACCOUNTTYPEENUM.SAVINGS
    },
    {
        label: 'Cash',
        value: ACCOUNTTYPEENUM.CASH
    },
    {
        label: 'Salary',
        value: ACCOUNTTYPEENUM.SALARY
    },
    {
        label: 'Credit Card',
        value: ACCOUNTTYPEENUM.CREDIT_CARD
    },
    {
        label: 'E-Wallet',
        value: ACCOUNTTYPEENUM.E_WALLET
    },
    {
        label: 'E-Account',
        value: ACCOUNTTYPEENUM.E_ACCOUNT
    }
]

const CreateAccountForm = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            accountName: '',
            accountType: ACCOUNTTYPEENUM.SAVINGS,
            initialAmount: ''
        },
        validate: {
            accountName: (value) => value.length >= 1 ? null : 'Account name must be at least 1 character',
            accountType: (value) => value ? null : 'Account type must be selected',
            initialAmount: (value) => Number(value) >= 0 ? null : 'Initial amount must be entered'
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        console.log(values)
    }

    return (
        <form
            className='flex flex-col gap-4'
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
            <div className='flex justify-end mt-4'>
                <Button
                    type='submit'
                >
                    Create Account
                </Button>
            </div>
        </form>

    )
}

export default CreateAccountForm