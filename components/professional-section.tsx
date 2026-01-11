"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap, Award, Sparkles, TrendingUp } from "lucide-react"

import gsap from "gsap"
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(SplitText, ScrollTrigger);

export function ProfessionalSection({ data }: { data: any }) {

  const container = useRef(null);
  let aboutContentRefText = useRef(null);
  let aboutContentRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".achievementBox", {
        opacity: 0,
        y: 100,
        duration: 0.4,
        stagger: 0.2,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: ".achievementBoxs",
          start: "50% 80%",
          toggleActions: "play none none reverse",
        }
      });
      gsap.from(".heading", {
        opacity: 0,
        y: 100,
        duration: 0.4,
        ease: "easeOut",
        scrollTrigger: {
          trigger: ".achievementBoxs",
          start: "0% 80%",
          toggleActions: "play none none reverse"
        }
      });
      gsap.from(".skillBadge", {
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: ".achievementBoxs",
          start: "0% 40%",
          toggleActions: "play none none reverse"
        }
      });
      gsap.from(".workCard", {
        opacity: 0,
        x: 100,
        duration: 0.5,
        stagger: 0.2,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: ".workCards",
          start: "0% 40%",
          toggleActions: "play none none reverse"
        }
      });

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

      return () => {
        split.revert();
      };
    }, { scope: container }
  )

  const { skills, experiences } = data;

  return (
    <section className="py-12 lg:py-16 relative overflow-hidden" ref={container}>
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-8 achievementBoxs" ref={aboutContentRef}>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Professional Journey</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white heading">
                Experience & <span className="text-primary">Expertise</span>
              </h2>
              <p className="text-white/80 leading-relaxed mb-8" ref={aboutContentRefText}>
                Results-driven professional with 4+ years of experience. Mastered market trends, business processes, and content development that increases profitability and brand awareness.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium text-white/90 bg-white/10 backdrop-blur p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span>Available for Freelance & Career Change</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs uppercase tracking-widest text-white/60 mb-4">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: any) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="rounded-full px-3 py-1 font-normal border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20 transition-colors skillBadge"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xs uppercase tracking-widest text-white/60 mb-4">Education</h3>
                <div className="flex items-center gap-3 text-sm font-medium text-white/90 bg-white/10 backdrop-blur p-3 rounded-xl achievementBox">
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">MBA (Business Analytics)</p>
                    <p className="text-white/60 text-xs">Amity University</p>
                    <p className="text-white/60 text-xs">2020 - 2022</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-white/90 bg-white/10 backdrop-blur p-3 rounded-xl mt-3 achievementBox">
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">MA in Journalism</p>
                    <p className="text-white/60 text-xs">Adamas University</p>
                    <p className="text-white/60 text-xs">2018 - 2020</p>
                  </div>
                </div>
              </div>


              <div className="mt-6">
                <h3 className="text-xs uppercase tracking-widest text-white/60 mb-4">Recognition</h3>
                <div className="flex items-center gap-3 text-sm font-medium text-white/90 bg-white/10 backdrop-blur p-3 rounded-xl achievementBox">
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Employee of the Month</p>
                    <p className="text-white/60 text-xs">June 2022</p>
                  </div>
                </div>
                <div className="flex items-center mt-3 gap-3 text-sm font-medium text-white/90 bg-white/10 backdrop-blur p-3 rounded-xl achievementBox">
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>

                    <p className="font-bold text-white text-sm">Miss. Dependable</p>
                    <p className="text-white/60 text-xs">Write4U (2022)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-16 workCards">
            <div className="relative space-y-8">
              <h3 className="text-2xl font-semibold text-white border-b border-white/20 pb-4 mb-8">Career Timeline</h3>
              <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-linear-to-b from-primary via-accent to-secondary hidden md:block" />

              {experiences.map((exp: any, index: any) => (
                <div key={exp.title} className="relative workCard">
                  <div
                    className="absolute left-6 top-8 w-3 h-3 rounded-full border-4 border-background hidden md:block z-10"
                    style={{ backgroundColor: exp.color }}
                  />

                  <div className="md:ml-16">
                    <Card className="group border-none bg-white/10 backdrop-blur-md ring-1 ring-white/20 hover:ring-white/40 overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: exp.color }} />
                      <CardContent className="px-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white transition-colors mb-1">{exp.title}</h4>
                            <p className="text-base font-medium flex items-center gap-2" style={{ color: exp.color }}>
                              <TrendingUp className="w-4 h-4" />
                              {exp.company}
                            </p>
                          </div>
                          <span className="text-xs text-white/60 bg-white/10 px-3 py-1.5 rounded-full font-medium whitespace-nowrap">
                            {exp.period}
                          </span>
                        </div>

                        <p className="text-white/80 text-sm leading-relaxed mb-6">{exp.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((s: any) => (
                            <span
                              key={s}
                              className="text-xs px-3 py-1 rounded-full font-medium backdrop-blur"
                              style={{
                                backgroundColor: `${exp.color}/0.2`,
                                color: exp.color,
                                border: `1px solid ${exp.color}/0.3`,
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
