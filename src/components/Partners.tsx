import React from 'react';
import SectionTitle from './common/SectionTitle';

const Partners: React.FC = () => {
  const partners = [
    {
      name: "iExec",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Filecoin",
      imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Storj",
      imageUrl: "https://images.unsplash.com/photo-1563986768817-257bf91c5f9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Sia",
      imageUrl: "https://images.unsplash.com/photo-1563986768935-18a6692c1a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <section className="partners" id="partners">
      <div className="container">
        <SectionTitle 
          eyebrow="Écosystème robuste"
          title="Nos partenaires technologiques"
          description="Hashguard s'appuie sur des partenaires leaders du Web3 et de la cybersécurité."
        />
        
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className={`partner-logo fade-in-up ${index > 0 ? `delay-${index * 100}` : ''}`}
            >
              <img src={partner.imageUrl} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;