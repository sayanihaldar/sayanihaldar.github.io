"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BookHeart, Camera, Heart, Palette, Play } from "lucide-react"
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image"
import { useRef } from "react"
import { SplitText } from "gsap/SplitText"
import Flower from "@/components/flower";
import DrawingsPreviewSection from "@/components/DrawingsPreviewSection";

gsap.registerPlugin(useGSAP, ScrollSmoother, ScrollTrigger, SplitText);

export default function AboutClient({ drawings }: { drawings: any[] }) {

    const main = useRef<HTMLDivElement>(null);
    const smoother = useRef<ScrollSmoother>(null);
    let aboutContentRefText = useRef(null);
    let aboutContentRef = useRef(null);

    useGSAP(
        () => {
            smoother.current = ScrollSmoother.create({
                smooth: 1.2, // seconds it takes to "catch up" to native scroll position
                effects: false, // look for data-speed and data-lag attributes on elements and animate accordingly
                smoothTouch: 0.1,
                normalizeScroll: false, // <--- TRY TURNING THIS FALSE if specific sections jitter
                ignoreMobileResize: true,
            });

            // const handleClick = (e: any) => {
            //     // Check if the clicked element (or its parent) is a hash link
            //     const link = e.target.closest('a[href^="#"]');

            //     if (link) {
            //         e.preventDefault();
            //         const id = link.getAttribute("href");

            //         // Ensure the target exists and smoother is ready
            //         if (id && smoother.current) {
            //             smoother.current.scrollTo(id, true, "top top");
            //         }
            //     }
            // };

            // // Add global listener
            // document.addEventListener("click", handleClick);

            const split = new SplitText(aboutContentRefText.current, {
                type: "words, lines",
                linesClass: "split-line",
                autoSplit: true,
                onSplit: (instance) => {
                    return gsap.from(instance.lines, {
                        yPercent: 120,
                        stagger: 0.2,
                        duration: 0.4,
                        opacity: 0,
                        ease: "easeOut",
                        scrollTrigger: {
                            trigger: aboutContentRef.current,
                            start: "clamp(top center)",
                            end: "clamp(bottom center)"
                        }
                    });
                }
            });

            const links = document.querySelectorAll('a[href^="#"]');

            links.forEach(link => {

                link.addEventListener("click", (e) => {

                    e.preventDefault();

                    const id = link.getAttribute("href");

                    if (id && smoother.current) {

                        smoother.current.scrollTo(id, true, "top top");

                    }

                });

            });
            return () => {
                split.revert();
                // document.removeEventListener("click", handleClick);
            };
        },
        { scope: main }
    );

    return (
        <div className="min-h-screen bg-white" ref={main}>
            <Navbar />
            <Flower />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <section className="w-full pt-12 md:pt-24 overflow-hidden relative">

                        <svg className="absolute" width="0" height="0">
                            <defs>
                                <clipPath id="hero-clip-shape" clipPathUnits="objectBoundingBox">
                                    <path d="M 0 0 Q 0.5 0.12 1 0 L 1 0.75 Q 1 0.85 0.95 0.85 L 0.72 0.85 C 0.67 0.85 0.64 1 0.58 1 L 0.42 1 C 0.36 1 0.33 0.85 0.28 0.85 L 0.05 0.85 Q 0 0.85 0 0.75 Z" />
                                </clipPath>
                            </defs>
                        </svg>

                        <div className="container mx-auto px-4 md:px-6 z-10 relative">

                            {/* --- Typography Header Section --- */}
                            <div className="relative mb-8 md:mb-12">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                                    <div className="hidden lg:block lg:col-span-2 xl:col-span-3 text-xs text-gray-500 pb-4 max-w-[200px] leading-relaxed">
                                        <div className="bg-[#F3E2E5] w-48 h-48 rounded-full flex justify-center items-center relative -mb-40 z-10">
                                            <img src="/img-text-icon-about-me.png" className="w-11/12 absolute inset-2 animation-spin" alt="" />
                                            <div className="bg-[#881337] rounded-full w-7/12 h-7/12 flex justify-center items-center">
                                                <img src="/img-favicon.png" alt="" />
                                            </div>
                                        </div>

                                    </div>

                                    {/* Center Main Title */}
                                    <div className="col-span-12 lg:col-span-8 xl:col-span-6 text-center mt-12">
                                        <div
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6"
                                        >
                                            <Heart className="h-4 w-4 text-accent fill-accent" />
                                            <span className="text-sm font-medium text-accent tracking-wide">Beyond the Resume</span>
                                        </div>
                                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 text-center tracking-tight md:leading-20 heading">
                                            The <span className="rounded-full bg-primary/10 text-primary px-8 py-2 inline-block">Creative Side</span> of Sayani
                                        </h1>
                                    </div>

                                    {/* Right Description Text */}
                                    <div className="hidden lg:block lg:col-span-2 xl:col-span-3 text-xs text-gray-500 pb-4 max-w-[200px] leading-relaxed">

                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 pt-4 justify-center">
                                    <a href="#story" className=" bg-[#881337] hover:bg-[#70102d] text-white px-8 py-4 font-bold rounded-sm shadow-xl shadow-rose-200 transition-all flex items-center">
                                        My Story
                                    </a>
                                    <a href="/hello" className="flex items-center gap-2 font-bold text-gray-700 hover:text-rose-600 transition-colors group">
                                        My Favorites
                                        <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-rose-600">
                                            <Play className="w-3 h-3 fill-current" />
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* --- The Shaped Image Container --- */}
                            <div className="relative w-full mx-auto mt-0">
                                <div
                                    className="relative w-full h-[400px] md:h-[500px] bg-gray-900"
                                    style={{
                                        clipPath: "url(#hero-clip-shape)",
                                        WebkitClipPath: "url(#hero-clip-shape)",
                                        // Optional: adds a subtle shadow *inside* the clipped area
                                        filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.15))"
                                    }}
                                >
                                    {/* Background Image */}
                                    <Image
                                        src="/img-sayani-about-banner.webp" // Replace with your actual image path
                                        alt="Construction worker looking at site"
                                        fill
                                        className="object-cover opacity-90"
                                        priority
                                    />
                                </div>

                            </div>
                        </div>
                    </section>
                    <section id="story" className="w-full py-12 lg:py-16 overflow-hidden">
                        <div className="container max-w-7xl mx-auto px-4 md:px-6">
                            <div className="flex flex-col items-start z-10" ref={aboutContentRef}>
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6"
                                >
                                    <Heart className="h-4 w-4 text-accent fill-accent" />
                                    <span className="text-sm font-medium text-accent tracking-wide">My Story</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 heading" ref={aboutContentRefText}>
                                    I am a Kolkata soul who finds magic in the mayhem. Whether I’m behind the wheel <span className="relative inline-block text-gray-500">
                                        chasing
                                        <span className="absolute left-0 top-1/2 w-full h-[2px] bg-primary -rotate-3"></span>
                                    </span> <span className="text-primary">enjoying</span> a new horizon, capturing moments through my lens, or finding peace by the Ganga, I believe in living life with a full plate and a warm heart.
                                </h2>
                                <div className="flex gap-y-8 gap-x-20 mt-8">
                                    <div className="w-1/2 text-xl leading-relaxed flex flex-col justify-center">
                                        <p>I’m a nurturer at heart, loving my parents, friends, and every animal I meet like my own child. I love dogs, cats, my home is a happy little zoo currently ruled by my cat Putu and her kittens, and I’ll always have a soft spot for rabbits after raising my bunny, Hampi. I love pouring that care into the kitchen, cooking up everything from spicy North Indian dishes to traditional Bengali feasts for the people I love.</p>

                                        <p className="mt-5">My energy swings between two extremes! I’m a trained Bharatnatyam dancer who loves driving cars, swimming, and hitting the dance floor at pubs with my friends & cousins. But I also find my absolute peace sitting by the Ganga river banks or attending the Sandhya Aarti. I’m a total foodie who loves exploring every corner of Kolkata, soaking in the city's vibe from the malls to the streets.</p>

                                        <p className="mt-5">Creativity is my fuel—whether I’m crafting, painting, singing, or editing videos. I’m also an avid traveler with a suitcase always half-packed, having explored the hills of Darjeeling, serene beauty of Rajasthan, calmness of Kerala and the temples of the Tirupati, Vaishno Devi etc. Whether I’m acting in a short film or binge-watching a thriller, I try to fill every day with a little bit of magic.</p>
                                    </div>
                                    <div className="w-1/2 flex gap-4">
                                        <div>
                                            <Image src="/img-sayani-hero.webp" alt="Sayani" width={0} height={0} className="w-full rounded-2xl h-96 object-cover" />
                                            <Image src="/img-sayani-hero.webp" alt="Sayani" width={0} height={0} className="w-full rounded-2xl h-72 mt-4 object-cover" />
                                        </div>
                                        <div>
                                            <Image src="/img-sayani-hero.webp" alt="Sayani" width={0} height={0} className="w-full rounded-2xl h-72 object-cover" />
                                            <Image src="/img-sayani-hero.webp" alt="Sayani" width={0} height={0} className="w-full rounded-2xl h-96 mt-4 object-cover" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <DrawingsPreviewSection drawings={drawings} />
                    <Footer />
                </div>
            </div>
        </div>
    )
}
