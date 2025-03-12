import './Accounts.css'
import './common.css'
import { ViewMode } from "./Dashboard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";

type AccountsProps = {
    changeViewModeHandler: (viewMode: ViewMode) => void;
}

type Account = {
    accountNumber: string;
    ownerName: string;
    currency: string;
    balance: string;
}

export default function Accounts({changeViewModeHandler}: Readonly<AccountsProps>) {

    const getAccounts = async () => {
        const response = await axios.get('http://localhost:8080/api/v1/accounts')
        return response.data
    }
    const {data, isPending} = useQuery({queryKey: ['accounts'], queryFn: getAccounts})


    return (
        <>
            <h1>Lista kont bankowych</h1>
            <div className='actions'>
                <button onClick={() => changeViewModeHandler(ViewMode.ACCOUNT_CREATION_FORM)}>Dodaj konto</button>
                <button onClick={() => changeViewModeHandler(ViewMode.TRANSFER_FORM)}>Zleć przelew</button>
            </div>
            <ul className='accounts'>
                <li className="header">
                    <span className='column number'>Numer konta</span>
                    <span className='column owner'>Właściciel</span>
                    <span className='column balance'>Saldo</span>
                    <span className='column actions'>Akcje</span>
                </li>
                {isPending ? null : data.map((account: Account) => (
                    <li key={account.accountNumber}>
                        <span className='column number'>{account.accountNumber}</span>
                        <span className='column owner'>{account.ownerName}</span>
                        <span className='column balance'>
                            <NumericFormat
                                value={account.balance}
                                displayType='text'
                                decimalScale={2}
                                decimalSeparator='.'
                                fixedDecimalScale={true}
                                suffix={' ' + account.currency}
                            />
                        </span>
                        <span className='column actions'>
                            <button onClick={() => changeViewModeHandler(ViewMode.DEPOSIT_FORM)}>Wpłać</button>
                            <button onClick={() => changeViewModeHandler(ViewMode.WITHDRAWAL_FORM)}>Wypłać</button>
                            <button
                                onClick={() => changeViewModeHandler(ViewMode.TRANSACTIONS)}>Historia transakcji</button>
                        </span>
                    </li>
                ))}
            </ul>
        </>
    )
}