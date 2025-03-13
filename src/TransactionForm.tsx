import './common.css'
import { TransactionType, ViewMode } from "./common";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import {useState} from "react";

type TransactionFormProps = {
    accountNumber: string
    transactionType: TransactionType;
    changeViewModeHandler: (viewMode: ViewMode) => void;
}

type TransactionRequest = {
    amount?: number;
}

export default function TransactionForm({accountNumber, transactionType, changeViewModeHandler}: Readonly<TransactionFormProps>) {

    const [transactionAmount, setTransactionAmount] = useState()

    const transactionEndpointPath = transactionType == TransactionType.DEPOSIT ? 'deposit' : 'withdrawal'

    const transactionCreation = useMutation({
        mutationFn: (transactionRequest: TransactionRequest) => {
            return axios.post(`http://localhost:8080/api/v1/accounts/` + accountNumber + '/' + transactionEndpointPath, transactionRequest)
        },
        onSuccess: () => {
            changeViewModeHandler(ViewMode.ACCOUNTS)
        }
    })

    const saveTransaction = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        transactionCreation.mutate({amount: transactionAmount})
    }

    return (
        <>
            <h1>Zleć {transactionType == TransactionType.WITHDRAWAL ? 'wypłatę' : 'wpłatę'}</h1>
            <div className='actions'>
                <button onClick={() => changeViewModeHandler(ViewMode.ACCOUNTS)}>Powrót do listy kont</button>
            </div>
            <h3>{accountNumber}</h3>
            <p>
                <input onChange={(event) => setTransactionAmount(event.target.value)}
                       value={transactionAmount}/>
            </p>
            <div className='actions'>
                <button onClick={saveTransaction}>Zapisz</button>
            </div>
        </>
    )
}