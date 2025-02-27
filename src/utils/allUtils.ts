import { Category } from "@/types/ui";

export const categories = {
    EXPENSE: [
        {
            label: 'Food',
            value: 'FOOD'
        },
        {
            label: 'Rent',
            value: 'RENT'
        },
        {
            label: 'Transportation',
            value: 'TRANSPORTATION'
        },
        {
            label: 'Entertainment',
            value: 'ENTERTAINMENT'
        },
        {
            label: 'Health & Insurance',
            value: 'HEALTH_INSURANCE'
        },
        {
            label: 'Savings & Investments',
            value: 'SAVINGS_INVESTMENTS'
        },
        {
            label: 'Clothing',
            value: 'CLOTHING'
        },
        {
            label: 'Education & Courses',
            value: 'EDUCATION'
        },
        {
            label: 'Bills',
            value: 'BILLS'
        },
        {
            label: 'Credit Card Payments',
            value: 'CREDIT_CARD_PAYMENTS'
        },
        {
            label: 'Personal Care',
            value: 'PERSONAL_CARE'
        },
        {
            label: 'Gifts & Donations',
            value: 'GIFTS_DONATIONS'
        },
        {
            label: 'Electronics',
            value: 'ELECTRONICS'
        },
        {
            label: 'Grocery',
            value: 'GROCERY'
        },
        {
            label: 'Accessories',
            value: 'ACCESSORIES'
        },
        {
            label: 'Sports',
            value: 'SPORTS'
        },
        {
            label: 'Home',
            value: 'HOME'
        },
        {
            label: 'Subscriptions',
            value: 'SUBSCRIPTIONS'
        },
        {
            label: 'Utilities',
            value: 'UTILITIES'
        },
    ] as Category[], // Explicitly typing the array as Category[]

    INCOME: [
        {
            label: 'Salary',
            value: 'SALARY'
        },
        {
            label: 'Freelance',
            value: 'FREELANCE'
        },
        {
            label: 'Investment Income',
            value: 'INVESTMENT'
        },
        {
            label: 'Dividends',
            value: 'DIVIDENDS'
        }
    ] as Category[],

    TRANSFER: [
        {
            label: 'Bank Transfer',
            value: 'BANK_TRANSFER'
        },
        {
            label: 'Peer-to-Peer',
            value: 'P2P_TRANSFER'
        },
        {
            label: 'Mobile Payment',
            value: 'MOBILE_PAYMENT'
        }
    ] as Category[],

    BORROW: [
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
    ] as Category[],

    LEND: [
        {
            label: 'In Exchange',
            value: 'IN_EXCHANGE'
        }
    ] as Category[]
};