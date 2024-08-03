import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignupPageGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.displayName) {
      navigate('/setup');
      return;
    }
    if (user) {
      navigate('/');
    }
  }, [user]);

  return <>{children}</>;
}
