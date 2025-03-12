import { useState } from "react";
import Accounts from "./Accounts";
import Transactions from "./Transactions";
import AccountCreationForm from "./AccountCreationForm";
import TransactionForm from "./TransactionForm";
import TransferForm from "./TransferForm";

export enum ViewMode {
    ACCOUNTS,
    TRANSACTIONS,
    ACCOUNT_CREATION_FORM,
    DEPOSIT_FORM,
    WITHDRAWAL_FORM,
    TRANSFER_FORM,
}

export enum TransactionType {
    DEPOSIT,
    WITHDRAWAL
}

export default function Dashboard() {
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.ACCOUNTS)

    const changeViewMode = (viewMode: ViewMode) => {
        setViewMode(viewMode)
    }

    return (
        <>
            {viewMode == ViewMode.ACCOUNTS && <Accounts changeViewModeHandler={changeViewMode}/>}
            {viewMode == ViewMode.TRANSACTIONS && <Transactions changeViewModeHandler={changeViewMode}/>}
            {viewMode == ViewMode.ACCOUNT_CREATION_FORM &&
                <AccountCreationForm changeViewModeHandler={changeViewMode}/>}
            {viewMode == ViewMode.DEPOSIT_FORM &&
                <TransactionForm changeViewModeHandler={changeViewMode} transactionType={TransactionType.DEPOSIT}/>}
            {viewMode == ViewMode.WITHDRAWAL_FORM &&
                <TransactionForm changeViewModeHandler={changeViewMode} transactionType={TransactionType.WITHDRAWAL}/>}
            {viewMode == ViewMode.TRANSFER_FORM && <TransferForm changeViewModeHandler={changeViewMode}/>}
        </>
    );
}