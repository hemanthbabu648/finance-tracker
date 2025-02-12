import React, { useState } from 'react'
import TextInput from '../commons/TextInput'
import { useForm } from '@mantine/form'
import SegmentedControl from '../commons/SegmentedControl'
import { transactionType, transactionTypeValue } from '@/types/finance'
import { Select } from '@mantine/core'
import NumberInput from '../commons/NumberInput'
import Button from '../commons/Button'
import { DateTimePicker } from '@mantine/dates'

const transactionTypeData: transactionType[] = [
    {
        label: 'Income',
        value: "INCOME"
    },
    {
        label: 'Expense',
        value: "EXPENSE"
    },
    {
        label: 'Transfer',
        value: "TRANSFER"
    },
    {
        label: 'Borrow',
        value: "BORROW"
    },
    {
        label: 'Lend',
        value: "LEND"
    }
]

const AddTransactionForm = () => {
    const [transactionType, setTransactionType] = useState<transactionTypeValue>("EXPENSE")

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            account: '',
            category: '',
            amount: '',
            note: '',
            dateAndTime: new Date(),
            otherAccount: '',
            fromPerson: '',
            toPerson: '',
            returnDate: new Date()
        },
        validate: {
            account: (value) => value ? null : 'Account is required',
            category: (value) => value ? null : 'Category is required',
            amount: (value) => value ? null : 'Amount is required',
            note: (value) => value ? null : 'Note is required',
            dateAndTime: (value) => value ? null : 'Date and Time is required',
            otherAccount: (value) => (transactionType === 'TRANSFER' && !value) ? 'To Account is required' : null,
            fromPerson: (value) => (transactionType === 'BORROW' && !value) ? 'Taken From is required' : null,
            toPerson: (value) => (transactionType === 'LEND' && !value) ? 'Given To is required' : null,
            returnDate: (value) => ((transactionType === 'BORROW' || transactionType === 'LEND') && !value) ? 'Return Date is required' : null,
        }
    })

    const getFieldByType = (type: transactionTypeValue) => {
        switch (type) {
            case "INCOME":
                return <Select
                    label="Category"
                    required
                    // value={"Food"}
                    data={[
                        "Food", "Grocery", "Entertainment", "Cash"
                    ]}
                    key={form.key('category')}
                    {...form.getInputProps('category')}
                />
            case "EXPENSE":
                return <Select
                    label="Category"
                    required
                    // value={"Food"}
                    data={[
                        "Food", "Grocery", "Entertainment", "Cash"
                    ]}
                    key={form.key('category')}
                    {...form.getInputProps('category')}
                />
            case "TRANSFER":
                return <Select
                    label="To Account"
                    required
                    // value={"SBI-4747"}
                    data={[
                        "SBI-4747", "SBI-571471"
                    ]}
                    key={form.key('otherAccount')}
                    {...form.getInputProps('otherAccount')}
                />
            case "BORROW":
                return <TextInput
                    label="Taken From"
                    placeholder="Person Name"
                    required
                    key={form.key('fromPerson')}
                    {...form.getInputProps('fromPerson')}
                />
            case "LEND":
                return <TextInput
                    label="Given To"
                    placeholder="Person Name"
                    required
                    key={form.key('toPerson')}
                    {...form.getInputProps('toPerson')}
                />
        }
    }

    return (
        <div>
            <SegmentedControl
                fullWidth
                value={transactionType}
                onChange={(value) => setTransactionType(value as transactionTypeValue)}
                data={transactionTypeData}
            />
            <form
                className='flex flex-col gap-4 mt-5'
                onSubmit={form.onSubmit((values) => console.log(values))}
            >
                <div className='flex gap-x-4'>
                    <Select
                        label={transactionType === "TRANSFER" ? "From Account" : "Account"}
                        required
                        // value={"SBI-4747"}
                        data={[
                            "SBI-4747", "SBI-571471"
                        ]}
                        key={form.key('account')}
                        {...form.getInputProps('account')}
                    />
                    {getFieldByType(transactionType)}
                </div>
                <NumberInput
                    label="Amount"
                    placeholder="Enter amount"
                    required
                    value={0}
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
                {transactionType === "BORROW" || transactionType === "LEND" ? (
                    <DateTimePicker
                        clearable
                        valueFormat="DD MMM YYYY hh:mm A"
                        label="Return date and time"
                        placeholder="Pick date and time"
                        required
                        key={form.key('returnDate')}
                        {...form.getInputProps('returnDate')}

                    />
                ) : null}
                <div className='flex justify-end mt-4'>
                    <Button
                        type='submit'
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddTransactionForm