import { Nav, Footer } from '@/components/NavFooter';
import { FloatingLogo } from '@/components/FloatingLogo';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { About, Skills, Achievements, Contact } from '@/components/Sections';
import { Projects } from '@/components/Projects';
import { ContactForm } from '@/components/ContactForm';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem', position: 'relative' }}>
      <div className="grid-bg" aria-hidden>
        <div className="grid-bg__inner" />
        <div className="grid-bg__glow" />
      </div>

      <FloatingLogo />
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 2rem' }}>
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
