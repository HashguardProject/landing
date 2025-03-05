import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from './common/SectionTitle';
import styles from '../styles/components/Pricing.module.css';

interface UsageEstimate {
  storage: number;
  users: number;
  redundancy: number;
  security: string;
}

interface CustomPlan {
  features: string[];
  estimatedPrice: number;
}

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [usageEstimate, setUsageEstimate] = useState<UsageEstimate>({
    storage: 100,
    users: 5,
    redundancy: 50,
    security: 'standard'
  });
  const [customPlan, setCustomPlan] = useState<CustomPlan>({
    features: [],
    estimatedPrice: 0
  });
  
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
      ctaLink: "#",
      popularLabel: "Le plus populaire"
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

  const comparisonFeatures = [
    {
      category: "Stockage",
      features: [
        {
          name: "Espace de stockage",
          freemium: "2 Go",
          standard: "100 Go",
          premium: "1 To",
          enterprise: "Illimité"
        },
        {
          name: "Taille max. par fichier",
          freemium: "100 Mo",
          standard: "2 Go",
          premium: "10 Go",
          enterprise: "Illimité"
        }
      ]
    },
    {
      category: "Sécurité",
      features: [
        {
          name: "Chiffrement",
          freemium: "AES-256",
          standard: "AES-256",
          premium: "Double chiffrement",
          enterprise: "Personnalisé"
        },
        {
          name: "Authentification",
          freemium: "Simple",
          standard: "2FA",
          premium: "2FA + SSO",
          enterprise: "Personnalisé"
        },
        {
          name: "Audit & Logs",
          freemium: "Basique",
          standard: "Avancé",
          premium: "Temps réel",
          enterprise: "Personnalisé"
        }
      ]
    },
    {
      category: "Redondance",
      features: [
        {
          name: "Copies des données",
          freemium: "2 copies",
          standard: "3 copies",
          premium: "5 copies",
          enterprise: "Personnalisé"
        },
        {
          name: "Distribution",
          freemium: "Mono-région",
          standard: "Multi-région",
          premium: "Multi-cloud",
          enterprise: "Sur mesure"
        }
      ]
    },
    {
      category: "Support",
      features: [
        {
          name: "Type de support",
          freemium: "Communauté",
          standard: "Email",
          premium: "Prioritaire",
          enterprise: "24/7 dédié"
        },
        {
          name: "Temps de réponse",
          freemium: "-",
          standard: "24h",
          premium: "4h",
          enterprise: "1h"
        }
      ]
    }
  ];

  const customFeatures = [
    {
      id: "storage",
      name: "Stockage personnalisé",
      icon: "fa-hdd",
      description: "Choisissez votre capacité de stockage"
    },
    {
      id: "encryption",
      name: "Chiffrement avancé",
      icon: "fa-lock",
      description: "Protection maximale de vos données"
    },
    {
      id: "redundancy",
      name: "Redondance multi-cloud",
      icon: "fa-cloud",
      description: "Réplication sur plusieurs fournisseurs"
    },
    {
      id: "api",
      name: "Accès API",
      icon: "fa-code",
      description: "Intégration avec vos systèmes"
    },
    {
      id: "support",
      name: "Support premium",
      icon: "fa-headset",
      description: "Assistance prioritaire 24/7"
    }
  ];

  const calculatePrice = () => {
    const basePrice = usageEstimate.storage * 0.06;
    const userPrice = usageEstimate.users * 3;
    const redundancyMultiplier = 
      usageEstimate.redundancy === 33 ? 1.3 :
      usageEstimate.redundancy === 66 ? 1.5 : 1;
    const securityMultiplier = usageEstimate.security === 'advanced' ? 1.2 : 1;
    
    return ((basePrice + userPrice) * redundancyMultiplier * securityMultiplier).toFixed(2);
  };

  const calculateROI = () => {
    const traditionalCosts = usageEstimate.storage * 0.08;
    const hashguardCosts = parseFloat(calculatePrice());
    const monthlySavings = traditionalCosts - hashguardCosts;
    const yearlySavings = monthlySavings * 12;
    
    return {
      monthly: monthlySavings.toFixed(2),
      yearly: yearlySavings.toFixed(2),
      percentage: ((monthlySavings / traditionalCosts) * 100).toFixed(1)
    };
  };

  const handleFeatureToggle = (featureId: string) => {
    setCustomPlan(prev => {
      const features = prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId];
      
      const basePrice = 6;
      const featurePrice = features.length * 3;
      
      return {
        features,
        estimatedPrice: basePrice + featurePrice
      };
    });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement chat submission
    console.log('Chat message:', chatMessage);
    setChatMessage('');
  };

  const matrixData = {
    plans: [
      {
        name: "Starter",
        price: "9.99€",
        description: "Pour démarrer en toute sécurité"
      },
      {
        name: "Standard",
        price: "19.99€",
        description: "La solution la plus populaire",
        popular: true
      },
      {
        name: "Enterprise",
        price: "49.99€",
        description: "Pour les besoins avancés"
      }
    ],
    categories: [
      {
        name: "Stockage",
        features: [
          {
            name: "Espace de stockage",
            values: ["100 Go", "500 Go", "Illimité"]
          },
          {
            name: "Taille max. par fichier",
            values: ["2 Go", "10 Go", "100 Go"]
          }
        ]
      },
      {
        name: "Sécurité",
        features: [
          {
            name: "Chiffrement de bout en bout",
            values: [true, true, true]
          },
          {
            name: "Double authentification",
            values: [true, true, true]
          },
          {
            name: "Clés de chiffrement personnalisées",
            values: [false, true, true]
          }
        ]
      },
      {
        name: "Redondance",
        features: [
          {
            name: "Réplication des données",
            values: ["2x", "3x", "4x"]
          },
          {
            name: "Choix des zones géographiques",
            values: [false, true, true]
          }
        ]
      },
      {
        name: "Support",
        features: [
          {
            name: "Support par email",
            values: [true, true, true]
          },
          {
            name: "Support prioritaire",
            values: [false, true, true]
          },
          {
            name: "Support téléphonique 24/7",
            values: [false, false, true]
          }
        ]
      }
    ]
  };

  return (
    <section className={styles.pricing} id="pricing">
      <div className={styles.container}>
        <SectionTitle 
          eyebrow="Offres transparentes"
          title="Tarifs simples et flexibles"
          description="Des offres adaptées à tous les besoins, sans frais cachés."
        />
        
        <div className={styles.priceSwitch}>
          <span className={`${styles.switchLabel} ${!isAnnual ? styles.active : ''}`}>Mensuel</span>
          <label className={styles.toggle}>
            <input 
              type="checkbox" 
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <span className={styles.toggleSlider}></span>
          </label>
          <span className={`${styles.switchLabel} ${isAnnual ? styles.active : ''}`}>Annuel (-20%)</span>
        </div>
        
        <motion.div 
          className={styles.pricingCards}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {pricingPlans.slice(0, 3).map((plan, index) => (
            <motion.div 
              key={index}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3>{plan.name}</h3>
              <div className="price">
                {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                <span>/mois</span>
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
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.enterpriseCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.enterpriseContent}>
            <h3>Solution Entreprise</h3>
            <p className={styles.enterpriseDescription}>
              Une solution sur mesure pour les entreprises avec des besoins spécifiques en matière de sécurité, conformité et performance.
            </p>
            <ul className={styles.enterpriseFeatures}>
              {pricingPlans[3].features.map((feature, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.enterpriseAction}>
            <div>
              <div className={styles.enterprisePrice}>Sur mesure</div>
              <p>Adapté à vos besoins</p>
            </div>
            <a href="#" className="btn btn-primary">
              Contactez notre équipe
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </motion.div>

        {/* <div className={styles.calculatorToggle}>
          <button 
            className={`btn btn-outline ${showCalculator ? 'active' : ''}`}
            onClick={() => setShowCalculator(!showCalculator)}
          >
            {showCalculator ? 'Masquer le calculateur' : 'Estimer vos besoins'}
          </button>
        </div> */}

        <AnimatePresence>
          {showCalculator && (
            <motion.div 
              className={styles.calculatorSection}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className={styles.sectionSubtitle}>Calculateur de coûts</h3>
              
              <div className={styles.calculatorGrid}>
                <div className={styles.calculatorForm}>
                  <div className={styles.formGroup}>
                    <label>Stockage nécessaire (Go)</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="1000"
                      value={usageEstimate.storage}
                      onChange={(e) => setUsageEstimate(prev => ({ ...prev, storage: parseInt(e.target.value) }))}
                      style={{ '--value': `${(usageEstimate.storage / 1000) * 100}%` } as any}
                    />
                    <div className={styles.valueDisplay}>
                      <span>1 Go</span>
                      <span>{usageEstimate.storage} Go</span>
                      <span>1000 Go</span>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Nombre d'utilisateurs</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="100"
                      value={usageEstimate.users}
                      onChange={(e) => setUsageEstimate(prev => ({ ...prev, users: parseInt(e.target.value) }))}
                      style={{ '--value': `${(usageEstimate.users / 100) * 100}%` } as any}
                    />
                    <div className={styles.valueDisplay}>
                      <span>1</span>
                      <span>{usageEstimate.users}</span>
                      <span>100</span>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Niveau de redondance</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="100"
                      value={usageEstimate.redundancy}
                      onChange={(e) => setUsageEstimate(prev => ({ ...prev, redundancy: parseInt(e.target.value) }))}
                      style={{ '--value': `${usageEstimate.redundancy}%` } as any}
                    />
                    <div className={styles.valueDisplay}>
                      <span>Standard</span>
                      <span>{usageEstimate.redundancy < 33 ? 'Standard (2 copies)' : 
                             usageEstimate.redundancy < 66 ? 'Avancé (3 copies)' : 
                             'Enterprise (5 copies)'}</span>
                      <span>Enterprise</span>
                    </div>
                    <div className={styles.inputDescription}>
                      La redondance détermine le nombre de copies de vos fichiers et leur distribution géographique
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Niveau de sécurité</label>
                    <select 
                      value={usageEstimate.security}
                      onChange={(e) => setUsageEstimate(prev => ({ ...prev, security: e.target.value }))}
                      className={styles.selectInput}
                    >
                      <option value="standard">Standard (Chiffrement AES-256)</option>
                      <option value="advanced">Avancé (Double chiffrement + Audit)</option>
                    </select>
                    <div className={styles.inputDescription}>
                      Le niveau de sécurité définit les mécanismes de protection de vos données
                    </div>
                  </div>
                </div>

                <div className={styles.calculatorResult}>
                  <div className={styles.resultHeader}>
                    <div className={styles.estimatedPrice}>{calculatePrice()}€ <span>/mois</span></div>
                    <div className={styles.savingsBadge}>
                      Économisez {calculateROI().percentage}%
                    </div>
                  </div>
                  
                  <div className={styles.resultDetails}>
                    <div className={styles.detailRow}>
                      <span>Économies mensuelles</span>
                      <strong>{calculateROI().monthly}€</strong>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Économies annuelles</span>
                      <strong>{calculateROI().yearly}€</strong>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Coût par Go</span>
                      <strong>0.06€</strong>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.calculatorToggle}>
          <button 
            className={`btn btn-outline ${showComparison ? 'active' : ''}`}
            onClick={() => setShowComparison(!showComparison)}
          >
            {showComparison ? 'Masquer les détails' : 'Comparer les offres en détail'}
          </button>
        </div>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={styles.comparisonMatrix}
            >
              <div className={styles.matrixTable}>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      {matrixData.plans.map((plan, index) => (
                        <th key={index}>
                          <div className={styles.priceBadge}>
                            <span className={styles.planName}>{plan.name}</span>
                            <span className={styles.planPrice}>{plan.price}</span>
                            <span className={styles.planDescription}>{plan.description}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrixData.categories.map((category, categoryIndex) => (
                      <React.Fragment key={categoryIndex}>
                        <tr>
                          <td colSpan={4} className={styles.categoryTitle}>
                            {category.name}
                          </td>
                        </tr>
                        {category.features.map((feature, featureIndex) => (
                          <tr key={`${categoryIndex}-${featureIndex}`}>
                            <td className={styles.featureName}>{feature.name}</td>
                            {feature.values.map((value, valueIndex) => (
                              <td key={valueIndex} className={styles.featureValue}>
                                {typeof value === 'boolean' ? (
                                  value ? (
                                    <div className={styles.checkIcon}>
                                      <i className="fas fa-check"></i>
                                    </div>
                                  ) : (
                                    <div className={styles.crossIcon}>
                                      <i className="fas fa-times"></i>
                                    </div>
                                  )
                                ) : (
                                  <div>{value}</div>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* <div className={styles.planBuilder}>
          <SectionTitle 
            eyebrow="Plan personnalisé"
            title="Construisez votre offre"
            description="Sélectionnez les fonctionnalités dont vous avez besoin pour créer votre plan sur mesure."
          />
          
          <div className={styles.featureSelector}>
            {customFeatures.map((feature) => (
              <div 
                key={feature.id}
                className={`${styles.featureOption} ${customPlan.features.includes(feature.id) ? styles.selected : ''}`}
                onClick={() => handleFeatureToggle(feature.id)}
              >
                <div className={styles.featureIcon}>
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <div>
                  <h4>{feature.name}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {customPlan.features.length > 0 && (
            <motion.div 
              className={styles.calculatorResult}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.resultHeader}>
                <div className={styles.estimatedPrice}>
                  {customPlan.estimatedPrice}€ <span>/mois</span>
                </div>
              </div>
              <button className="btn btn-primary">
                Valider mon plan personnalisé
              </button>
            </motion.div>
          )}
        </div> */}

        <div className={styles.salesChat}>
          <button 
            className={styles.chatButton}
            onClick={() => setShowChat(!showChat)}
          >
            <i className="fas fa-comments"></i>
          </button>

          <AnimatePresence>
            {showChat && (
              <motion.div
                className={styles.chatWindow}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
              >
                <div className={styles.chatHeader}>
                  <h3>Discutez avec notre équipe</h3>
                </div>
                <div className={styles.chatBody}>
                  {/* Chat messages will be displayed here */}
                </div>
                <form className={styles.chatInput} onSubmit={handleChatSubmit}>
                  <input
                    type="text"
                    placeholder="Votre message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <button type="submit">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Pricing;