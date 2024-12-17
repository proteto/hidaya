import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

const QiblaFinder = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [qiblaDirection, setQiblaDirection] = useState(null);
    const [compassHeading, setCompassHeading] = useState(null);
    const [error, setError] = useState(null);

    // Coordinates of the Kaaba in Mecca
    const KAABA_LATITUDE = 21.4225;
    const KAABA_LONGITUDE = 39.8262;

    // Calculate Qibla direction using spherical trigonometry
    const calculateQiblaDirection = (lat1, lon1) => {
        const lat1Rad = lat1 * (Math.PI / 180);
        const lon1Rad = lon1 * (Math.PI / 180);
        const lat2Rad = KAABA_LATITUDE * (Math.PI / 180);
        const lon2Rad = KAABA_LONGITUDE * (Math.PI / 180);

        const y = Math.sin(lon2Rad - lon1Rad) * Math.cos(lat2Rad);
        const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad);

        let bearingRad = Math.atan2(y, x);
        let bearingDeg = bearingRad * (180 / Math.PI);

        // Normalize to 0-360 degrees
        bearingDeg = (bearingDeg + 360) % 360;

        return Math.round(bearingDeg);
    };

    // Get user's current location
    const getLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
                setQiblaDirection(calculateQiblaDirection(latitude, longitude));
            },
            (err) => {
                setError(`Error: ${err.message}`);
            }
        );
    };

    // Handle device orientation for compass
    useEffect(() => {
        const handleOrientation = (event) => {
            // Different browsers use different properties
            const heading = event.alpha !== null
                ? event.alpha
                : (360 - event.webkitCompassHeading);

            setCompassHeading(Math.round(heading));
        };

        window.addEventListener('deviceorientation', handleOrientation);

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Qibla Finder</h2>

            {error && (
                <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <button
                onClick={getLocation}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            >
                Find My Qibla Direction
            </button>

            {latitude && longitude && (
                <div className="mt-4">
                    <p className="font-semibold">Your Location:</p>
                    <p>Latitude: {latitude.toFixed(4)}°</p>
                    <p>Longitude: {longitude.toFixed(4)}°</p>

                    <div className="mt-4">
                        <p className="font-semibold">Qibla Direction:</p>
                        <p className="text-xl font-bold">{qiblaDirection}° from North</p>
                    </div>
                </div>
            )}

            {compassHeading !== null && (
                <div className="mt-6">
                    <div className="relative w-48 h-48 mx-auto">
                        <div
                            className="absolute inset-0 bg-gray-200 rounded-full"
                            style={{
                                transform: `rotate(${-compassHeading}deg)`,
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            <div
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 
                            w-2 h-1/2 bg-red-500"
                            />
                            <div
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                            w-2 h-1/2 bg-blue-500"
                            />
                            <Compass
                                className="absolute inset-4 text-gray-700"
                                size={96}
                            />
                        </div>
                    </div>
                    <p className="mt-2">Current Device Heading: {compassHeading}°</p>
                </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
                <p>Note: Accuracy depends on device sensors and location services.</p>
                <p>Best used outdoors with clear sky view.</p>
            </div>
        </div>
    );
};

export default QiblaFinder;