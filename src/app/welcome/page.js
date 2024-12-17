"use client";
import LetsGetStarted from '@/components/welcome/LetsGetStarted';
import Location from '@/components/welcome/location';
import NowWeContinue from '@/components/welcome/NowWeContinue';
import CheckYourLevel from '@/components/welcome/CheckYourLevel';
import Status from '@/components/welcome/Status';
import Knowledge from '@/components/welcome/knowledge';
import React, { useState } from 'react';

const WelcomePage = () => {
    const [isLocationVisible, setIsLocationVisible] = useState(true);
    const [isLetsGetStartedVisible, setIsLetsGetStartedVisible] = useState(false);
    const [isKnowledgeVisible, setIsKnowledgeVisible] = useState(false);

    const handleLocationButtonClick = () => {
        setIsLocationVisible(false);
        setIsLetsGetStartedVisible(true);
    };

    const handleLetsGetStartedButtonClick = () => {
        setIsLetsGetStartedVisible(false);
        setIsKnowledgeVisible(true);
    };

    const renderComponent = () => {
        if (isLocationVisible) {
            return <Location onButtonClick={handleLocationButtonClick} />;
        }

        if (isLetsGetStartedVisible) {
            return <LetsGetStarted onButtonClick={handleLetsGetStartedButtonClick} />;
        }

        if (isKnowledgeVisible) {
            return <Knowledge />;
        }

        return <NowWeContinue onButtonClick={handleNowWeContinueButtonClick} />;
    };

    return <div>{renderComponent()}</div>;
};

export default WelcomePage;
