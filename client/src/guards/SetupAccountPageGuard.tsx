import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SetupAccountPageGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user && user.displayName) {
      navigate('/');
      return;
    }
  }, [user]);

  return <>{children}</>;
}
