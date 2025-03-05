import { Select } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'

import axiosInstance from '@/lib/axiosInstance'
import { showErrorToast, showSuccessToast } from '@/lib/reactToasts'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchAllMiscTransactions } from '@/redux/slices/TransactionSlice'
import { BorrowLendTabTypes, LendTabValues } from '@/types/ui'

import Button from '../commons/Button'
import NumberInput from '../commons/NumberInput'
import SegmentedControl from '../commons/SegmentedControl'
import TextInput from '../commons/TextInput'


const tabs: BorrowLendTabTypes[] = [
    {
        label: 'Given',
        value: "GIVEN"
    },
    {
        label: 'Received',
        value: "RECEIVED"
    },

]

const LendTransactionForm = () => {
    const dispatch = useAppDispatch();
    const { userAccounts } = useAppSelector((state) => state.account)
    const [tab, setTab] = useState<LendTabValues>("GIVEN")
    const [loading, setLoading] = useState(false)

    const getMappedAccounts = () => {
        return userAccounts?.map((account) => {
            return {
                label: account.accountName,
                value: account.id
            }
        })
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            toPerson: '',
            account: '',
            category: '',
            amount: '',
            note: '',
            dateAndTime: new Date(),
            returnDate: new Date(),
            fromPerson: ''
        },
        validate: {
            account: (value) => value ? null : 'Account is required',
            category: (value) => value ? null : 'Category is required',
            amount: (value) => value ? null : 'Amount is required',
            note: (value) => value ? null : 'Note is required',
            dateAndTime: (value) => value ? null : 'Date and Time is required',
            fromPerson: (value) => (tab === 'RECEIVED' && !value) ? 'Received from is required' : null,
            toPerson: (value) => (tab === 'GIVEN' && !value) ? 'Given To is required' : null,
            returnDate: (value) => ((tab === 'GIVEN') && !value) ? 'Return Date is required' : null,
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const payload: any = {
                transactionType: "LEND",
                transactionSubType: tab,
                accountId: values.account,
                category: values.category,
                amount: values.amount,
                note: values.note,
                createdAt: values.dateAndTime,
            };

            if (tab === "GIVEN") {
                payload.givenTo = values.toPerson;
                payload.returnAt = values.returnDate;
            } else {
                payload.receivedFrom = values.fromPerson;
            }

            const res = await axiosInstance.post('/misc-transactions', payload);

            if (res?.data?.statusCode === 201) {
                form.reset();
                showSuccessToast(res?.data?.message);
                dispatch(fetchAllMiscTransactions("LEND"));
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
                onChange={(value) => setTab(value as LendTabValues)}
                data={tabs}
            />
            <form
                className='flex flex-col gap-4 mt-5'
                onSubmit={form.onSubmit(handleSubmit)}
            >
                {tab === 'GIVEN' ? (
                    <TextInput
                        label="Given to"
                        placeholder="Person Name"
                        required
                        key={form.key('toPerson')}
                        {...form.getInputProps('toPerson')}
                    />
                ) : (
                    <TextInput
                        label="Received from"
                        placeholder="Person Name"
                        required
                        key={form.key('fromPerson')}
                        {...form.getInputProps('fromPerson')}
                    />
                )}
                <div className='flex gap-x-4'>
                    <Select
                        label={tab === 'RECEIVED' ? "Credit to Account" : "Debit from Account"}
                        required
                        data={getMappedAccounts()}
                        key={form.key('account')}
                        {...form.getInputProps('account')}
                        placeholder='Select Account'
                    />
                    <Select
                        label="Category"
                        required
                        data={[
                            {
                                label: 'In Exchange',
                                value: 'IN_EXCHANGE'
                            },
                            {
                                label: 'Credit Card',
                                value: 'CREDIT_CARD'
                            },
                            {
                                label: 'Personal Loan',
                                value: 'PERSONAL_LOAN'
                            }
                        ]}
                        key={form.key('category')}
                        {...form.getInputProps('category')}
                        placeholder='Select Category'
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

                {tab === 'GIVEN' && (
                    <DateTimePicker
                        clearable
                        valueFormat="DD MMM YYYY hh:mm A"
                        label="Choose Return Date and Time"
                        placeholder="Choose return date and time"
                        required
                        key={form.key('returnDate')}
                        {...form.getInputProps('returnDate')}

                    />
                )}
                <div className='flex justify-end mt-4'>
                    <Button
                        type='submit'
                        loading={loading}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default LendTransactionForm