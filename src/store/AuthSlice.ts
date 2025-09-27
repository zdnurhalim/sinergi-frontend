import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    name: string;
    email: string;
    role?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface Company {
    id: number;
    company_name: string;
    industry?: string | null;
    company_size?: string | null;
    other_information?: string | null;
    created_at?: string;
    updated_at?: string;
    website?: string | null;
}

export interface AuthData {
    id: number;
    position?: string | null;
    phone?: string | null;
    user: User;
    company?: Company;
}

interface AuthState {
    data: AuthData | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}


const initialState: AuthState = {
    data: null,
    token: null,
    loading: false,
    error: null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ data: AuthData; token: string }>) {
            state.data = action.payload.data;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
        },
        clearAuth(state) {
            state.data = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        },
        setAuthLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setAuthError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setAuth, clearAuth, setAuthLoading, setAuthError } = AuthSlice.actions;
export default AuthSlice.reducer;
