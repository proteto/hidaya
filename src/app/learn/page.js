"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Learn = () => {
  const [userDetails, setUserDetails] = useState(null);
  const Router = useRouter();

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
    else {
      console.log("Sign out success")
      Router.push('/login');
    }
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserDetails(session.user);
      } else {
        console.error('No user session found');
      }
    };

    fetchUserDetails();
  }, []);


  return (
    <div>
      {userDetails ? (
        <div>
          <h1>User Details</h1>
          <p>Email: {userDetails.email}</p>
          <p>ID: {userDetails.id}</p>
          <Button variant='contained' color='success' onClick={logout}>Logout</Button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Learn;