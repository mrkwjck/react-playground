import "./Transactions.css";
import { TransactionType, ViewMode } from "./common";
import "./common.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NumericFormat } from "react-number-format";

type TransactionsProps = {
    accountNumber: string;
    changeViewModeHandler: (viewMode: ViewMode) => void;
};

type Transaction = {
    type: TransactionType;
    amount: number;
    creationTime: string;
};

export default function Transactions({ accountNumber, changeViewModeHandler }: Readonly<TransactionsProps>) {
    const getTransactions = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/accounts/" + accountNumber + "/transactions");
        return response.data;
    };

    const { data, isPending } = useQuery({
        queryKey: ["transactions"],
        queryFn: getTransactions,
    });

    return (
        <>
            <h1>Transakcje</h1>
            <div className="actions">
                <button onClick={() => changeViewModeHandler(ViewMode.ACCOUNTS)}>Powrót do listy kont</button>
            </div>
            <h3>{accountNumber}</h3>
            <ul className="list transactions">
                <li className="header">
                    <span className="column type">Rodzaj transakcji</span>
                    <span className="column amount">Kwota</span>
                    <span className="column date">Data</span>
                </li>
                {isPending
                    ? null
                    : data.map((transaction: Transaction) => (
                          <li key={transaction.creationTime}>
                              <span className="column type">{transaction.type}</span>
                              <span className="column amount">
                                  <NumericFormat
                                      value={transaction.amount}
                                      displayType="text"
                                      decimalScale={2}
                                      decimalSeparator="."
                                      fixedDecimalScale={true}
                                  />
                              </span>
                              <span className="column date">{transaction.creationTime}</span>
                          </li>
                      ))}
            </ul>
        </>
    );
}
