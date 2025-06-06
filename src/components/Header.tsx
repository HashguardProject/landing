import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppButton from "./common/AppButton";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation("header");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  return (
    <header
      id="header"
      className={`header ${scrolled ? "scrolled" : ""} ${
        darkMode ? "darkMode" : ""
      }`}
    >
      <div className="container">
        <nav className="nav">
          <a className="logo">
            <i className="fas fa-shield-alt"></i>
            Hashguard
          </a>
          <div className="nav-links">
            <a href="#how-it-works">{t("nav.howItWorks")}</a>
            <a href="#features">{t("nav.features")}</a>
            <a href="#pricing">{t("nav.pricing")}</a>
            <a href="#roadmap">{t("nav.roadmap")}</a>
          </div>
          <div className="auth-buttons">
            <button
              className="language-switcher-header"
              onClick={toggleLanguage}
              aria-label={`Switch to ${
                i18n.language === "fr" ? "English" : "French"
              }`}
            >
              <i className="fas fa-globe"></i>
              {i18n.language === "fr" ? "FR" : "EN"}
            </button>
            <AppButton action="app" variant="outline">
              {t("auth.login")}
            </AppButton>
            {/* <AppButton 
              action="signup" 
              variant="primary"
              icon="arrow-right"
              iconAfter
            >
              {t('auth.signup')}
            </AppButton> */}
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
