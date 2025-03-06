import React from 'react';
import { useTranslation } from 'react-i18next';

const CTA: React.FC = () => {
  const { t } = useTranslation('cta');

  return (
    <section className="cta">
      <div className="cta-blob"></div>
      <div className="cta-blob-2"></div>
      <div className="container">
        <h2 className="fade-in-up">{t('title')}</h2>
        <p className="fade-in-up delay-100">{t('description')}</p>
        <a href="#" className="btn btn-light fade-in-up delay-200">
          {t('button')} <i className="fas fa-arrow-right"></i>
        </a>
        
        <div className="newsletter fade-in-up delay-300">
          <h3>{t('newsletter.title')}</h3>
          <form className="newsletter-form">
            <input type="email" placeholder={t('newsletter.placeholder')} />
            <button type="submit" className="btn btn-light">
              {t('newsletter.button')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;