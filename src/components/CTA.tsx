import React from 'react';
import { useTranslation } from 'react-i18next';
import AppButton from './common/AppButton';

const CTA: React.FC = () => {
  const { t } = useTranslation('cta');

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This would typically call an API to register for the newsletter
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <section className="cta">
      <div className="cta-blob"></div>
      <div className="cta-blob-2"></div>
      <div className="container">
        <h2 className="fade-in-up">{t('title')}</h2>
        <p className="fade-in-up delay-100">{t('description')}</p>
        <AppButton 
          action="signup" 
          variant="light"
          icon="arrow-right"
          iconAfter
        >
          {t('button')}
        </AppButton>
        
        <div className="newsletter fade-in-up delay-300">
          <h3>{t('newsletter.title')}</h3>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" placeholder={t('newsletter.placeholder')} required />
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