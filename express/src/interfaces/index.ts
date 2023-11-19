export interface TxnResponse {
    status: boolean,
    txHash?: string;
    error?: string;
}

export interface Voter {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    unit: number;
    state: number;
    address?: string;
    privateKey?: string;
}


export interface AppResponse<T> {
    status: boolean;
    message?: string;
    data?: T;
}