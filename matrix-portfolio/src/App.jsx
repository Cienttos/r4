import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

import MatrixBackground from './components/MatrixBackground';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function App() {
  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- Animations ---    
    const tl = gsap.timeline({ delay: 0.5 });

    tl.to("#hero-title", {
        duration: 2.5,
        text: {
            value: "JOHN ANDERSON",
            delimiter: " "
        },
        ease: "none",
    })
    .to("#hero-subtitle", {
        duration: 3,
        text: "// The One",
        ease: "none",
    }, "-=2");

    // Use a timeout to ensure DOM is ready for ScrollTrigger
    const animTimeout = setTimeout(() => {
        // Generic section entrance
        const sections = document.querySelectorAll('section:not(:first-child)');
        sections.forEach((section) => {
          gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        });

        // Section title animations
        const sectionTitles = document.querySelectorAll('h2');
        sectionTitles.forEach(title => {
            gsap.from(title, {
                opacity: 0,
                skewX: 15,
                y: 20,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                }
            });
        });

        // Card hover animations
        const cards = document.querySelectorAll('.project-card, .skill-card');
        cards.forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              scale: 1.03,
              borderColor: 'rgba(0, 255, 0, 0.7)',
              duration: 0.3, 
              ease: 'power2.out' 
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
              scale: 1,
              borderColor: 'rgba(0, 255, 0, 0.3)',
              duration: 0.3, 
              ease: 'power2.out' 
            });
          });
        });

        ScrollTrigger.refresh();
    }, 100);

    // Cleanup function
    return () => {
        clearTimeout(animTimeout);
        gsap.globalTimeline.clear();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  return (
    <>
      <MatrixBackground />
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;