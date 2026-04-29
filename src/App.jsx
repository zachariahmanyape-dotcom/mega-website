import { useEffect } from 'react';
import MegaNav from './components/MegaNav';
import MegaHero from './components/MegaHero';
import MegaAbout from './components/MegaAbout';
import MegaVerticals from './components/MegaVerticals';
import MegaStats from './components/MegaStats';
import MegaPersonas from './components/MegaPersonas';
import MegaSubjects from './components/MegaSubjects';
import MegaVantage from './components/MegaVantage';
import MegaPricing from './components/MegaPricing';
import MegaFAQ from './components/MegaFAQ';
import MegaFooter from './components/MegaFooter';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function App() {
  useReveal();
  return (
    <>
      <MegaNav />
      <MegaHero />
      <div className="reveal"><MegaAbout /></div>
      <div className="reveal"><MegaVerticals /></div>
      <div className="reveal"><MegaStats /></div>
      <div className="reveal"><MegaPersonas /></div>
      <div className="reveal"><MegaSubjects /></div>
      <div className="reveal"><MegaVantage /></div>
      <div className="reveal"><MegaPricing /></div>
      <MegaFAQ />
      <MegaFooter />
    </>
  );
}
