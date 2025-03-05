import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';

interface Integration {
  name: string;
  description: string;
  imageUrl: string;
}

const Integrations: React.FC = () => {
  const { t } = useTranslation('integrations');

  const integrationImages = {
    "Microsoft Office": "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    "Google Workspace": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1227&q=80",
    "Slack": "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "API Ouverte": "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  };

  const integrations = t('items', { returnObjects: true }) as Integration[];

  return (
    <section className="integrations" id="integrations">
      <div className="container">
        <SectionTitle 
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        
        <div className="integration-grid fade-in-up delay-200">
          {integrations.map((integration, index) => (
            <div key={index} className="integration-card">
              <div className="integration-logo">
                <img 
                  src={integrationImages[integration.name as keyof typeof integrationImages]} 
                  alt={integration.name} 
                />
              </div>
              <div className="integration-body">
                <h3>{integration.name}</h3>
                <p>{integration.description}</p>
                <a href="#" className="btn btn-outline">{t('learnMore')}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;