import React, { useEffect, useState } from 'react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header id="header" className={`${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <nav>
          <a href="#" className="logo">
            <i className="fas fa-shield-alt"></i>
            Hashguard
          </a>
          <div className="nav-links">
            <a href="#how-it-works">Comment ça marche</a>
            <a href="#features">Fonctionnalités</a>
            <a href="#pricing">Tarifs</a>
            <a href="#roadmap">Feuille de route</a>
          </div>
          <div className="auth-buttons">
            <a href="#" className="btn btn-outline">Connexion</a>
            <a href="#" className="btn btn-primary">S'inscrire <i className="fas fa-arrow-right"></i></a>
            <button className="theme-toggle" id="theme-toggle" onClick={toggleDarkMode}>
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;