import { combineReducers } from "@reduxjs/toolkit"

import AccountSlice from "./slices/AccountSlice";
import TransactionSlice from "./slices/TransactionSlice";
import UserSlice from "./slices/UserSlice";

const rootReducer = combineReducers({
    auth: UserSlice,
    account: AccountSlice,
    transaction: TransactionSlice
})

export default rootReducer