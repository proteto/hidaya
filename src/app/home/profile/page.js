"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/createClient';
import { MapPin, Pencil } from 'lucide-react';
import Image from 'next/image';

// Separate Component for Profile Header
const ProfileHeader = ({ level, country }) => (
    <div className="flex justify-between p-4 bg-gray-700 border-b border-gray-600">
        <div className="flex items-center space-x-3">
            <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {level}
            </div>
        </div>
        <div className="text-gray-300 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            {country}
        </div>
    </div>
);

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async (email) => {
        try {
            const { data: user, error } = await supabase
                .from('users')
                .select('name, country, level, email')
                .eq('email', email)
                .single();

            if (error) {
                setError('Error fetching user data.');
                return null;
            }

            return user;
        } catch (err) {
            setError('An unexpected error occurred.');
            return null;
        }
    };

    useEffect(() => {
        const loadUserData = async () => {
            setLoading(true);
            setError(null);

            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                const user = await fetchUser(session.user.email);

                if (user) {
                    setUserData({
                        name: user.name,
                        country: user.country,
                        level: user.level,
                        email: user.email,
                        progress: 65,
                    });
                    setEditedName(user.name);
                } else if (!error) {
                    setError('User not found.');
                }
            } else {
                setError('No session found, please login');
            }
            setLoading(false);
        };

        loadUserData();
    }, []);

    const handleNameSave = async () => {
        if (!editedName.trim()) {
            alert('Name cannot be empty.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await supabase
                    .from('users')
                    .update({ name: editedName.trim() })
                    .eq('email', session.user.email);

                setUserData(prev => ({ ...prev, name: editedName.trim() }));
                setIsEditing(false);
                setLoading(false);
            }
        } catch (err) {
            setError('Failed to update name.');
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditedName(userData.name);
        setIsEditing(false);
    }

    if (loading) {
        return <div className="bg-gray-900 flex justify-center p-4 rounded-xl min-h-screen items-center font-sans">Loading...</div>
    }

    if (error) {
        return <div className="bg-gray-900 flex justify-center p-4 rounded-xl min-h-screen items-center font-sans">Error: {error}</div>;
    }

    if (!userData) return null;

    return (
        <div className="bg-gray-900 flex justify-center p-4 rounded-xl min-h-screen items-center font-sans">
            <div className="w-full max-w-md bg-gray-800 shadow-md rounded-xl overflow-hidden">
                <ProfileHeader level={userData.level} country={userData.country} />

                <div className="flex flex-col items-center py-6 px-4">
                    {/* Name Editing */}
                    <div className="flex items-center">
                        {isEditing ? (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="border px-2 py-1 rounded text-center bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                />
                                <br />
                                <button
                                    onClick={handleNameSave}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-all duration-300"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <h2 className="text-2xl font-bold mr-2 text-white">{userData.name}</h2>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-gray-400 hover:text-gray-300 focus:outline-none transition-colors duration-300"
                                >
                                    <Pencil className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Email Display */}
                    <p className="text-gray-400 mt-2">
                        {userData.email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;