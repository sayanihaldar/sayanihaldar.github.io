"use client"
import { useState, useEffect, useRef } from "react";
import { PersonalData } from "@/utils/fetchPersonalData";

interface Props {
    data: PersonalData;
}

const TABS = [
    "Reels & Pose Ideas",
    "My Watch List",
    "Date Ideas",
    "Through My Brush",
    "My Type of Places"
];

const cleanStr = (str?: string) => str?.trim() || "No Tag";

const cleanLink = (link?: string) => {
    if (!link) return "";
    let clean = link.replace(/\s/g, '');
    return clean.split('?')[0];
};

// --- 1. ROBUST INSTAGRAM POST (Black Box) ---
const InstagramPost = ({ url }: { url: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        if (containerRef.current) {
            // Removed 'data-instgrm-captioned'
            const embedHTML = `
        <blockquote 
          class="instagram-media" 
          data-instgrm-permalink="${url}" 
          data-instgrm-version="14" 
          style="background:#FFF; border:0; border-radius:3px; box-shadow:none; margin:1px; max-width:328px; min-width:326px; padding:0; width:calc(100% - 2px);"> 
        </blockquote>
      `;
            containerRef.current.innerHTML = embedHTML;

            if (!(window as any).instgrm) {
                const script = document.createElement("script");
                script.src = "//www.instagram.com/embed.js";
                script.async = true;
                document.body.appendChild(script);
            }

            setTimeout(() => {
                if ((window as any).instgrm) {
                    (window as any).instgrm.Embeds.process();
                }
            }, 1000);
        }

        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const id = link.getAttribute("href");
                // Find the target element by ID
                if (id) {
                    const target = document.querySelector(id);

                    if (target) {
                        // Native smooth scroll
                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start" // Aligns top of element to top of viewport
                        });
                    }
                }
            });
        });
    }, [url]);

    return <div ref={containerRef} className="flex justify-center" />;
};

// --- 2. GRID COMPONENT ---
const InstagramGrid = ({ items, filterValue, search }: { items: any[], filterValue?: string, search?: string }) => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => setHasMounted(true), []);

    return (
        <div className="flex flex-wrap justify-center gap-6 w-full">
            {items.map((item, index) => {
                const rawLink = cleanLink(item.link);
                const itemKey = `${rawLink || 'fallback'}-${index}`;

                let isVisible = true;
                if (filterValue && filterValue !== "All" && cleanStr(item.type) !== filterValue) isVisible = false;
                if (search && search.trim() !== "" && item.name && !item.name.toLowerCase().includes(search.toLowerCase())) isVisible = false;

                if (!rawLink && !item.name) return null;
                const isValidUrl = rawLink.includes("instagram.com");

                return (
                    <div key={itemKey} className={`w-full md:w-[350px] flex flex-col items-center p-2 transition-all duration-300 ${isVisible ? 'block' : 'hidden'}`}>
                        {hasMounted && isValidUrl ? (
                            <InstagramPost url={rawLink} />
                        ) : (
                            <div className="h-[100px] w-full bg-gray-50 rounded flex flex-col items-center justify-center text-gray-400 text-xs p-4 text-center border border-dashed border-gray-200">
                                {hasMounted ? <a href={rawLink} target="_blank" className="text-[#8a1c4b] underline font-bold">View Link</a> : "Loading..."}
                            </div>
                        )}
                        {item.name && <p className="mt-4 text-sm font-bold text-center tracking-tight text-[#8a1c4b] px-1 line-clamp-2">{item.name}</p>}
                    </div>
                );
            })}
        </div>
    );
};

export default function PersonalDashboard({ data }: Props) {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [rpSubTab, setRpSubTab] = useState<"Reels" | "Poses">("Reels");
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setActiveFilter("All");
        setSearchQuery("");
    };

    const getUniqueTypes = (items: any[], key = "type") => {
        const types = items.map(item => cleanStr(item[key]));
        return ["All", ...Array.from(new Set(types))];
    };

    // We calculate types for buttons, but we don't swap the Grid data anymore
    const currentRpList = rpSubTab === "Reels" ? data.reels : data.poses;
    const rpTypes = getUniqueTypes(currentRpList);

    const placeTypes = getUniqueTypes(data.places);
    const watchTypes = getUniqueTypes(data.watchList, "type");
    const dateTypes = getUniqueTypes(data.dateIdeas);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-wrap justify-center gap-4">
                {TABS.map((tab) => (
                    <button key={tab} onClick={() => handleTabChange(tab)}
                        className={`cursor-pointer h-24 md:h-32 w-[150px] md:w-[180px] rounded-2xl flex items-center justify-center p-4 text-center transition-all duration-300
              ${activeTab === tab ? "bg-[#8a1c4b] text-white shadow-lg scale-105 font-bold" : "bg-white text-[#8a1c4b] border-2 border-pink-50 hover:border-pink-200 hover:shadow-md font-medium"}
            `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="min-h-[500px] bg-white/50 rounded-3xl p-4 md:p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-serif text-center font-bold text-[#8a1c4b] mb-6 border-b border-pink-100 pb-2">{activeTab}</h2>

                {/* --- REELS & POSES TAB --- */}
                <div className={activeTab === "Reels & Pose Ideas" ? "block" : "hidden"}>
                    <div className="space-y-6">
                        {/* Sub-Tab Buttons */}
                        <div className="flex justify-center gap-4">
                            {["Reels", "Poses"].map((sub) => (
                                <button key={sub} onClick={() => { setRpSubTab(sub as any); setActiveFilter("All"); }}
                                    className={`cursor-pointer px-6 py-2 rounded-full font-medium transition-colors ${rpSubTab === sub ? "bg-[#8a1c4b] text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-pink-50"
                                        }`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>

                        {/* Filter Buttons (Dynamic based on sub-tab, this is fast/fine) */}
                        <div className="flex flex-wrap gap-2 justify-center max-w-5xl mx-auto">
                            {rpTypes.map((type) => (
                                <button key={type} onClick={() => setActiveFilter(type)}
                                    className={`cursor-pointer px-4 py-1 text-sm rounded-full border transition-all ${activeFilter === type ? "bg-pink-200 border-pink-300 text-[#8a1c4b] font-semibold" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {/* FIX: Render BOTH Grids. 
                   Use CSS to hide the one not in use.
                   This keeps the iframes alive in the background.
                */}
                        <div className={rpSubTab === "Reels" ? "block" : "hidden"}>
                            <InstagramGrid items={data.reels} filterValue={activeFilter} />
                        </div>

                        <div className={rpSubTab === "Poses" ? "block" : "hidden"}>
                            <InstagramGrid items={data.poses} filterValue={activeFilter} />
                        </div>
                    </div>
                </div>

                {/* DRAWINGS */}
                <div className={activeTab === "Through My Brush" ? "block" : "hidden"}>
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <input type="text" placeholder="Search drawings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full max-w-md px-4 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#8a1c4b] bg-white text-black" />
                        </div>
                        <InstagramGrid items={data.drawings} search={searchQuery} />
                    </div>
                </div>

                {/* PLACES */}
                <div className={activeTab === "My Type of Places" ? "block" : "hidden"}>
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {placeTypes.map((type) => (
                                <button key={type} onClick={() => setActiveFilter(type)} className={`cursor-pointer px-4 py-1 text-sm rounded-full border transition-all ${activeFilter === type ? "bg-pink-200 border-pink-300 text-[#8a1c4b]" : "bg-white"}`}>{type}</button>
                            ))}
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {data.places.map((item, idx) => {
                                const isVisible = activeFilter === "All" || cleanStr(item.type) === activeFilter;
                                return (
                                    <div key={`${item.place}-${idx}`} className={`w-full md:w-[45%] lg:w-[30%] relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm group hover:shadow-md transition-all flex flex-col items-center ${isVisible ? 'block' : 'hidden'}`}>
                                        <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-pink-400 to-[#8a1c4b]"></div>
                                        <h3 className="font-bold text-center tracking-tight text-[#8a1c4b] text-xl pl-2">{item.place}</h3>
                                        <div className="mt-2 pl-2 flex justify-center items-center gap-2 text-sm text-gray-600 w-full">
                                            <span>📍 {cleanStr(item.type)}</span>
                                            <span>•</span>
                                            <span>⏱ {item.time}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* WATCH LIST */}
                <div className={activeTab === "My Watch List" ? "block" : "hidden"}>
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {watchTypes.map((type) => (
                                <button key={type} onClick={() => setActiveFilter(type)} className={`cursor-pointer px-4 py-1 text-sm rounded-full border transition-all ${activeFilter === type ? "bg-pink-200 border-pink-300 text-[#8a1c4b]" : "bg-white"}`}>{type}</button>
                            ))}
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {data.watchList.map((item, idx) => {
                                const isVisible = activeFilter === "All" || cleanStr(item.type) === activeFilter;
                                return (
                                    <div key={`${item.name}-${idx}`} className={`w-full md:w-[45%] lg:w-[30%] bg-white p-6 rounded-2xl shadow-sm border border-pink-100 hover:border-pink-300 transition-all flex flex-col items-center ${isVisible ? 'block' : 'hidden'}`}>
                                        <h3 className="text-xl font-bold text-center tracking-tight text-[#8a1c4b]">{item.name}</h3>
                                        <div className="flex justify-center gap-2 mt-2 flex-wrap text-xs w-full">
                                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">{cleanStr(item.genre)}</span>
                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{cleanStr(item.language)}</span>
                                            <span className={`px-2 py-1 rounded ${item.rewatch === "Yes" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>Rewatch: {item.rewatch}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* DATE IDEAS */}
                <div className={activeTab === "Date Ideas" ? "block" : "hidden"}>
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {dateTypes.map((type) => (
                                <button key={type} onClick={() => setActiveFilter(type)} className={`cursor-pointer px-4 py-1 text-sm rounded-full border transition-all ${activeFilter === type ? "bg-pink-200 border-pink-300 text-[#8a1c4b]" : "bg-white"}`}>{type}</button>
                            ))}
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {data.dateIdeas.map((item, idx) => {
                                const isVisible = activeFilter === "All" || cleanStr(item.type) === activeFilter;
                                return (
                                    <div key={`${item.name}-${idx}`} className={`w-full md:w-[45%] lg:w-[30%] bg-white p-5 rounded-2xl shadow-sm border-l-4 border-[#8a1c4b] flex flex-col justify-center ${isVisible ? 'block' : 'hidden'}`}>
                                        <h3 className="font-bold text-center tracking-tight text-[#8a1c4b] text-lg">{item.name}</h3>
                                        <div className="flex justify-between items-center mt-3 text-sm w-full px-2">
                                            <span className="text-gray-500 italic">{cleanStr(item.type)}</span>
                                            <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">{item.time}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}