import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../features/auth/pages/Login';
import Header from '../components/Header';
import { useAuthStore } from '../features/auth/store/authStore';

const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Home Route */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <>
              <Header />
              <Home />
            </>
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
