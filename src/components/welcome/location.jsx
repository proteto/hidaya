"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/app/createClient";

const Location = ({ onButtonClick }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [user, setUser] = useState(null);
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
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

    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "The Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo, Democratic Republic of the",
        "Congo, Republic of the",
        "Costa Rica",
        "Côte d’Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "East Timor (Timor-Leste)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "The Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea, North",
        "Korea, South",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia, Federated States of",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar (Burma)",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Sudan, South",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];

    useEffect(() => {
        if (typedText.length < "Choose your country".length) {
            const timeout = setTimeout(() => {
                setTypedText("Choose your country".slice(0, typedText.length + 1));
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [typedText]);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
    };

    const handleContinue = async () => {
        onButtonClick();
        if (!selectedCountry || !user?.email) {
            return;
        }

        try {
            const { error } = await supabase
                .from("users")
                .update({ country: selectedCountry })
                .match({ email: user.email });

            if (error) {
                console.error("Error updating country:", error);
            }
        } catch (error) {
            console.error("Error during updating country:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center p-8">
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-green-500 text-left">
                    {typedText}
                </h2>
                <div className="max-w-2xl w-full bg-gray-800 rounded-3xl p-8 shadow-lg">
                    <div className="space-y-4 h-96 overflow-y-auto pr-4 scroll-m-1">
                        {countries.map((country, index) => (
                            <button
                                key={index}
                                onClick={() => handleCountrySelect(country)}
                                className={`w-full text-left p-4 rounded-xl transition capitalize
                                ${selectedCountry === country
                                        ? "bg-green-100 text-green-500 font-bold border-green-500"
                                        : "bg-gray-900 hover:bg-gray-700"
                                    }`}
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 w-fit bg-green-500 cursor-pointer focus:ring-2 text-white py-3 px-10 rounded-full hover:bg-green-600 transition flex items-center justify-center ${!selectedCountry ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleContinue}
                    disabled={!selectedCountry}
                >
                    Continue <ArrowRight size={20} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

export default Location;

