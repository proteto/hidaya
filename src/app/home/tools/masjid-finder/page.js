"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';

const MasjidFinder = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [masjids, setMasjids] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const markersRef = useRef([]);

    // Clear existing markers before adding new ones
    const clearMarkers = useCallback(() => {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
    }, []);

    // Initialize map safely
    const initMap = useCallback(() => {
        // Ensure google is defined and available
        if (window.google && mapRef.current && !map) {
            const newMap = new window.google.maps.Map(mapRef.current, {
                center: { lat: 0, lng: 0 },
                zoom: 12,
                mapTypeControl: false,
                streetViewControl: false
            });
            setMap(newMap);
        }
    }, [map, mapRef]);

    // Handle geolocation with more robust error handling
    const handleLocation = useCallback(() => {
        // Ensure Google Maps and geolocation are available
        if (!window.google || !navigator.geolocation) {
            setLocationError("Geolocation or Google Maps is not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (!map) return;

                const newLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Clear previous markers
                clearMarkers();

                // Center map on user location
                map.setCenter(newLocation);
                map.setZoom(12);

                // Add user location marker
                const userMarker = new window.google.maps.Marker({
                    map: map,
                    position: newLocation,
                    icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: "#4285F4",
                        fillOpacity: 0.8,
                        strokeColor: "white",
                        strokeWeight: 2
                    },
                    title: "Your Location"
                });
                markersRef.current.push(userMarker);

                setUserLocation(newLocation);
                findMasjids(newLocation);
            },
            (error) => {
                let errorMessage = "Unknown error";
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location access denied by user";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information unavailable";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out";
                        break;
                }
                setLocationError(errorMessage);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    }, [map, clearMarkers]);

    // Find nearby masjids
    const findMasjids = useCallback((userLocation) => {
        if (!window.google || !map) return;

        const placesService = new window.google.maps.places.PlacesService(map);
        const request = {
            location: userLocation,
            radius: 500, 
            type: 'mosque',
        };

        placesService.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                // Clear previous markers before adding new ones
                clearMarkers();
                displayResults(results);
            } else {
                console.error('Error finding masjids:', status);
                setLocationError("Could not find nearby masjids");
            }
        });
    }, [map, clearMarkers]);

    // Display masjid markers and results
    const displayResults = useCallback((results) => {
        if (!map) return;

        // Limit results to first 10 for performance
        const limitedResults = results.slice(0, 10);
        setMasjids(limitedResults);

        limitedResults.forEach(masjid => {
            const marker = new window.google.maps.Marker({
                map: map,
                position: masjid.geometry.location,
                title: masjid.name,
                icon: {
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                }
            });
            markersRef.current.push(marker);
        });
    }, [map]);

    // Load Google Maps script and initialize map
    useEffect(() => {
        // Check if script is already loaded
        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDfNE2dOAvDzdOL1vtgLyLWMZhLRfJXois&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        } else {
            initMap();
        }
    }, [initMap]);

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 text-white min-h-screen">
            {locationError && (
                <div className="bg-red-600 text-white p-3 rounded-md mb-4">
                    {locationError}
                </div>
            )}
            <div
                id="map"
                className="w-full md:w-4/5 h-[400px] mt-4 rounded-md"
                ref={mapRef}
            />
            <button
                onClick={handleLocation}
                className="block mt-5 py-2 px-4 bg-green-500 hover:bg-green-700 text-white rounded-md focus:outline-none transition-all duration-300"
            >
                Find Nearby Masjids
            </button>
            <div
                id="masjidList"
                className="w-full md:w-4/5 mt-4"
            >
                {masjids.map(masjid => (
                    <div 
                        key={masjid.place_id} 
                        className="bg-gray-800 p-4 mb-4 rounded-md shadow-md border border-gray-700 transition-all duration-300"
                    >
                        <h2 className="text-xl font-semibold mb-2">{masjid.name}</h2>
                        <p className="text-gray-300 mb-2">{masjid.vicinity}</p>
                        <a
                            href={`https://www.google.com/maps/place/?q=place_id:${masjid.place_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-300 underline"
                        >
                            View on Google Maps
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MasjidFinder;