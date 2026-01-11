// components/InstagramCard.tsx
"use client"
import { ExternalLink, Instagram } from "lucide-react"; // Make sure you have lucide-react or use another icon

interface Props {
    url: string;
    caption?: string;
}

export default function InstagramCard({ url, caption }: Props) {
    // Extract the ID to maybe show a thumbnail in the future if you add an API
    // For now, we create a beautiful, crash-proof card.

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center w-full md:w-[328px] h-[350px] bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-pink-200 transition-all duration-300 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 opacity-50 group-hover:opacity-100 transition-opacity" />

            {/* Icon */}
            <div className="bg-pink-50 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Instagram className="w-8 h-8 text-[#E1306C]" />
            </div>

            {/* Text */}
            <div className="text-center px-6">
                <h3 className="font-bold text-gray-800 mb-2">View on Instagram</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {caption || "Click to open this post in the Instagram app."}
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#E1306C] opacity-80 group-hover:opacity-100">
                    Open Post <ExternalLink className="w-4 h-4" />
                </div>
            </div>
        </a>
    );
}