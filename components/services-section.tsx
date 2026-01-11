"use client"

import { Sparkles, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, SplitText)

export function ServicesSection() {

  const container = useRef(null);
  let aboutContentRefText = useRef(null);
  let aboutContentRef = useRef(null);

  useGSAP(() => {
    gsap.from(
      ".heading",
      {
        opacity: 0,
        y: 100,
        duration: 0.5,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: "#Services",
          start: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    )
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
    })

    gsap.from(
      ".service-left-content",
      {
        opacity: 0,
        x: -300,
        duration: 1,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: "#Services",
          start: "0% 40%",
          toggleActions: "play none none reverse"
        }
      }
    )

    gsap.from(
      ".service-right-content",
      {
        opacity: 0,
        x: 300,
        duration: 1,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: "#Services",
          start: "0% 40%",
          toggleActions: "play none none reverse"
        }
      }
    )
    return () => {
      split.revert();
    };
  }, { scope: container })
  return (
    <section id="Services" className="py-12 md:py-16 relative overflow-hidden" ref={container}>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  flex flex-col items-center">

        <div className="inline-flex items-center gap-2 text-accent bg-accent/10 border border-accent/30 px-4 py-2 rounded-full text-sm font-medium mb-4 mx-auto">
          <Sparkles className="w-4 h-4" />
          <span>Freelance Services</span>
        </div>
        <div className="mb-12 w-full lg:w-2/3" ref={aboutContentRef}>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 text-center tracking-tight md:leading-20 heading">
            Tailored <span className="rounded-full bg-primary/10 text-primary px-8 py-2 inline-block">Digital Solutions</span> for Every Growth Stage
          </h2>
          <p className="text-lg text-center text-gray-600" ref={aboutContentRefText}>
            Whether you are a small brand just starting out or an established business needing a marketing refresh, I provide tailored solutions that drive real results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-4 flex relative service-left-content">
            <div className="bg-[#F3F4C8] p-8 rounded-2xl shadow-sm flex-1 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">1. Online Presence for Small Brands</h3>
                <p className="text-gray-700 mb-6">From zero to hero. I help local businesses and small brands establish a compelling digital footprint with professional websites, social media setup, and brand identity.</p>
                <ul className="space-y-2 mb-6 grow">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Website Design & Development</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Social Media Setup</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Brand Identity</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Domain & Hosting Setup</span>
                  </li>
                </ul>
                <div className="space-y-3">
                  <div className="bg-[#ECEEC0] border border-[#DADD9E] p-3 rounded-xl">
                    <span className="block font-bold text-gray-800">Make Your First Website Live</span>
                    <span className="text-sm text-gray-600">Starting from ₹16k (for first year)*</span>
                  </div>
                  <div className="bg-[#ECEEC0] border border-[#DADD9E] p-3 rounded-xl">
                    <span className="block font-bold text-gray-800">Single Landing Page</span>
                    <span className="text-sm text-gray-600">₹8k (for first year)*</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600"><i>* Ads Budget is not included</i></p>
              </div>
            </div>
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-6 h-3/4 border-t-4 border-b-4 border-r-4 border-dashed border-gray-300 rounded-r-xl -ml-1 z-0"></div>
          </div>

          <div className="hidden lg:block lg:col-span-4 relative h-64 lg:h-auto">
            <div className="w-full h-full rounded-3xl overflow-hidden relative z-20 shadow-lg border-4 border-white">
              <Image
                src="/img-sayani-hero.webp"
                alt="Sayani's team collaborating on digital strategy"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6 relative service-right-content">
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-6 h-3/4 border-t-4 border-b-4 border-l-4 border-dashed border-gray-300 rounded-l-xl -mr-1 z-0"></div>
            <div className="bg-gray-900 p-8 rounded-2xl shadow-sm text-white relative z-10 flex-1">
              <h3 className="text-2xl font-bold mb-3">2. Content Strategy & Digital Marketing</h3>
              <p className="text-gray-400 leading-relaxed">
                Drive engagement and conversions with data-driven content strategies, SEO optimization, social media campaigns including LinkedIn, Instagram, Facebook & Quora, and targeted Google/Meta ads.
              </p>
            </div>

            <div className="bg-[#BEE3E9] p-8 rounded-2xl shadow-sm relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-cyan-900 mb-3">3. Business Analytics</h3>
                <p className="text-cyan-800 leading-relaxed mb-6">
                  Make informed decisions with market research, competitor analysis, SWOT frameworks, and business intelligence dashboards using Power BI and Excel.
                </p>
              </div>
              <Link href="#Footer">
                <button className="w-full py-3 px-6 bg-[#1A4D53] hover:bg-[#133a3f] text-white font-semibold rounded-xl transition duration-300 text-center">
                  Consult Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
