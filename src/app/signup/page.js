"use client";
import { supabase } from '@/app/createClient';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            displayName
          }
        }
      });

      if (signupError) {
        setError(signupError.message);
      }

      if (data) {
        setPopupOpen(true);
        setLoading(false);
      }


    } catch (error) {
      setError(error.message);
    }
  };

  const handleRedirect = () => {
    () => setPopupOpen(false)
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-800 shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Image Section */}
          <div className="md:w-1/2 bg-gray-900 flex items-center justify-center p-8">
            <div className="text-center mx-auto">
              <div className='w-full'>
                <Image
                  src="/logo.png"
                  alt="Alim Logo"
                  width={300}
                  height={300}
                  priority
                  className="rounded-full border-4 border-green mx-auto shadow-lg"
                />
              </div>
              <h2 className="text-3xl font-bold text-white mt-6 uppercase">
                Welcome to <span className='text-green-500 font-extrabold'>hidaya</span>
              </h2>
              <p className="text-gray-400 mt-4 text-lg leading-relaxed">
                A Comprehensive Guide to Islam
              </p>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="md:w-1/2 bg-gray-900 p-8 flex items-center">
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div>
                <h1 className="text-4xl font-extrabold text-white mb-2">
                  Get Started
                </h1>
                <p className="text-gray-400">
                  Create your account to begin your journey
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="displayName"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                  />
                </div>
                <p className='text-xs leading-relaxed text-gray-400'>Password must be at least 6  characters</p>
              </div>

              <div>
                <p className="text-red-500 text-sm text-center">{error}</p>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full py-3 rounded-full bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out text-white font-semibold"
                >
                  {loading ? <div className="flex justify-center items-center space-x-2"> <p className="text-white">Signing up </p> <CircularProgress color="inherit" size={20} /> </div> : 'Sign Up'}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Already have an account? <a href="/login" className="text-indigo-500 hover:text-indigo-700 transition">Log in</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-60 bg-white/50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-2/3 max-w-2xl">
            <h2 className="text-2xl text-gray-100 font-bold text-center mt-4 mb-10">
              Check your email for the confirmation link
            </h2>
            <p className="text-gray-600 text-center mb-5">
              We have sent a confirmation email to your email account. Please check your email and click on the link to confirm your account.
            </p>
            <div className="text-center mt-4">
              <Button
                variant="contained"
                color="primary"
                className="w-full py-3 rounded-full bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out text-white font-semibold"
                onClick={handleRedirect} href='/login'
              >
                Go to Login Page
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

