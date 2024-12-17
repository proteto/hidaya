  "use client";
  import WelcomeInterface from '@/components/WelcomeInterface'
  import React from 'react'

  const welcomeQeustions = () => {

    const handleOnboarding = async (selections) => {
      try {
        console.log(selections);
        await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selections),
        });
      } catch (error) {
        console.error('Error during onboarding:', error);
      }
    };

    return (
      <div>
        <WelcomeInterface initialOnComplete={handleOnboarding}/>
      </div>
    )
  }

  export default welcomeQeustions