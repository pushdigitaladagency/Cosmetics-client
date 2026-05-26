"use client"
import { useState, useEffect } from "react";
import './Header.css';
export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
     const [scrolled, setScrolled] = useState(false);
     const [activeSection, setActiveSection] = useState("home");

     const sectionIds = ["home", "about", "products", "philosophy", "contact"];

    useEffect(() => {
        const observerOptions = {
          root: null,
          threshold: 0.15,
          rootMargin: "0px 0px -20% 0px",
        };
    
        const handleIntersect = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        };
    
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
        sectionIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) observer.observe(el);
        });
    
        // Fallback for reaching the bottom of the page (footer) and handle navbar background
        const handleScroll = () => {
          setScrolled(window.scrollY > 50);
          
          const scrollPosition = window.innerHeight + window.scrollY;
          const scrollHeight = document.documentElement.scrollHeight;
          if (scrollPosition >= scrollHeight - 50) {
            setActiveSection("contact");
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          observer.disconnect();
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

      const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      };


     const MenuIcon = ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  const CloseIcon = ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18L18 6M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
    return (
<nav className={`navbar ${isMenuOpen ? "active" : ""} ${scrolled ? "scrolled" : ""}`}>
        <img src="/images/Organic_logo.svg" alt="logo" className="logo" />
        
        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <CloseIcon color="#5f7f4c" /> : <MenuIcon color="#5f7f4c" />}
        </button>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); }} className={activeSection === "home" ? "nav-active" : ""}>Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }} className={activeSection === "about" ? "nav-active" : ""}>About</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); scrollTo("products"); }} className={activeSection === "products" ? "nav-active" : ""}>Products</a>
          <a href="#philosophy" onClick={(e) => { e.preventDefault(); scrollTo("philosophy"); }} className={activeSection === "philosophy" ? "nav-active" : ""}>Philosophy</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }} className={activeSection === "contact" ? "nav-active" : ""}>Contact</a>
          <button className="order-btn" onClick={() => setIsMenuOpen(false)}>
            Order Now
          </button>
        </div>
      </nav>
    )
}