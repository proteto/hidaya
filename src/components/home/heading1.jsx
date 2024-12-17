import { ArrowRight } from "lucide-react";

export default function Heading1({ onHeading1, onHeading2  }) {
    return (
        <>
            <div className="rounded-lg p-4 transition-all flex items-center justify-between my-4 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col">
                    <p className="font-semibold text-xs border w-fit px-2 py-1 rounded-full mb-4">Heading</p>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold uppercase">Five Pillars of Islam</span>
                    </div>
                </div>
                <button
                    className="text-green-500 hover:bg-gray-900 bg-gray-700 hover:text-green-700 disabled:opacity-50 cursor-pointer p-2 rounded-full transition-all duration-500 mr-6"
                    onClick={onHeading1}
                >
                    <ArrowRight size={32} />
                </button>
            </div>
            <div className="rounded-lg p-4 transition-all flex items-center justify-between my-4 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col">
                    <p className="font-semibold text-xs border w-fit px-2 py-1 rounded-full mb-4">Heading</p>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold uppercase">six articles of faith</span>
                    </div>
                </div>
                <button
                    className="text-green-500 hover:bg-gray-900 bg-gray-700 hover:text-green-700 disabled:opacity-50 cursor-pointer p-2 rounded-full transition-all duration-500 mr-6"
                    onClick={onHeading2}
                >
                    <ArrowRight size={32} />
                </button>
            </div>
        </>
    );
}