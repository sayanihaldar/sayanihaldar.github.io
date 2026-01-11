"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(
      ".contact-left-content",
      {
        opacity: 0,
        x: -200,
        duration: 0.5,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: container.current,
          start: "0% 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    gsap.from(
      ".contact-right-content",
      {
        opacity: 0,
        x: 200,
        duration: 0.5,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: container.current,
          start: "0% 80%",
          toggleActions: "play none none reverse"
        }
      }
    )
  }, { scope: container })

  return (
    <footer id="Contact" className="bg-secondary/10 pt-12 lg:pt-16 pb-12 border-t border-border/50" ref={container}>
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12 lg:mb-24">
          <div className="text-center lg:text-left flex flex-col justify-center items-center lg:items-start contact-left-content">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Ready to elevate your brand's digital strategy? I’d love to discuss how we can work together to achieve your business goals. Please send me a brief overview of your project.
            </p>

            <div className="space-y-6 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground">Email me</p>
                  <p className="text-lg font-medium"><a href="mailto:sayani277@gmail.com">sayani277@gmail.com</a></p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full linkedin-bg flex items-center justify-center text-secondary-foreground transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" id="Layer_1" width="20" height="20" version="1.1" viewBox="0 0 382 382">
                    <path fill="#fff" d="M347.445 0H34.555C15.471 0 0 15.471 0 34.555v312.889C0 366.529 15.471 382 34.555 382h312.889C366.529 382 382 366.529 382 347.444V34.555C382 15.471 366.529 0 347.445 0M118.207 329.844c0 5.554-4.502 10.056-10.056 10.056H65.345c-5.554 0-10.056-4.502-10.056-10.056V150.403c0-5.554 4.502-10.056 10.056-10.056h42.806c5.554 0 10.056 4.502 10.056 10.056zM86.748 123.432c-22.459 0-40.666-18.207-40.666-40.666S64.289 42.1 86.748 42.1s40.666 18.207 40.666 40.666-18.206 40.666-40.666 40.666M341.91 330.654a9.247 9.247 0 0 1-9.246 9.246H286.73a9.247 9.247 0 0 1-9.246-9.246v-84.168c0-12.556 3.683-55.021-32.813-55.021-28.309 0-34.051 29.066-35.204 42.11v97.079a9.246 9.246 0 0 1-9.246 9.246h-44.426a9.247 9.247 0 0 1-9.246-9.246V149.593a9.247 9.247 0 0 1 9.246-9.246h44.426a9.247 9.247 0 0 1 9.246 9.246v15.655c10.497-15.753 26.097-27.912 59.312-27.912 73.552 0 73.131 68.716 73.131 106.472z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground">Professional</p>
                  <p className="text-lg font-medium"><a href="https://www.linkedin.com/in/sayani-haldar-01948219a/" target="_blank">https://www.linkedin.com/in/sayani-haldar-01948219a/</a></p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 instagram-gradient rounded-full flex items-center justify-center text-secondary-foreground transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground">My Instagram</p>
                  <p className="text-lg font-medium"><a href="https://www.instagram.com/sayani_haldar/" target="_blank">https://www.instagram.com/sayani_haldar/</a></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-primary/5 border border-primary/5 contact-right-content">
            <form action="https://send.pageclip.co/gwoFoEZnERkxfShya5KSNHDJGyPOOqyL" method="post" className="space-y-4 pageclip-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Name
                  </label>
                  <Input placeholder="Your Name" name="name" className="bg-accent/5" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                  <Input placeholder="hello@example.com" name="email" className="bg-accent/5" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                <Select name="subject">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hire Me">Hire Me</SelectItem>
                    <SelectItem value="Freelance Work">Freelance Work</SelectItem>
                    <SelectItem value="Any Suggestions/Report Bugs">Any Suggestions/Report Bugs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                <Textarea placeholder="How can I help you?" name="message" className="min-h-[150px] bg-accent/5" />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold">Send Message</Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-border gap-6">
          <p className="text-sm font-medium text-muted-foreground">
            © 2026 Sayani Haldar. Built for the girl who does it all.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <p className="hover:text-primary transition-colors">
              Kolkata, IN
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
