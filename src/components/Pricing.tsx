import React, { useState } from 'react';
import SectionTitle from './common/SectionTitle';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const pricingPlans = [
    {
      name: "Freemium",
      monthlyPrice: "0€",
      annualPrice: "0€",
      popular: false,
      features: [
        "2 Go de stockage",
        "Chiffrement de base",
        "Accès web",
        "Redondance avancée",
        "Partage sécurisé"
      ],
      featuresAvailable: [true, true, true, false, false],
      ctaText: "Commencer gratuitement",
      ctaLink: "#"
    },
    {
      name: "Standard",
      monthlyPrice: "6€",
      annualPrice: "4.8€",
      popular: true,
      features: [
        "100 Go de stockage",
        "Chiffrement avancé",
        "Redondance basique",
        "Partage sécurisé",
        "Support standard"
      ],
      featuresAvailable: [true, true, true, true, true],
      ctaText: "Souscrire maintenant",
      ctaLink: "#"
    },
    {
      name: "Premium",
      monthlyPrice: "15€",
      annualPrice: "12€",
      popular: false,
      features: [
        "1 To de stockage",
        "Chiffrement avancé",
        "Redondance multi-fournisseurs",
        "Partage avancé",
        "Support prioritaire"
      ],
      featuresAvailable: [true, true, true, true, true],
      ctaText: "Choisir Premium",
      ctaLink: "#"
    },
    {
      name: "Entreprise",
      monthlyPrice: "Sur mesure",
      annualPrice: "Sur mesure",
      popular: false,
      features: [
        "Stockage illimité",
        "Conformité RGPD garantie",
        "SLA personnalisés",
        "API dédiée",
        "Support 24/7"
      ],
      featuresAvailable: [true, true, true, true, true],
      ctaText: "Contactez-nous",
      ctaLink: "#"
    }
  ];

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <SectionTitle 
          eyebrow="Offres transparentes"
          title="Tarifs simples et flexibles"
          description="Des offres adaptées à tous les besoins, sans frais cachés."
        />
        
        <div className="price-switch fade-in-up">
          <span className={`switch-label ${!isAnnual ? 'active' : ''}`}>Mensuel</span>
          <label className="toggle">
            <input 
              type="checkbox" 
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className={`switch-label ${isAnnual ? 'active' : ''}`}>Annuel (-20%)</span>
        </div>
        
        <div className="pricing-cards">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.popular ? 'popular' : ''} fade-in-up ${index > 0 ? `delay-${index * 100}` : ''}`}
            >
              <h3>{plan.name}</h3>
              <div className="price">
                {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                {plan.name !== "Entreprise" && <span>/mois</span>}
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <i className={`fas ${plan.featuresAvailable[featureIndex] ? 'fa-check' : 'fa-times'}`}></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={plan.ctaLink} className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;