import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/components/LanguageSwitcher.module.css';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className={styles.languageSwitcher}
      aria-label={`Switch to ${i18n.language === 'fr' ? 'English' : 'French'}`}
    >
      {i18n.language === 'fr' ? 'EN' : 'FR'}
    </button>
  );
};

export default LanguageSwitcher; 