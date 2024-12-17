"use client";
import { useEffect, useState } from 'react';
import PageLoader from '@/components/PageLoader';
import { supabase } from '@/app/createClient';

const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(data?.user);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe?.();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <>
      <div>
        {children}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default AuthWrapper;