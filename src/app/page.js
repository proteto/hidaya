"use client";
import Button from '@/components/ui/Button';
import React, { useEffect, useState } from 'react';

const Home = () => {

  return (
    <div className="relative bg-gray-900 transition-colors duration-300 ease-in-out min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 lg:space-x-16">
          {/* Image Container */}
          <div className="flex-shrink-0">
            <div className="bg-gray-800 shadow-md rounded-full p-4 w-full md:w-auto">
              <img src="/logo.png" alt="Alim Logo" className="w-72 h-72 object-contain select-none pointer-events-none rounded-full" />
            </div>
          </div>

          <div className="text-center md:text-left max-w-md space-y-6 select-none">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-50 mb-4 tracking-wide leading-relaxed">
                Welcome to <br /><span className="text-green-500 uppercase"> hidaya</span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed tracking-normal ">
                A Comprehensive Guide to Islam
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <Button variant='contained' color='primary' className='w-full py-3 rounded-full bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out text-white font-semibold' onClick={() => window.location.href = '/signup'}>Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

