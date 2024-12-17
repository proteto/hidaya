"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { supabase } from '../createClient';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data, error: apiError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (apiError) {
        setError(apiError?.message);
      } else if (data) {
        console.log('logined successfully');
        router.push("/login/confirm");
      }
    } catch (error) {
      setError(error?.message);
    }

    setLoading(false);
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
                Welcome to <span className='text-green-500 font-extrabold'> hidaya</span>
              </h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
              A Comprehensive Guide to Islam
              </p>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="md:w-1/2 bg-gray-900 p-8 flex items-center">
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div>
                <h1 className="text-4xl font-extrabold text-white mb-2">
                  Login
                </h1>
                <p className="text-gray-400">
                  Enter your email and password to login
                </p>
              </div>

              <div className="space-y-4">
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
              </div>

              <div className="text-red-500">{error}</div>

              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full py-3 rounded-full bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out text-white font-semibold"
                >
                  {loading ? <div className="flex justify-center items-center space-x-2"> <p className="text-white">Logging In </p> <CircularProgress color="inherit" size={20} /> </div> : 'Login'}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account? <a href="/signup" className="text-indigo-500 hover:text-indigo-700 transition">Create Account</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

