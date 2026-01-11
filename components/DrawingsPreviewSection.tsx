"use client"
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play } from "lucide-react";

interface DrawingItem {
    name: string;
    link: string;
}

interface Props {
    drawings: DrawingItem[];
}

// 1. Helper to clean URLs
const cleanLink = (link?: string) => {
    if (!link) return "";
    let clean = link.replace(/\s/g, '');
    return clean.split('?')[0];
};

// 2. ROBUST INSTAGRAM POST (Black Box - No Caption)
const InstagramPost = ({ url }: { url: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        if (containerRef.current) {
            // Manual HTML Injection (No Caption)
            const embedHTML = `
        <blockquote 
          class="instagram-media" 
          data-instgrm-permalink="${url}" 
          data-instgrm-version="14" 
          style="background:#FFF; border:0; border-radius:3px; box-shadow:none; margin:1px; max-width:328px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"> 
        </blockquote>
      `;
            containerRef.current.innerHTML = embedHTML;

            // Load Script if missing
            if (!(window as any).instgrm) {
                const script = document.createElement("script");
                script.src = "//www.instagram.com/embed.js";
                script.async = true;
                document.body.appendChild(script);
            }

            // Process
            setTimeout(() => {
                if ((window as any).instgrm) {
                    (window as any).instgrm.Embeds.process();
                }
            }, 1000);
        }
    }, [url]);

    return <div ref={containerRef} className="flex justify-center" />;
};

export default function DrawingsPreviewSection({ drawings }: Props) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Limit to first 10 items
    const previewItems = drawings.slice(0, 6);

    return (
        <section className="py-12 w-full" id="Drawings">
            <h2 className="text-3xl font-serif font-bold text-center text-[#8a1c4b] mb-8">
                Through My Brush
            </h2>

            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto px-4">
                {previewItems.map((item, index) => {
                    const rawLink = cleanLink(item.link);
                    const itemKey = `${rawLink}-${index}`;
                    const isValidUrl = rawLink.includes("instagram.com");

                    if (!rawLink && !item.name) return null;

                    return (
                        <div key={itemKey} className="w-full md:w-[320px] flex flex-col items-center bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            {hasMounted && isValidUrl ? (
                                <InstagramPost url={rawLink} />
                            ) : (
                                <div className="h-[300px] w-full bg-gray-50 rounded flex items-center justify-center text-gray-400 text-xs text-center border border-dashed border-gray-200">
                                    {hasMounted ? (
                                        <a href={rawLink} target="_blank" className="text-[#8a1c4b] underline font-bold">View Link</a>
                                    ) : "Loading..."}
                                </div>
                            )}
                            {item.name && (
                                <p className="mt-4 text-sm font-bold text-center tracking-tight text-[#8a1c4b] px-1 line-clamp-2">
                                    {item.name}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-12 justify-center">
                <a href="/hello" className=" bg-primary hover:bg-[#70102d] text-white px-8 py-4 font-bold rounded-sm shadow-xl shadow-rose-200 transition-all flex items-center">
                    Checkout My Favorite Things
                </a>
                <a href="https://www.instagram.com/the.blossomart" target="_blank" className="flex items-center gap-2 font-bold text-gray-700 hover:text-rose-600 transition-colors group">
                    View All Drawings
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-rose-600">
                        <Play className="w-3 h-3 fill-current" />
                    </div>
                </a>
            </div>
        </section>
    );
}