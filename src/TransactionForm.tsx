import './common.css'
import { TransactionType, ViewMode } from "./Dashboard";

type TransactionFormProps = {
    transactionType: TransactionType;
    changeViewModeHandler: (viewMode: ViewMode) => void;
}

export default function TransactionForm({transactionType, changeViewModeHandler}: Readonly<TransactionFormProps>) {
    return (
        <>
            <h1>Zleć {transactionType == TransactionType.WITHDRAWAL ? 'wypłatę' : 'wpłatę'}</h1>
            <div className='actions'>
                <button onClick={() => changeViewModeHandler(ViewMode.ACCOUNTS)}>Powrót do listy kont</button>
            </div>
        </>
    )
}