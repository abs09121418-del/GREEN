
import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const savedAuth = localStorage.getItem('linkhub_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('linkhub_auth', 'true');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060a07] flex items-center justify-center">
        <div className="relative">
           <div className="w-16 h-16 border-4 border-emerald-900/30 border-t-emerald-500 rounded-full animate-spin" />
           <div className="absolute inset-0 flex items-center justify-center text-emerald-500 font-bold text-xs">B</div>
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <Landing onStart={handleLogin} />
      )}
    </div>
  );
};

export default App;
