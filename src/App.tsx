import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { useAuthStore } from './store/authStore';
import Header from './components/Header';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 py-8 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
       
        <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />}  />
        <Route path="/" element={isAuthenticated ? 
        <>
        <Header /> 
        <Home /> 
        </> 
        : <Navigate to="/login" />} />


        </Routes>
      </div>
      </main>

  );
}

export default App;
