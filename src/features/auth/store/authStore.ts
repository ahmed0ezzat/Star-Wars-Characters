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
        // Only allow a specific username/password for demo/testing
        if (username === 'testuser' && password === 'testpass') {
            const token = btoa(`${username}:${password}`); //mock JWK
            localStorage.setItem('token', token); //not secure ONLY for demo.
            set({ token, isAuthenticated: true });
        } else {
            throw new Error('Invalid credentials');
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, isAuthenticated: false });
    },
}))
