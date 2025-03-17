export enum ViewMode {
    ACCOUNTS,
    TRANSACTIONS,
    ACCOUNT_CREATION_FORM,
    DEPOSIT_FORM,
    WITHDRAWAL_FORM,
    TRANSFER_FORM,
}

export enum TransactionType {
    DEPOSIT,
    WITHDRAWAL,
}

export type Account = {
    accountNumber: string;
    ownerName: string;
    currency: string;
    balance: string;
};
