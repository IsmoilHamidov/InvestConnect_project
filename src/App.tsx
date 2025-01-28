import React, { useState, useEffect } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router';
import { Toaster } from "@/components/ui/toaster";
import Loading from './components/Loading/Loading';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); 
    }, 2100); 

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div>
      {isLoading ? (

        <Loading />
      ) : (
        <>
          <RouterProvider router={router} />
          <Toaster />
        </>
      )}
    </div>
  );
};

export default App;
