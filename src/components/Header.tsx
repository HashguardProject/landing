import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation('header');

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
    <header 
      id="header" 
      className={`header ${scrolled ? 'scrolled' : ''} ${darkMode ? 'darkMode' : ''}`}
    >
      <div className="container">
        <nav className="nav">
          <a href="#" className="logo">
            <i className="fas fa-shield-alt"></i>
            Hashguard
          </a>
              <div className="nav-links">
            <a href="#how-it-works">{t('nav.howItWorks')}</a>
            <a href="#features">{t('nav.features')}</a>
            <a href="#pricing">{t('nav.pricing')}</a>
            <a href="#roadmap">{t('nav.roadmap')}</a>
          </div>
          <div className="auth-buttons">
            <a href="#" className={`btn btn-outline`}>
              {t('auth.login')}
            </a>
            <a href="#" className={`btn btn-primary`}>
              {t('auth.signup')} <i className="fas fa-arrow-right"></i>
            </a>
            {/* <button 
              className="theme-toggle" 
              id="theme-toggle" 
              onClick={toggleDarkMode}
              aria-label={t(darkMode ? 'theme.toggleLight' : 'theme.toggleDark')}
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button> */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;