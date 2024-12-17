import React, { useState } from 'react';

const Button = ({ 
  children, 
  variant = 'contained', 
  color = 'primary', 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (disabled) return;

    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 500);

    // Call user's onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  // Determine button classes based on variant and color
  const variantClasses = {
    contained: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600',
      success: 'bg-green-500 text-white hover:bg-green-600',
      error: 'bg-red-500 text-white hover:bg-red-600'
    },
    outlined: {
      primary: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
      secondary: 'border border-gray-500 text-gray-500 hover:bg-gray-50',
      success: 'border border-green-500 text-green-500 hover:bg-green-50',
      error: 'border border-red-500 text-red-500 hover:bg-red-50'
    },
    text: {
      primary: 'text-blue-500 hover:bg-blue-50',
      secondary: 'text-gray-500 hover:bg-gray-50',
      success: 'text-green-500 hover:bg-green-50',
      error: 'text-red-500 hover:bg-red-50'
    }
  };

  return (
    <button
      className={`
        relative 
        px-4 py-2 
        transition-all 
        duration-200 
        outline-none 
        overflow-hidden 
        ${variantClasses[variant][color]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/50 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
      {children}
    </button>
  );
};

export default Button;
