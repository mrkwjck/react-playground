import { ViewMode } from "./common";
import "./common.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import * as React from "react";

type AccountCreationFormProps = {
    changeViewModeHandler: (viewMode: ViewMode) => void;
};

type AccountCreationRequest = {
    ownerName: string;
};

export default function AccountCreationForm({ changeViewModeHandler }: Readonly<AccountCreationFormProps>) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const accountCreation = useMutation({
        mutationFn: (accountCreationRequest: AccountCreationRequest) => {
            return axios.post(`http://localhost:8080/api/v1/accounts`, accountCreationRequest);
        },
        onSuccess: () => {
            changeViewModeHandler(ViewMode.ACCOUNTS);
        },
    });

    const createAccount = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        accountCreation.mutate({ ownerName: firstName + " " + lastName });
    };

    return (
        <>
            <h1>Utwórz konto bankowe</h1>
            <div className="actions">
                <button onClick={() => changeViewModeHandler(ViewMode.ACCOUNTS)}>Powrót do listy kont</button>
            </div>
            <p>
                <input onChange={(event) => setFirstName(event.target.value)} value={firstName} />
            </p>
            <p>
                <input onChange={(event) => setLastName(event.target.value)} value={lastName} />
            </p>
            <button onClick={createAccount}>Zapisz</button>
        </>
    );
}
