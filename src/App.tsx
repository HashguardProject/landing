import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import AppUrlProvider from "./context/AppUrlContext";
import Hero from "./components/Hero";
import ProblemSolution from "./components/ProblemSolution";
import HowItWorks from "./components/HowItWorks";
import ProductShowcase from "./components/ProductShowcase";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Partners from "./components/Partners";
import Roadmap from "./components/Roadmap";
import CTA from "./components/CTA";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Politics from "./pages/Politics";
import Press from "./pages/Press";

function HomePageContent() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const animatedElements = document.querySelectorAll(
      ".fade-in-up, .fade-in-left, .fade-in-right"
    );

    function checkIfInView() {
      animatedElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (elementPosition.top < windowHeight * 0.9) {
          element.classList.add("visible");
        }
      });
    }

    window.addEventListener("scroll", checkIfInView);
    window.addEventListener("load", checkIfInView);

    checkIfInView();

    return () => {
      window.removeEventListener("scroll", checkIfInView);
      window.removeEventListener("load", checkIfInView);
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.style.setProperty("--light", "#0f172a");
      document.documentElement.style.setProperty("--dark", "#f8fafc");
      document.documentElement.style.setProperty("--gray", "#94a3b8");
      document.documentElement.style.setProperty("--gray-light", "#1e293b");
      document.body.style.backgroundColor = "#0f172a";
    } else {
      document.documentElement.style.setProperty("--light", "#f8fafc");
      document.documentElement.style.setProperty("--dark", "#0f172a");
      document.documentElement.style.setProperty("--gray", "#64748b");
      document.documentElement.style.setProperty("--gray-light", "#e2e8f0");
      document.body.style.backgroundColor = "#f8fafc";
    }
  };

  return (
    <>
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
    </>
  );
}

function App() {
  return (
    <AppUrlProvider>
      {" "}
      <Cursor />
      <main>
        {" "}
        <Routes>
          <Route path="/" element={<HomePageContent />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/politics" element={<Politics />} />
          <Route path="/press" element={<Press />} />
        </Routes>
      </main>
    </AppUrlProvider>
  );
}

export default App;
