import { create } from 'zustand';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => void;
    logout: ()=> void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    login: (username, password) => {
        const token = btoa(`${username}:${password}`); //mock JWK
        localStorage.setItem('token', token); //not secure ONLY for demo.
        set({ token, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, isAuthenticated: false });
    },
}))
