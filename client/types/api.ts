// types/api.d.ts
export interface RegisterResponse {
    message: string;
    _id: string;
    name: string;
    email: string;
    token: string;
}

export interface LoginResponse {
    message: string;
    _id: string;
    name: string;
    email: string;
    token: string;
}

export interface Budget {
    category: string;
    amount: number;
    startDate: string;
    endDate: string;
}

export interface BudgetResponse {
    _id: string;
    category: string;
    amount: number;
    startDate: string;
    endDate: string;
    userId: string;
}
