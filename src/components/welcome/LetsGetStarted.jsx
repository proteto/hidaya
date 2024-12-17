"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/app/createClient";

const LetsGetStarted = ({ onButtonClick }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        (async () => {
            const { data: session, error } = await supabase.auth.getSession();

            if (error || !session?.session?.user) {
                return;
            }

            setCurrentUser(session.session.user);
        })();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTypedText("Let's Get Started".slice(0, typedText.length + 1));
        }, 50);

        return () => clearTimeout(timeout);
    }, [typedText]);

    const handleContinue = async () => {
        onButtonClick();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center p-8">
            <div className="w-fit flex flex-col justify-center mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-green-500 text-left capitalize">
                    {typedText}
                </h2>
                <button
                    onClick={handleContinue}
                    className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-fit bg-green-500 cursor-pointer focus:ring-2 text-white py-3 px-10 rounded-full hover:bg-green-600 transition flex items-center justify-center"
                    >
                    Continue <ArrowRight size={20} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

export default LetsGetStarted;

