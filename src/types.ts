export enum ApiStatus {
  OK = 'Ok',
  CREATED = 'Created',
  ACCEPTED = 'Accepted',
  NO_CONTENT = 'No Content',
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  METHOD_NOT_ALLOWED = 'Method Not Allowed',
  CONFLICT = 'Conflict',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
}

export enum ApiStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  fullName: string;
  created_at: string;
  phoneNumber?: string;
  profileImage?: string;
}

export interface AuthState {
  loading: boolean;
  userDetails: UserResponse | null;
}

export interface AccountResponse {
  id: string;
  userId: string;
  accountName: string;
  accountType: string;
  amount: number;
  createdAt: string;
  user_profiles?: UserResponse;
}

export interface AccountState {
  loading: boolean;
  userAccounts: AccountResponse[] | [];
  accountStats: {
    savings: number;
    current: number;
    creditCard: number;
    total: number;
  };
}

export type TransactionTypeValue =
  | 'INCOME'
  | 'EXPENSE'
  | 'TRANSFER'
  | 'BORROW'
  | 'LEND';

export type LendTabValues = 'GIVEN' | 'RECEIVED';

export type BorrowTabValues = 'TAKEN' | 'RETURNED';

export type StatusResponse =
  | 'PENDING'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'SETTLED'
  | 'SENT'
  | 'RECEIVED'
  | 'WAITING FOR CONFIRMATION'
  | 'CONFIRMED';

export interface TransactionResponse {
  id: string;
  userId: string;
  accountId: string;
  transactionType: TransactionTypeValue;
  transactionSubType?: LendTabValues | BorrowTabValues;
  category: string;
  amount: number;
  personName?: string;
  note: string;
  createdAt: string;
  returnAt?: string;
  status?: StatusResponse;
  settledAt?: string;
  toAccount?: string;
}

export interface TransactionState {
  loading: boolean;
  statsLoading: boolean;
  allTransactions: TransactionResponse[] | [];
  miscTransactions: TransactionResponse[] | [];
  transactionStats: {
    currentMonthOverView: {
      income: number;
      expenses: number;
      savings: number;
      remaining: number;
    };
    lastMonthOverView: {
      income: number;
      expenses: number;
      savings: number;
      remaining: number;
    };
  };
  miscTransactionStats: {
    currentMonth: {
      sent: number;
      received: number;
      remaining: number;
    };
    lastMonth: {
      sent: number;
      received: number;
      remaining: number;
    };
  };
}
