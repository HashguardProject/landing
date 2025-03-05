import React from 'react';
import SectionTitle from './common/SectionTitle';

const Features: React.FC = () => {
  const features = [
    {
      icon: 'fa-lock',
      title: 'Chiffrement avancé',
      description: 'Double système de chiffrement avec clés personnelles et couche de protection iExec. Vos données restent totalement privées, même pour nous.',
      delay: 0
    },
    {
      icon: 'fa-share-alt',
      title: 'Partage sécurisé',
      description: 'Partagez vos fichiers en toute sécurité avec des contrôles granulaires sur les permissions et des liens à durée limitée, sans jamais compromettre vos données.',
      delay: 100
    },
    {
      icon: 'fa-wallet',
      title: 'Multi-wallets & CB',
      description: 'Connectez-vous facilement avec Metamask, Wallet Cometh ou simplement par carte bancaire. Aucune expertise crypto requise pour profiter de la technologie.',
      delay: 200
    },
    {
      icon: 'fa-store',
      title: 'Marché du stockage',
      description: 'Comparez et choisissez vos fournisseurs de stockage selon vos besoins spécifiques de sécurité, performance et coût, pour une expérience totalement personnalisée.',
      delay: 300
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <SectionTitle 
          eyebrow="Fonctionnalités clés"
          title="Sécurité avancée, simplicité d'utilisation"
          description="Une expérience utilisateur sans compromis sur la protection de vos données."
        />
        
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card card-3d fade-in-up ${feature.delay > 0 ? `delay-${feature.delay}` : '' }`}
            >
              <div className="feature-icon">
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href="#" className="learn-more">En savoir plus <i className="fas fa-arrow-right"></i></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;