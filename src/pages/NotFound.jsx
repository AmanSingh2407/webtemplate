import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '../components/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-6 shadow-xl">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-extrabold text-white mb-2">404</h1>
      <h2 className="text-2xl font-bold text-neutral-200 mb-4">Page Not Found</h2>
      <p className="text-sm text-neutral-400 max-w-md mb-8">
        The page or route you are looking for does not exist or has been moved.
      </p>
      <Button variant="primary" onClick={() => navigate('/home')} icon={Home}>
        Return to Dashboard
      </Button>
    </div>
  );
};
