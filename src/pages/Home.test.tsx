import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect } from 'vitest';

const queryClient = new QueryClient();

describe('Home Page', () => {
  it('renders search bar and loader', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </QueryClientProvider>
    );
    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
    // Loader should be present
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
