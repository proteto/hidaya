'use client';

import React, { useState } from 'react';
import { Search, Sun, Clock } from 'lucide-react';

function PrayerTimes() {
  const [address, setAddress] = useState('');
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const formattedDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

  const formatTime12Hour = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const fetchPrayerTimes = async () => {
    setLoading(true);
    setError(null);
    setPrayerTimes(null);
    setShowResult(true);

    const method = 8;
    const tune = "2,3,4,5,2,3,4,5,-3";
    const url = `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${address}&method=${method}&tune=${tune}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.code === 200 && data.status === "OK") {
        setPrayerTimes(data.data.timings);
      } else if (data.code === 200 && data.status === "INVALID_ADDRESS") {
        setError("Give a valid higher city");
      } else {
        setError("Give a valid higher city");
      }
    } catch (e) {
      setError("Give a valid higher city");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPrayerTimes();
  };

  const displayedPrayers = prayerTimes
    ? Object.entries(prayerTimes)
      .filter(([key]) => ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(key))
    : [];

  const displayedSunTimes = prayerTimes
    ? Object.entries(prayerTimes)
      .filter(([key]) => ['Sunrise', 'Sunset'].includes(key))
    : [];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full p-4 bg-gray-900 text-white font-sans">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700 transform transition-all">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-500 flex items-center justify-center gap-3">
          <Clock className="w-8 h-8" />
          Prayer Times
        </h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              placeholder="Enter District or Address"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <button 
            type="submit" 
            className="w-full mt-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg"
          >
            Get Prayer Times
          </button>
        </form>

        {loading && (
          <div className="text-center text-gray-400 animate-pulse">
            Loading prayer times...
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        {showResult && prayerTimes && (
          <div className="space-y-4">
            {displayedPrayers.length > 0 && (
              <div className="bg-gray-700 rounded-lg overflow-hidden shadow-md">
                <div className="bg-green-500/20 px-4 py-2 flex items-center gap-2 border-b border-gray-600">
                  <Clock className="w-5 h-5 text-green-500" />
                  <h2 className="text-lg font-semibold text-green-500">Prayer Times</h2>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {displayedPrayers.map(([prayer, time]) => (
                      <tr key={prayer} className="border-b border-gray-600 last:border-b-0 hover:bg-gray-600/50 transition-colors">
                        <td className="px-4 py-3">{prayer}</td>
                        <td className="px-4 py-3 text-right text-green-400">{formatTime12Hour(time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {displayedSunTimes.length > 0 && (
              <div className="bg-gray-700 rounded-lg overflow-hidden shadow-md">
                <div className="bg-yellow-500/20 px-4 py-2 flex items-center gap-2 border-b border-gray-600">
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-semibold text-yellow-500">Sun Times</h2>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {displayedSunTimes.map(([prayer, time]) => (
                      <tr key={prayer} className="border-b border-gray-600 last:border-b-0 hover:bg-gray-600/50 transition-colors">
                        <td className="px-4 py-3">{prayer}</td>
                        <td className="px-4 py-3 text-right text-yellow-400">{formatTime12Hour(time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PrayerTimes;