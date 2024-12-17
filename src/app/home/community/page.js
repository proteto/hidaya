"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/createClient';

const Chatroom = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userName, setUserName] = useState('');
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        // Fetch initial messages from Supabase when component mounts
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching messages:', error);
            } else {
                setMessages(data);
            }
        };

        fetchMessages();

        // Setup a real-time subscription to changes in the messages table
        const messageSubscription = supabase
            .channel('public:messages')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    const insertedMessage = payload.new;
                    setMessages((prevMessages) => [...prevMessages, insertedMessage]);
                }
            )
            .subscribe();

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(messageSubscription);
        };
    }, []);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || userName.trim() === '') {
            alert("Please enter your username and message");
            return;
        }

        const { error } = await supabase
            .from('messages')
            .insert([{ sender: userName, message: newMessage }]);

        if (error) {
            console.error('Error sending message:', error);
        } else {
            setNewMessage('');
        }
    };

    return (
        <div className="font-inter w-full mx-auto bg-gray-900 overflow-hidden h-screen flex flex-col relative tracking-tight md:h-[85vh] md:my-8">
            {!userName ? (
                <div className="w-full flex justify-center items-center bg-gray-800 backdrop-blur-md z-50 rounded-3xl py-4 min-h-full">
                    <div className="w-11/12 max-w-md text-center bg-zinc-900 p-10 rounded-3xl shadow-2xl border border-white/10">
                        <h2 className="text-3xl mb-4 font-bold tracking-tighter text-white">
                            Welcome to Chat
                        </h2>
                        <p className="text-zinc-400 mb-6">
                            Please enter your name to join the conversation
                        </p>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="text"
                                id="username-input"
                                placeholder="Your name"
                                className="w-full px-6 py-4 rounded-xl border-2 border-zinc-700 bg-zinc-800 text-white focus:border-green-500 "
                            />
                            <button
                                onClick={() => {
                                    const nameInput = document.getElementById('username-input');
                                    if (nameInput.value.trim()) {
                                        setUserName(nameInput.value.trim());
                                    } else {
                                        alert('Please enter a valid name');
                                    }
                                }}
                                className="w-full py-4 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all active:scale-[0.98]"
                            >
                                Join Chat
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="px-6 py-5 bg-green-600 flex justify-between items-center shadow-md">
                        <div className="flex items-center space-x-6">
                            <Link 
                                href="/dashboard" 
                                className="flex items-center space-x-2 text-white text-sm font-semibold bg-white/15 px-3 py-2 rounded-lg hover:bg-white/25 transition-all"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Back
                            </Link>
                            <h2 className="text-2xl font-semibold text-white">Chat Room</h2>
                        </div>
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                            Logged in as: {userName}
                        </span>
                    </div>
                    <div 
                        ref={messagesContainerRef} 
                        className="flex-grow px-6 py-6 overflow-y-auto flex flex-col space-y-4 bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 scroll-smooth"
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === userName ? 'justify-end' : 'justify-start'}`}
                            >
                                <div 
                                    className={`max-w-[85%] p-4 rounded-2xl shadow-md 
                                        ${msg.sender === userName 
                                            ? 'bg-gradient-to-br from-green-500 to-green-600 text-white rounded-br-sm' 
                                            : 'bg-gradient-to-br from-zinc-700 to-zinc-800 text-white rounded-bl-sm'}
                                        animate-fade-in md:max-w-[70%]`}
                                >
                                    <div className="text-xs text-white/70 mb-1">
                                        {msg.sender}
                                    </div>
                                    <div className="text-base leading-relaxed">
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="px-6 py-5 bg-zinc-800 border-t border-white/5 flex space-x-4">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                            className="flex-grow px-6 py-3 rounded-full border-2 border-zinc-700 bg-zinc-700 text-white focus:border-green-500 focus:ring-4 focus:ring-green-500/15"
                        />
                        <button 
                            onClick={handleSendMessage}
                            className="px-6 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-all active:scale-[0.98]"
                        >
                            Send
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Chatroom;