import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
  autoRedirect?: boolean;
  redirectTimeout?: number;
}

function ErrorMessage({ 
  message, 
  onRetry,
  showRetry = true,
  autoRedirect = false,
  redirectTimeout = 5000
}: ErrorMessageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (autoRedirect) {
      const timer = setTimeout(() => {
        onRetry ? onRetry() : navigate('/');
      }, redirectTimeout);
      return () => clearTimeout(timer);
    }
  }, [autoRedirect, navigate, redirectTimeout, onRetry]);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full mx-auto text-center">
        {/* Error Icon with animation */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/20 mb-6 animate-pulse">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-red-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        {/* Error Message */}
        <div className="bg-red-600/20 border border-red-500/50 text-red-100 px-6 py-4 rounded-xl mb-8 text-lg">
          {message}
        </div>
        {/* Retry Button */}
        {showRetry && (
          <button
            onClick={handleRetry}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            Retry
          </button>
        )}
        {/* Auto-redirect countdown */}
        {autoRedirect && (
          <div className="mt-6 text-gray-400 text-sm">
            {onRetry ? 'Retrying' : 'Redirecting'} in {Math.ceil(redirectTimeout/1000)} seconds...
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
