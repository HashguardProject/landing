import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import ProductShowcase from './components/ProductShowcase';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Integrations from './components/Integrations';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Partners from './components/Partners';
import Roadmap from './components/Roadmap';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import AppUrlProvider from './context/AppUrlContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.style.setProperty('--light', '#0f172a');
      document.documentElement.style.setProperty('--dark', '#f8fafc');
      document.documentElement.style.setProperty('--gray', '#94a3b8');
      document.documentElement.style.setProperty('--gray-light', '#1e293b');
      document.body.style.backgroundColor = '#0f172a';
    } else {
      document.documentElement.style.setProperty('--light', '#f8fafc');
      document.documentElement.style.setProperty('--dark', '#0f172a');
      document.documentElement.style.setProperty('--gray', '#64748b');
      document.documentElement.style.setProperty('--gray-light', '#e2e8f0');
      document.body.style.backgroundColor = '#f8fafc';
    }
  };

  useEffect(() => {
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    function checkIfInView() {
      animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (elementPosition.top < windowHeight * 0.9) {
          element.classList.add('visible');
        }
      });
    }
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);
    
    // Initial check
    checkIfInView();
    
    return () => {
      window.removeEventListener('scroll', checkIfInView);
      window.removeEventListener('load', checkIfInView);
    };
  }, []);

  return (
    <AppUrlProvider>
      <Cursor />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <ProductShowcase />
      <Features />
      <Testimonials />
      {/* <Integrations /> */}
      <Pricing />
      <FAQ />
      <Partners />
      <Roadmap />
      <CTA />
      <Footer />
    </AppUrlProvider>
  );
}

export default App;