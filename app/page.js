'use client';

import useAnimations from '@/lib/animations';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WorkThatWon from '@/components/WorkThatWon';
import Awards from '@/components/Awards';
import Highlights from '@/components/Highlights';
import Experience from '@/components/Experience';
import Clients from '@/components/Clients';
import CaseStudies from '@/components/CaseStudies';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';
import Education from '@/components/Education';
import AtAGlance from '@/components/AtAGlance';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/* ============================================================
   PAGE COMPOSITION
   Section order is locked by REDESIGN-BRIEF.md. Do not reorder.
   ============================================================ */
export default function Home() {
  useAnimations();

  return (
    <>
      <Navbar />
      {/* Every section sat outside a main landmark, so screen-reader
          "skip to content" and landmark navigation had nothing to target. */}
      <main id="main">
        <Hero />
        <About />
        <WorkThatWon />
        <Awards />
        <Highlights />
        <Experience />
        <Clients />
        <CaseStudies />
        <Skills />
        <Testimonials />
        <Education />
        <AtAGlance />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
