import React from 'react';
import SectionTitle from './common/SectionTitle';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Créez votre espace",
      description: "Inscrivez-vous et configurez votre stockage en quelques clics. Aucune expertise technique requise pour bénéficier de la technologie décentralisée."
    },
    {
      number: 2,
      title: "Ajoutez vos fichiers",
      description: "Vos données sont automatiquement chiffrées et distribuées sur un réseau sécurisé et décentralisé, garantissant confidentialité et résilience."
    },
    {
      number: 3,
      title: "Accédez et partagez",
      description: "Récupérez vos fichiers en toute sécurité, à tout moment et depuis n'importe quel appareil, avec un contrôle total sur les accès et le partage."
    }
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <SectionTitle 
          eyebrow="Processus simplifié"
          title="Comment ça marche"
          description="Un stockage décentralisé aussi simple qu'un drive classique, sans les inconvénients."
        />
        
        <div className="steps">
          {steps.map((step, index) => (
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