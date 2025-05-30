import AppRoutes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AppRoutes />
        </div>
      </main>
    </QueryClientProvider>
  );
}

export default App;
