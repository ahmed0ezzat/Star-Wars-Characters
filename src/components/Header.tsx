import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="mb-12 relative">
      {/* Centered header content */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 drop-shadow-lg tracking-tight">
          Star Wars Characters
        </h1>
        <p className="text-gray-400 mt-3 text-lg">Explore the galaxy far, far away</p>
      </div>

      {/* Logout button positioned to the side */}
      {isAuthenticated && (
        <div className="flex justify-end -mt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;