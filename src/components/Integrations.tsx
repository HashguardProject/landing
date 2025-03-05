import React from 'react';
import SectionTitle from './common/SectionTitle';

const Integrations: React.FC = () => {
  const integrations = [
    {
      name: "Microsoft Office",
      description: "Éditez et collaborez sur des documents Office directement depuis Hashguard, avec synchronisation automatique et sécurisée.",
      imageUrl: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
    },
    {
      name: "Google Workspace",
      description: "Importez et sécurisez vos documents Google avec notre plugin d'intégration, tout en gardant la collaboration facile.",
      imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1227&q=80"
    },
    {
      name: "Slack",
      description: "Partagez des fichiers sécurisés directement dans vos conversations Slack sans compromettre la protection des données.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "API Ouverte",
      description: "Intégrez Hashguard à n'importe quelle application grâce à notre API REST complète et notre documentation détaillée.",
      imageUrl: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <section className="integrations" id="integrations">
      <div className="container">
        <SectionTitle 
          eyebrow="Intégrations"
          title="Compatible avec vos outils favoris"
          description="Hashguard s'intègre facilement à votre écosystème numérique existant."
        />
        
        <div className="integration-grid fade-in-up delay-200">
          {integrations.map((integration, index) => (
            <div key={index} className="integration-card">
              <div className="integration-logo">
                <img src={integration.imageUrl} alt={integration.name} />
              </div>
              <div className="integration-body">
                <h3>{integration.name}</h3>
                <p>{integration.description}</p>
                <a href="#" className="btn btn-outline">En savoir plus</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;