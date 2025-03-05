import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';

interface Partner {
  name: string;
  alt: string;
}

const Partners: React.FC = () => {
  const { t } = useTranslation('partners');

  const partnerImages = {
    "iExec": "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "Filecoin": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "Storj": "https://images.unsplash.com/photo-1563986768817-257bf91c5f9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "Sia": "https://images.unsplash.com/photo-1563986768935-18a6692c1a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  };

  const partners = t('partners', { returnObjects: true }) as Partner[];

  return (
    <section className="partners" id="partners">
      <div className="container">
        <SectionTitle 
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className={`partner-logo fade-in-up ${index > 0 ? `delay-${index * 100}` : ''}`}
            >
              <img 
                src={partnerImages[partner.name as keyof typeof partnerImages]} 
                alt={partner.alt} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;