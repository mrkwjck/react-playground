import { useState } from "react";
import Accounts from "./Accounts";
import Transactions from "./Transactions";
import AccountCreationForm from "./AccountCreationForm";
import TransactionForm from "./TransactionForm";
import TransferForm from "./TransferForm";
import { TransactionType, ViewMode } from "./common";

export default function Dashboard() {
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.ACCOUNTS)
    const [selectedAccountNumber, setSelectedAccountNumber] = useState<string>();

    const changeViewMode = (viewMode: ViewMode, accountNumber?: string) => {
        setViewMode(viewMode)
        setSelectedAccountNumber(accountNumber)
    }

    return (
        <>
            {viewMode == ViewMode.ACCOUNTS && <Accounts changeViewModeHandler={changeViewMode}/>}
            {viewMode == ViewMode.TRANSACTIONS && <Transactions changeViewModeHandler={changeViewMode}/>}
            {viewMode == ViewMode.ACCOUNT_CREATION_FORM &&
                <AccountCreationForm changeViewModeHandler={changeViewMode}/>}
            {viewMode == ViewMode.DEPOSIT_FORM &&
                <TransactionForm accountNumber={selectedAccountNumber}
                                 changeViewModeHandler={changeViewMode}
                                 transactionType={TransactionType.DEPOSIT}/>}
            {viewMode == ViewMode.WITHDRAWAL_FORM &&
                <TransactionForm accountNumber={selectedAccountNumber}
                                 changeViewModeHandler={changeViewMode}
                                 transactionType={TransactionType.WITHDRAWAL}/>}
            {viewMode == ViewMode.TRANSFER_FORM && <TransferForm changeViewModeHandler={changeViewMode}/>}
        </>
    );
}