import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const { t } = useTranslation('features');
  const features = t('features', { returnObjects: true }) as Feature[];

  return (
    <section className="features" id="features">
      <div className="container">
        <SectionTitle 
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card card-3d fade-in-up ${index > 0 ? `delay-${index * 100}` : ''}`}
            >
              <div className="feature-icon">
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href="#" className="learn-more">
                {t('learnMore')} <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;