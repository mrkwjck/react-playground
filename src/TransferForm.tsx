import './common.css'
import { ViewMode } from "./Dashboard";

type TransferFormProps = {
    changeViewModeHandler: (viewMode: ViewMode) => void;
}

export default function TransferForm({changeViewModeHandler}: Readonly<TransferFormProps>) {
    return (
        <>
            <h1>Zleć przelew</h1>
            <div className='actions'>
                <button onClick={() => changeViewModeHandler(ViewMode.ACCOUNTS)}>Powrót do listy kont</button>
            </div>
        </>
    )
}