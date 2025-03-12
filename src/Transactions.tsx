import './common.css'
import { ViewMode } from "./Dashboard";

type TransactionsProps = {
    changeViewModeHandler: (viewMode: ViewMode) => void;
}

export default function Transactions({changeViewModeHandler}: Readonly<TransactionsProps>) {
    return (
        <>
            <h1>Transakcje</h1>
            <div className='actions'>
                <button onClick={() => changeViewModeHandler(ViewMode.ACCOUNTS)}>Powrót do listy kont</button>
            </div>
        </>
    )
}