import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import { beforeAll, describe, it, expect, vi } from 'vitest';

vi.mock('../store/authStore', () => ({
  useAuthStore: () => ({
    login: vi.fn(() => Promise.resolve()),
  }),
}));

beforeAll(() => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem = vi.fn();
    window.localStorage.getItem = vi.fn();
    window.localStorage.removeItem = vi.fn();
  }
});

describe('Login Page', () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits login form', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    // You can add more assertions here for navigation or state
  });
});
