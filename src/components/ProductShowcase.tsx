import React, { useState } from 'react';
import SectionTitle from './common/SectionTitle';

const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord' },
    { id: 'upload', label: 'Gestion des fichiers' },
    { id: 'sharing', label: 'Partage sécurisé' },
    { id: 'security', label: 'Paramètres de sécurité' }
  ];

  const screenDescriptions = {
    dashboard: {
      title: 'Tableau de bord intuitif',
      description: 'Visualisez et gérez l\'ensemble de vos fichiers et dossiers avec une interface simple et moderne. Surveillez votre espace de stockage et accédez rapidement à vos documents récents.'
    },
    upload: {
      title: 'Gestion des fichiers simplifiée',
      description: 'Ajoutez vos fichiers par simple glisser-déposer. Le chiffrement se fait automatiquement et vos données sont distribuées sur le réseau décentralisé en toute sécurité.'
    },
    sharing: {
      title: 'Partage sécurisé et flexible',
      description: 'Partagez vos fichiers avec des contrôles d\'accès précis, des liens à durée limitée et des options de protection par mot de passe pour une sécurité maximale.'
    },
    security: {
      title: 'Paramètres de sécurité avancés',
      description: 'Gérez vos clés de chiffrement, configurez l\'authentification à deux facteurs et surveillez l\'activité de votre compte depuis un tableau de bord centralisé.'
    }
  };

  return (
    <section className="product-showcase" id="product-showcase">
      <div className="container">
        <SectionTitle 
          eyebrow="Interface intuitive"
          title="Découvrez l'expérience Hashguard"
          description="Une interface puissante mais simple d'utilisation, conçue pour tous les utilisateurs."
        />
        
        <div className="showcase-wrapper fade-in-up delay-200">
          <div className="product-tabs">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                className={`product-tab ${activeTab === tab.id ? 'active' : ''}`} 
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="product-screens">
            {tabs.map(tab => (
              <img 
                key={tab.id}
                src={`https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`} 
                alt={tab.label} 
                className={`product-screen ${activeTab === tab.id ? 'active' : ''}`} 
                id={`${tab.id}-screen`}
              />
            ))}
            
            <div className="screen-description">
              <h3>{screenDescriptions[activeTab as keyof typeof screenDescriptions].title}</h3>
              <p>{screenDescriptions[activeTab as keyof typeof screenDescriptions].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;