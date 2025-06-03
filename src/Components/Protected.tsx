import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ProtectedProps = {
  children: React.ReactNode;
};

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("Token");
    if (!login) {
      navigate('/login');
    }
  }, [navigate]); 

  return <>{children}</>;
};

export default Protected;
