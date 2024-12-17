"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/createClient";

const Status = ({ onButtonClick }) => {
    const [selectedstatus, setSelectedStatus] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [typedText, setTypedText] = React.useState("");
    const router = useRouter();

    React.useEffect(() => {
        const getSession = async () => {
            const { data: session, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error getting session:", error);
            } else if (session?.session?.user) {
                setUser(session.session.user);
            }
        };

        getSession();
    }, []);

    React.useEffect(() => {
        if (typedText.length < "What's Your Status?".length) {
            const timeout = setTimeout(() => {
                setTypedText("What's Your Status?".slice(0, typedText.length + 1));
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [typedText]);

    const handleSelectAsMuslim = () => {
        setSelectedStatus("I am muslim");
    };

    const handleSelectAsNewToIslam = async () => {
        setSelectedStatus("I am new to Islam");
        try {
            const { error } = await supabase
                .from("users")
                .update({ level: 1, progress: 1 })
                .match({ email: user.email });

            if (error) {
                console.error("Error updating user:", error.message || error);
            }
        } catch (error) {
            console.error("Error during updating user:", error.message || error);
        }
        router.push("/home");
    };

    const handleCheckMyLevel = () => {
        window.location.href = "/welcome/check-my-level";
    };

    const handleContinue = async () => {
        if (selectedstatus === "I am muslim") {
            onButtonClick();
        } else if (selectedstatus === "I am new to Islam") {
            try {
                const { error } = await supabase
                    .from("users")
                    .update({ level: 1 })
                    .match({ email: user.email });

                if (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center p-8">
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-green-500 text-left capitalize">
                    {typedText}
                </h2>
                <div className="max-w-2xl w-full bg-gray-800 rounded-3xl p-8 shadow-lg space-y-4">
                    <button
                        onClick={handleSelectAsMuslim}
                        className={`w-full text-left p-4 rounded-xl transition capitalize
                        ${selectedstatus === "I am muslim"
                                ? "bg-green-100 text-green-500 font-bold border-green-500"
                                : "bg-gray-900 hover:bg-gray-700"
                            }`}
                    >
                        I am muslim
                    </button>
                    <button
                        onClick={handleSelectAsNewToIslam}
                        className={`w-full text-left p-4 rounded-xl transition capitalize
                        ${selectedstatus === "I am new to Islam"
                                ? "bg-green-100 text-green-500 font-bold border-green-500"
                                : "bg-gray-900 hover:bg-gray-700"
                            }`}
                    >
                        I am new to Islam
                    </button>
                    <button
                        onClick={handleCheckMyLevel}
                        className="w-fit text-left py-1 px-4 capitalize hover:bg-gray-700 hover:text-green-500 rounded-full transition-all duration-500 ease"
                    >
                        Check My Level
                    </button>
                </div>
                <button
                    onClick={handleContinue}
                    className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 w-fit bg-green-500 cursor-pointer focus:ring-2 text-white py-3 px-10 rounded-full hover:bg-green-600 transition flex items-center justify-center ${selectedstatus ? "" : "opacity-50 cursor-not-allowed"}`}
                    disabled={!selectedstatus}
                >
                    Continue <ArrowRight size={20} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

export default Status;

