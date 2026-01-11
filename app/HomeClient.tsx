"use client"

import { useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProfessionalSection } from "@/components/professional-section"
import { BriefAboutSection } from "@/components/brief-about-section"
import { ServicesSection } from "@/components/services-section"
import { Footer } from "@/components/footer"
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import Flower from "@/components/flower"
import Review from "@/components/review"

// Register plugins inside the client component
gsap.registerPlugin(useGSAP, ScrollSmoother, ScrollTrigger, MorphSVGPlugin);
interface Props {
    resumeData: {
        skills: string[];
        experiences: any[];
    };
}
export default function HomeClient({ resumeData }: Props) {
    const main = useRef(null);
    const smoother = useRef<ScrollSmoother | null>(null);

    useGSAP(
        () => {
            smoother.current = ScrollSmoother.create({
                smooth: 1.2,
                effects: false,
                smoothTouch: 0.1,
                normalizeScroll: false,
                ignoreMobileResize: true,
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
            // return () => {
            //     document.removeEventListener("click", handleClick);
            // };
        },
        { scope: main }
    );

    return (
        <main className="min-h-screen" ref={main}>
            <Flower />
            <Navbar />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <Hero />
                    <ServicesSection />

                    <div id="professional" className="mesh-gradient-dark text-white noise-texture">
                        {/* Pass the data down to the section */}
                        <ProfessionalSection data={resumeData} />
                    </div>

                    <Review />
                    <BriefAboutSection />
                    <div id="Footer">
                        <Footer />
                    </div>
                </div>
            </div>
        </main>
    );
}