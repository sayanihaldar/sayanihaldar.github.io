"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Professional Realm", href: "/#professional" },
    { name: "About Me", href: "/about" }
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-lg border-b border-primary/10" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold tracking-tight text-primary gradient-text-creative">
          Sayani Haldar
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex space-x-8">
          <Link href="#Contact" className="text-sm uppercase tracking-widest font-medium bg-[#881337] hover:bg-[#70102d]  text-white px-8 py-4 rounded-sm shadow-xl shadow-rose-200 transition-all flex items-center">
            Contact Me
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-t p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
