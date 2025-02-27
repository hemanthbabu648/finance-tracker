import { combineReducers } from "@reduxjs/toolkit"
import UserSlice from "./slices/UserSlice";
import AccountSlice from "./slices/AccountSlice";
import TransactionSlice from "./slices/TransactionSlice";

const rootReducer = combineReducers({
    auth: UserSlice,
    account: AccountSlice,
    transaction: TransactionSlice
})

export default rootReducer