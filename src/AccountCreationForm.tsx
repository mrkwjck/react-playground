import './common.css'
import { useState } from 'react'
import { ViewMode } from "./Dashboard";

type AccountCreationFormProps = {
    changeViewModeHandler: (viewMode: ViewMode) => void;
}

export default function AccountCreationForm({changeViewModeHandler}: Readonly<AccountCreationFormProps>) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    return (
        <>
            <h1>Utwórz konto bankowe</h1>
            <div className='actions'>
                <button onClick={() => changeViewModeHandler(ViewMode.ACCOUNTS)}>Powrót do listy kont</button>
            </div>
            <p>
                <input onChange={(event) => setFirstName(event.target.value)} value={firstName}/>
            </p>
            <p>
                <input onChange={(event) => setLastName(event.target.value)} value={lastName}/>
            </p>
            <button onClick={() => alert(firstName + ' ' + lastName)}>Zapisz</button>
        </>
    )
}