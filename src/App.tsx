import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (

        <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />}  />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />


        </Routes>

  );
}

export default App;
