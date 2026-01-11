import { Play, ArrowRight, Sparkles, Star, MousePointer2 } from 'lucide-react';
import Image from "next/image";

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)
export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.from(
      ".left-content",
      {
        opacity: 0,
        x: -300,
        duration: 1,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: "#Hero",
          start: "0% 40%",
          toggleActions: "play none none reverse"
        }
      }
    )

    gsap.from(
      ".right-content",
      {
        opacity: 0,
        x: 300,
        duration: 1,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: "#Hero",
          start: "0% 40%",
          toggleActions: "play none none reverse"
        }
      }
    )
    gsap.from(
      ".hero-stat",
      {
        opacity: 0,
        y: 100,
        duration: 0.5,
        stagger: 0.2,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: "#Hero",
          start: "50% 40%",
          toggleActions: "play none none reverse"
        }
      }
    )
  })
  return (
    <div id='Hero' className="min-h-screen w-full bg-linear-to-br from-pink-50 via-rose-50 to-orange-50 relative overflow-hidden font-sans text-gray-900 flex flex-col justify-between" ref={heroRef}>

      <main className="container px-4 mx-auto lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 gap-y-0 relative z-10 grow pt-24 lg:mt-0 justify-center lg:justify-start text-center lg:text-left">

        <div className="space-y-8 left-content">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#9D174D]/30 bg-[#9D174D]/5 text-[#9D174D] text-sm font-sans font-medium mb-6 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Available for Freelance & Full-time</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-none my-0">
            Sayani Haldar
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight leading-none flex flex-col gap-0 mt-4 sm:mt-2 sm:block items-center justify-center">
            <span className="text-[#BE185D]">Marketing</span>
            <span className="font-light font-sans text-4xl md:text-7xl text-gray-400 mx-2 leading-1.5">×</span>
            <span className="text-[#2F4F4F]">Analytics</span>
          </h2>
          <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
            <span className="flex items-center gap-2 text-sm font-bold text-gray-600">
              <Sparkles className="w-4 h-4 text-rose-500 fill-rose-500" /> Digital Specialist
            </span>
            <span className="flex items-center gap-2 text-sm font-bold text-gray-600">
              <MousePointer2 className="w-4 h-4 text-gray-800" /> Business Analyst
            </span>
            <span className="flex items-center gap-2 text-sm font-bold text-gray-600">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Strategic Insights
            </span>
          </div>

          {/* Description Paragraph */}
          <p className="text-gray-500 text-lg leading-relaxed max-w-full lg:max-w-lg">
            Digital marketing specialist turned business analyst, crafting data-driven campaigns and strategic insights. From running ads to building dashboards.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-6 pt-4 justify-center lg:justify-start">
            <a href="#professional" className=" bg-[#881337] hover:bg-[#70102d] text-white px-8 py-4 font-bold rounded-sm shadow-xl shadow-rose-200 transition-all flex items-center">
              Explore My Work
            </a>
            <a href="#About" className="flex items-center gap-2 font-bold text-gray-700 hover:text-rose-600 transition-colors group">
              Discover My World
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-rose-600">
                <Play className="w-3 h-3 fill-current" />
              </div>
            </a>
          </div>

          <div className="absolute bottom-20 left-10 text-rose-300 animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
        </div>

        <div className="relative flex flex-col justify-center items-center h-[500px] w-full z-[-1]">

          <div className="absolute w-[600px] h-[600px] rounded-full border border-secondary/40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

          <div className="absolute w-[700px] h-[700px] rounded-full border border-primary/20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute top-10 right-20 w-4 h-4 rounded-full bg-rose-400"></div>
          </div>

          <div className="absolute w-[300px] h-[300px] rounded-full border border-gray-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute bottom-10 left-4">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 rotate-12" />
            </div>
          </div>

          <div className="relative z-10 w-96 h-96 xl:w-[500px] xl:h-[500px] rounded-full border-8 border-white shadow-2xl bg-linear-to-b from-rose-100 to-pink-200 overflow-hidden flex items-center justify-center right-content">

            <Image
              src="/img-sayani-hero.webp"
              alt="Sayani Haldar"
              fill
              className="w-full h-full object-cover opacity-90 mix-blend-multiply"
            />
          </div>

          {/* Floating Element around head */}
          <div className="absolute top-20 right-20 w-8 h-8 text-rose-500">
            <Sparkles />
          </div>
        </div>

      </main>
      <div className="relative z-20 w-full bg-gray-900 text-white py-12">
        {/* Decorative Shape (Triangle on top right of the black bar) */}
        <div className="absolute -top-6 right-24 text-rose-400">
          <Star className="w-10 h-10 fill-current" />
        </div>

        <div className="container mx-auto px-6 lg:px-16 flex flex-col sm:flex-row gap-12 gap-y-4 lg:gap-24 items-start sm:items-center justify-around">

          {/* Stat 1 */}
          <div className="flex flex-col w-full text-center sm:text-left hero-stat">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="text-3xl">👩‍💻</span>
              <span className="text-4xl font-bold">10+</span>
            </div>
            <span className="text-gray-400 text-sm pl-12 uppercase tracking-wide">Projects Done</span>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-gray-700"></div>

          {/* Stat 2 */}
          <div className="flex flex-col w-full text-center sm:text-left hero-stat">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="text-3xl">🚀</span>
              <span className="text-4xl font-bold">12+</span>
            </div>
            <span className="text-gray-400 text-sm pl-12 uppercase tracking-wide">Feedback</span>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-gray-700"></div>

          {/* Stat 3 */}
          <div className="flex flex-col w-full text-center sm:text-left hero-stat">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="text-3xl">💰</span>
              <span className="text-4xl font-bold">10K+</span>
            </div>
            <span className="text-gray-400 text-sm pl-12 uppercase tracking-wide">Total Users</span>
          </div>
        </div>
      </div>
    </div>
  );
}