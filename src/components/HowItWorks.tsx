import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';

interface Step {
  number: number;
  title: string;
  description: string;
}

const HowItWorks: React.FC = () => {
  const { t } = useTranslation('how-it-works');
  const steps = t('steps', { returnObjects: true }) as Step[];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <SectionTitle 
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        
        <div className="steps">
          {steps.map((step: Step, index: number) => (
            <div 
              key={index} 
              className={`step-card card-3d fade-in-up ${index > 0 ? `delay-${index * 200}` : ''}`}
            >
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;