import Header from '@/components/Header';
import About from '@/components/About';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Showcase from '@/components/Showcase';
import Training from '@/components/Training';
import IntroAnimation from '@/components/IntroAnimation';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section id="home">
          <IntroAnimation />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="showcase">
          <Showcase />
        </section>
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Achievements />
        <Training />
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
}
