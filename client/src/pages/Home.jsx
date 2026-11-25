import { HeroSection } from '../components/Home/HeroSection.jsx';
import { About } from '../components/Home/about.jsx';
import { Steps } from '../components/Home/step-step.jsx';
import { Help } from '../components/Home/help.jsx';
import '../styles/App.css';

export function Home() {
  return (
    <main className="home-page">
      <HeroSection />

      <About />

      <Steps />

      <Help />
      
    </main>
  );
}

