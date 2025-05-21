interface ErrorMessageProps {
    message: string;
  }
  
  function ErrorMessage({ message }: ErrorMessageProps) {
    return (
      <div className="bg-red-600/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-8 text-center max-w-2xl mx-auto">
        {message}
      </div>
    );
  }
  
  export default ErrorMessage;
  