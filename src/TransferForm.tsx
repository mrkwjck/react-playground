import { Account, ViewMode } from "./common";
import "./common.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import * as React from "react";

type TransferFormProps = {
    changeViewModeHandler: (viewMode: ViewMode) => void;
};

type AccountSelectProps = {
    label: string;
    accountsOptions: Array<string>;
    selectionHandler: (accountNumber: string) => boolean;
};

type TransferRequest = {
    sourceAccountNumber: string;
    targetAccountNumber: string;
    amount: number;
};

function AccountSelect({ label, accountsOptions, selectionHandler }: Readonly<AccountSelectProps>) {
    const defaultValue = "0";
    const onAccountSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const isSelectedSuccessfully = selectionHandler(event.target.value);
        if (!isSelectedSuccessfully) {
            event.target.value = defaultValue;
        }
    };

    return (
        <label>
            {label}&nbsp;&nbsp;
            <select onChange={onAccountSelect}>
                <option key={defaultValue} value={defaultValue}>
                    wybierz
                </option>
                {accountsOptions.map((accountsOption) => (
                    <option key={accountsOption} value={accountsOption}>
                        {accountsOption}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default function TransferForm({ changeViewModeHandler }: Readonly<TransferFormProps>) {
    const [sourceAccount, setSourceAccount] = useState<string>();
    const [targetAccount, setTargetAccount] = useState<string>();
    const [transferAmount, setTransferAmount] = useState();

    const getAccounts = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/accounts");
        return response.data;
    };

    const { data } = useQuery({
        queryKey: ["accounts"],
        queryFn: getAccounts,
    });

    const accounts = data.map((account: Account) => account.accountNumber);

    const onAccountSelect = (selectedAccount: string, otherAccount: string, selectAccountHandler) => {
        if (selectedAccount === otherAccount) {
            alert("Nie można wybrać tego konta");
            return false;
        }
        selectAccountHandler(selectedAccount);
        return true;
    };

    const onSourceAccountSelect = (selectedAccount: string) => {
        return onAccountSelect(selectedAccount, targetAccount, setSourceAccount);
    };

    const onTargetAccountSelect = (selectedAccount: string) => {
        return onAccountSelect(selectedAccount, sourceAccount, setTargetAccount);
    };

    const transferCreation = useMutation({
        mutationFn: (transferRequest: TransferRequest) => {
            return axios.post(`http://localhost:8080/api/v1/transfers`, transferRequest);
        },
        onSuccess: () => {
            changeViewModeHandler(ViewMode.ACCOUNTS);
        },
    });

    const saveTransfer = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        transferCreation.mutate({
            sourceAccountNumber: sourceAccount,
            targetAccountNumber: targetAccount,
            amount: transferAmount,
        });
    };

    return (
        <>
            <h1>Zleć przelew</h1>
            <div className="actions">
                <button onClick={() => changeViewModeHandler(ViewMode.ACCOUNTS)}>Powrót do listy kont</button>
            </div>
            <p>
                <AccountSelect label="Z konta" accountsOptions={accounts} selectionHandler={onSourceAccountSelect} />
            </p>
            <p>
                <AccountSelect label="Na konto" accountsOptions={accounts} selectionHandler={onTargetAccountSelect} />
            </p>
            <p>
                <p>
                    <input onChange={(event) => setTransferAmount(event.target.value)} value={transferAmount} />
                </p>
            </p>
            <div className="actions">
                <button onClick={saveTransfer}>Zapisz</button>
            </div>
        </>
    );
}
