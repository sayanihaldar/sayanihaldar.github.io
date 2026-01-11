"use client";

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react";


const Star = ({ fill = "currentColor" }: { fill?: string }) => (
    <svg className={`w-4 h-4 ${fill}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const testimonials = [
    {
        text: "Their customer support is top-notch! I had an issue with my account, and it was resolved within minutes. Highly recommend!",
        name: "Daniel M",
        role: "Entrepreneur",
        color: "bg-indigo-500 text-white",
        style: "rotate-[-6deg] z-20 translate-y-4 shadow-xl",
        stars: "text-white"
    },
    {
        text: "I love how secure and efficient the online banking system is. Transferring funds and tracking expenses has never been this easy!",
        name: "Sarah L",
        role: "Financial Consultant",
        color: "bg-lime-300 text-gray-900",
        style: "rotate-[6deg] z-10 translate-x-2 shadow-lg",
        stars: "text-gray-800"
    },
    {
        text: "The investment tools and real-time analytics have helped me make smarter financial decisions. A must-have for anyone!",
        name: "Olivia P",
        role: "Investor",
        color: "bg-gray-100 text-gray-800",
        style: "rotate-[-3deg] z-0 -translate-y-8 translate-x-4 shadow-md",
        stars: "text-gray-800"
    },
    {
        text: "This platform has completely changed how I manage my finances. The user-friendly design and quick transactions make banking a breeze!",
        name: "James R",
        role: "Small Business Owner",
        color: "bg-gray-800 text-white",
        style: "rotate-[3deg] z-30 -translate-y-12 -translate-x-2 shadow-2xl",
        stars: "text-white"
    },
];

const Review = () => {
    const container = useRef<HTMLDivElement>(null);
    useGSAP(
        () => {

            gsap.from(".review-left", {
                opacity: 0,
                x: -100,
                duration: 0.6,
                scrollTrigger: {
                    trigger: ".review-left",
                    start: "50% 80%",
                    toggleActions: "play none none reverse",
                }
            });
            gsap.from(".review-right", {
                opacity: 0,
                x: 100,
                duration: 0.6,
                scrollTrigger: {
                    trigger: ".review-right",
                    start: "50% 80%",
                    toggleActions: "play none none reverse",
                }
            });
        }, { scope: container }
    )
    return (
        <section className="relative w-full py-12 lg:py-16 bg-background overflow-hidden" ref={container}>
            {/* Subtle Background Lines (Optional) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="w-[800px] h-[800px] border border-gray-400 rounded-full absolute -top-40 -left-40"></div>
                <div className="w-[700px] h-[700px] border border-gray-400 rounded-full absolute -top-20 -left-20"></div>
                <div className="w-[600px] h-[600px] border border-gray-400 rounded-full absolute top-0 left-0"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">
                {/* Left Content */}
                <div className="max-w-md z-10 review-left">
                    <p className="text-gray-500 text-lg mb-4">
                        “The best customer service is when your customers don’t need you”
                    </p>
                    <h2 className="text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                        Client Tale
                    </h2>
                    <img src="/img-reviews.webp" className="rounded-4xl mt-8" alt="" />
                </div>

                {/* Right Content - Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 lg:pt-0 review-right">
                    {testimonials.map((item, idx) => (
                        <div
                            key={idx}
                            className={`p-6 rounded-2xl flex flex-col justify-between min-h-[220px] transition-transform hover:scale-105 duration-300 ${item.color} ${item.style}`}
                        >
                            <div className="flex space-x-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} fill={item.stars} />
                                ))}
                            </div>
                            <p className="text-sm font-medium leading-relaxed mb-4">
                                {item.text}
                            </p>
                            <div>
                                <span className="block font-bold text-base">{item.name},</span>
                                <span className="text-xs opacity-80">{item.role}.</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Review;