"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Palette, Camera, Plane } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import gsap from "gsap"
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(SplitText, ScrollTrigger);

export function BriefAboutSection() {

  const container = useRef(null);
  let aboutContentRefText = useRef(null);
  let aboutContentRef = useRef(null);

  useGSAP(
    () => {

      gsap.from(".about-left", {
        opacity: 0,
        x: -100,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".about-left",
          start: "50% 80%",
          toggleActions: "play none none reverse",
        }
      });
      gsap.from(".about-right", {
        opacity: 0,
        x: 100,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".about-right",
          start: "50% 80%",
          toggleActions: "play none none reverse",
        }
      });
      gsap.from(".about-box", {
        opacity: 0,
        y: 100,
        rotate: 10,
        duration: 1,
        stagger: 0.2,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: "#About",
          start: "0% 40%",
          toggleActions: "play none none reverse"
        }
      });
    }, { scope: container }
  )

  const photosLeft = [
    { src: "/img-sayani-hero.webp", alt: "Team member 1" },
    { src: "/img-sayani-hero.webp", alt: "Globe visual" },
    { src: "/img-sayani-hero.webp", alt: "Team member 2" },
  ];
  const photosRight = [
    { src: "/img-sayani-hero.webp", alt: "Cake visual 1" },
    { src: "/img-sayani-hero.webp", alt: "Team member 3" },
    { src: "/img-sayani-hero.webp", alt: "Globe visual 2" },
  ];
  return (
    <section id="About" className="py-12 lg:py-16 xl:py-36 bg-white relative overflow-hidden" ref={container}>


      <div className="xl:hidden w-full overflow-x-auto flex gap-4 p-6 pb-12 snap-x">
        <Splide aria-label="About Images - Mobile"
          options={{
            rewind: true,
            width: '100%',
            perPage: 4,
            pagination: false,
            arrows: false,
            gap: '1.5rem',
            type: 'loop',
            autoplay: true,
            interval: 3000,
            speed: 1000,
            breakpoints: {
              650: {
                perPage: 2,
              },
              767: {
                perPage: 3,
              },
            }
          }}>
          {[...photosLeft, ...photosRight].map((photo, i) => (

            <SplideSlide key={i}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={350}
                height={0}
                className="object-cover h-auto rounded-2xl"
              />
            </SplideSlide>

          ))}
        </Splide>

      </div>

      <div className="hidden xl:flex flex-col gap-6 absolute -left-12 2xl:left-20 top-1/2 -translate-y-1/2 -rotate-15 opacity-90 origin-center about-left">
        {photosLeft.map((photo, i) => (
          <div key={i} className="bg-white p-2 shadow-xl">
            <div className="relative w-64 h-72 overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden xl:flex flex-col gap-6 absolute -right-12 2xl:right-20 top-1/2 -translate-y-1/2 rotate-15 opacity-90 origin-center about-right">
        {photosRight.map((photo, i) => (
          <div key={i} className="bg-white p-2 shadow-xl">
            <div className="relative w-64 h-72 overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="z-10 text-center px-4 max-w-3xl xl:max-w-4xl mx-auto flex flex-col items-center gap-2 xl:mt-[-5vh] about-content" ref={aboutContentRef}>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/30 mb-3 lg:mb-6 about-heading">
          <Heart className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold text-accent tracking-wide">Beyond the Numbers</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-balance leading-tight about-heading">
          Meet the Person Behind the <span className="gradient-text-creative">Professional</span>
        </h2>

        <p className="text-lg text-foreground/75 mb-6 leading-relaxed font-medium sentenceSplit" ref={aboutContentRefText}>
          👋 Hello, I'm Sayani — a Kolkata-based marketing strategist and analyst by day, but also a painter, photographer, travel enthusiast and pet mom who finds joy in life's little moments.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-primary/8 border-2 border-primary/15 hover:border-primary/30 transition-color about-box">
            <Palette className="h-7 w-7 text-primary mb-2" />
            <span className="text-sm font-semibold text-primary">Painting</span>
          </div>
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-secondary/8 border-2 border-secondary/15 hover:border-secondary/30 transition-color about-box">
            <Camera className="h-7 w-7 text-secondary mb-2" />
            <span className="text-sm font-semibold text-secondary">Photography</span>
          </div>
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-accent/8 border-2 border-accent/15 hover:border-accent/30 transition-color about-box">
            <Plane className="h-7 w-7 text-accent mb-2" />
            <span className="text-sm font-semibold text-accent">Traveling</span>
          </div>
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-primary/8 border-2 border-primary/15 hover:border-primary/30 transition-color about-box">
            <Heart className="h-7 w-7 text-primary mb-2 fill-primary" />
            <span className="text-sm font-semibold text-primary">Pet Lover</span>
          </div>
        </div>

        <Button
          asChild
          className="rounded-sm bg-linear-to-r from-primary to-accent hover:opacity-90 text-white shadow-xl font-semibold text-base px-20 py-7"
        >
          <Link href="/about">
            Explore My World <ArrowRight className="ml-2 h-8 w-8" />
          </Link>
        </Button>
      </div>

    </section>
  )
}
