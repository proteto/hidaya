import { ArrowRight } from "lucide-react";

export default function SubHeading1({ onSubHeading1, onSubHeading2, onSubHeading3, onSubHeading4, onSubHeading5, onSubHeading6  }) {
    return (
        <>
            <div className="rounded-lg p-4 transition-all flex items-center justify-between my-4 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col">
                    <p className="font-semibold text-xs border w-fit px-2 py-1 rounded-full mb-4">Heading</p>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold uppercase">Allah</span>
                    </div>
                </div>
                <button
                    className="text-green-500 hover:bg-gray-900 bg-gray-700 hover:text-green-700 disabled:opacity-50 cursor-pointer p-2 rounded-full transition-all duration-500 mr-6"
                    onClick={onSubHeading1}
                >
                    <ArrowRight size={32} />
                </button>
            </div>
            <div className="rounded-lg p-4 transition-all flex items-center justify-between my-4 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col">
                    <p className="font-semibold text-xs border w-fit px-2 py-1 rounded-full mb-4">Heading</p>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold uppercase">Messengers of God</span>
                    </div>
                </div>
                <button
                    className="text-green-500 hover:bg-gray-900 bg-gray-700 hover:text-green-700 disabled:opacity-50 cursor-pointer p-2 rounded-full transition-all duration-500 mr-6"
                    onClick={onSubHeading2}
                >
                    <ArrowRight size={32} />
                </button>
            </div>
            <div className="rounded-lg p-4 transition-all flex items-center justify-between my-4 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col">
                    <p className="font-semibold text-xs border w-fit px-2 py-1 rounded-full mb-4">Heading</p>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold uppercase">Divinely revealed books</span>
                    </div>
                </div>
                <button
                    className="text-green-500 hover:bg-gray-900 bg-gray-700 hover:text-green-700 disabled:opacity-50 cursor-pointer p-2 rounded-full transition-all duration-500 mr-6"
                    onClick={onSubHeading3}
                >
                    <ArrowRight size={32} />
                </button>
            </div>
            <div className="rounded-lg p-4 transition-all flex items-center justify-between my-4 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col">
                    <p className="font-semibold text-xs border w-fit px-2 py-1 rounded-full mb-4">Heading</p>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold uppercase">ANGELS</span>
                    </div>
                </div>
                <button
                    className="text-green-500 hover:bg-gray-900 bg-gray-700 hover:text-green-700 disabled:opacity-50 cursor-pointer p-2 rounded-full transition-all duration-500 mr-6"
                    onClick={onSubHeading4}
                >
                    <ArrowRight size={32} />
                </button>
            </div>
            <div className="rounded-lg p-4 transition-all flex items-center justify-between my-4 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col">
                    <p className="font-semibold text-xs border w-fit px-2 py-1 rounded-full mb-4">Heading</p>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold uppercase">Day of Judgment</span>
                    </div>
                </div>
                <button
                    className="text-green-500 hover:bg-gray-900 bg-gray-700 hover:text-green-700 disabled:opacity-50 cursor-pointer p-2 rounded-full transition-all duration-500 mr-6"
                    onClick={onSubHeading5}
                >
                    <ArrowRight size={32} />
                </button>
            </div>
            <div className="rounded-lg p-4 transition-all flex items-center justify-between my-4 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col">
                    <p className="font-semibold text-xs border w-fit px-2 py-1 rounded-full mb-4">Heading</p>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold uppercase">Qadr</span>
                    </div>
                </div>
                <button
                    className="text-green-500 hover:bg-gray-900 bg-gray-700 hover:text-green-700 disabled:opacity-50 cursor-pointer p-2 rounded-full transition-all duration-500 mr-6"
                    onClick={onSubHeading6}
                >
                    <ArrowRight size={32} />
                </button>
            </div>
        </>
    );
}