import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from './common/SectionTitle';
import styles from '../styles/components/ProblemSolution.module.css';

const ProblemSolution: React.FC = () => {
  const [activeComparison, setActiveComparison] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const comparisonData = [
    {
      traditional: {
        title: "Données exposées",
        description: "aux lois extraterritoriales",
        details: "Les données stockées sur des clouds traditionnels sont soumises aux lois du pays hébergeant les serveurs, pouvant compromettre leur confidentialité.",
        impact: 85
      },
      hashguard: {
        title: "Stockage 100% souverain",
        description: "sur des infrastructures européennes",
        details: "Vos données restent exclusivement sur des infrastructures européennes, garantissant leur conformité avec le RGPD.",
        impact: 100
      }
    },
    {
      traditional: {
        title: "Perte de contrôle",
        description: "sur l'accès à vos fichiers",
        details: "Les fournisseurs cloud traditionnels peuvent accéder à vos fichiers et sont soumis aux demandes gouvernementales.",
        impact: 70
      },
      hashguard: {
        title: "Propriété exclusive",
        description: "des clés de chiffrement",
        details: "Vous seul possédez les clés de chiffrement. Même Hashguard ne peut accéder à vos données.",
        impact: 100
      }
    },
    {
      traditional: {
        title: "Exploitation commerciale",
        description: "de vos données personnelles",
        details: "Les géants du cloud analysent souvent vos données pour des fins publicitaires ou commerciales.",
        impact: 90
      },
      hashguard: {
        title: "Aucune exploitation",
        description: "commerciale de vos informations",
        details: "Vos données sont strictement privées et ne sont jamais analysées ou utilisées à des fins commerciales.",
        impact: 100
      }
    },
    {
      traditional: {
        title: "Risque de censure",
        description: "et de surveillance",
        details: "Les services centralisés sont vulnérables à la censure et peuvent être contraints de surveiller les activités.",
        impact: 80
      },
      hashguard: {
        title: "Résistance à la censure",
        description: "grâce à la décentralisation",
        details: "La décentralisation rend impossible toute forme de censure ou de surveillance non autorisée.",
        impact: 100
      }
    },
    {
      traditional: {
        title: "Dépendance totale",
        description: "à un fournisseur unique",
        details: "Être lié à un seul fournisseur limite vos options et vous expose à des augmentations de prix.",
        impact: 75
      },
      hashguard: {
        title: "Interface intuitive",
        description: "sans expertise Web3 requise",
        details: "Profitez des avantages du Web3 avec une interface aussi simple qu'un cloud traditionnel.",
        impact: 95
      }
    }
  ];

  const matrixData = [
    {
      feature: "Propriété des données",
      traditional: "Le fournisseur a accès à vos données",
      hashguard: "Vous seul contrôlez l'accès à vos données",
      importance: "critical"
    },
    {
      feature: "Chiffrement",
      traditional: "Chiffrement au niveau du transport uniquement",
      hashguard: "Chiffrement de bout en bout avec clés privées",
      importance: "critical"
    },
    {
      feature: "Contrôle géographique",
      traditional: "Contrôle limité sur l'emplacement des données",
      hashguard: "Contrôle total avec infrastructure européenne",
      importance: "high"
    },
    {
      feature: "Exploitation des données",
      traditional: "Vos données peuvent être analysées à des fins commerciales",
      hashguard: "Aucune exploitation ni analyse de vos données",
      importance: "high"
    },
    {
      feature: "Résistance à la censure",
      traditional: "Vulnérable aux pressions gouvernementales",
      hashguard: "Architecture décentralisée résistante à la censure",
      importance: "medium"
    }
  ];

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const calculateSecurityScore = () => {
    if (selectedFeatures.length === 0) return 0;
    const score = selectedFeatures.reduce((acc, feature) => {
      const featureData = matrixData.find(d => d.feature === feature);
      switch (featureData?.importance) {
        case 'critical': return acc + 30;
        case 'high': return acc + 20;
        case 'medium': return acc + 10;
        default: return acc;
      }
    }, 0);
    return Math.min(100, score);
  };

  return (
    <section className={styles.problemSolution} id="problem-solution">
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <SectionTitle 
            eyebrow="Pourquoi choisir Hashguard"
            title="Reprenez le contrôle de vos données"
            description="Les solutions traditionnelles compromettent votre vie privée. Hashguard vous offre une alternative sans compromis."
          />
        </div>
        
        <div className={styles.comparison}>
          <motion.div 
            className={`${styles.comparisonCard} ${styles.traditional}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.cardTitle}><i className="fas fa-cloud"></i> Stockage traditionnel</h3>
            <ul>
              {comparisonData.map((item, index) => (
                <motion.li 
                  key={`trad-${index}`}
                  whileHover={{ x: 10 }}
                  onClick={() => setActiveComparison(index)}
                  onMouseEnter={() => setShowTooltip(`trad-${index}`)}
                  onMouseLeave={() => setShowTooltip(null)}
                  className={styles.comparisonItem}
                >
                  <i className="fas fa-times"></i> 
                  <div>
                    <strong className={styles.itemTitle}>{item.traditional.title}</strong>
                    <p className={styles.itemDescription}>{item.traditional.description}</p>
                    <AnimatePresence>
                      {showTooltip === `trad-${index}` && (
                        <motion.div 
                          className={styles.tooltip}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                        >
                          {item.traditional.details}
                          <div className={styles.impactBar}>
                            <div 
                              className={`${styles.impactFill} ${styles.traditionalFill}`}
                              style={{ width: `${item.traditional.impact}%` }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className={`${styles.comparisonCard} ${styles.hashguard}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.cardTitle}><i className="fas fa-shield-alt"></i> Hashguard</h3>
            <ul>
              {comparisonData.map((item, index) => (
                <motion.li 
                  key={`hash-${index}`}
                  whileHover={{ x: 10 }}
                  onClick={() => setActiveComparison(index)}
                  onMouseEnter={() => setShowTooltip(`hash-${index}`)}
                  onMouseLeave={() => setShowTooltip(null)}
                  className={styles.comparisonItem}
                >
                  <i className="fas fa-check"></i> 
                  <div>
                    <strong className={styles.itemTitle}>{item.hashguard.title}</strong>
                    <p className={styles.itemDescription}>{item.hashguard.description}</p>
                    <AnimatePresence>
                      {showTooltip === `hash-${index}` && (
                        <motion.div 
                          className={styles.tooltip}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                        >
                          {item.hashguard.details}
                          <div className={styles.impactBar}>
                            <div 
                              className={`${styles.impactFill} ${styles.hashguardFill}`}
                              style={{ width: `${item.hashguard.impact}%` }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className={styles.securityComparison}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.titleSection}>
            <SectionTitle 
              eyebrow="Tableau comparatif"
              title="Évaluez vos besoins en sécurité"
              description="Sélectionnez les fonctionnalités importantes pour vous et découvrez comment Hashguard répond à vos exigences."
            />
          </div>

          <div className={styles.featureCalculator}>
            <div className={styles.featureList}>
              {matrixData.map((row, index) => (
                <motion.div 
                  key={index}
                  className={`${styles.featureItem} ${selectedFeatures.includes(row.feature) ? styles.selected : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleFeatureToggle(row.feature)}
                >
                  <div className={styles.featureHeader}>
                    <h4 className={styles.featureTitle}>{row.feature}</h4>
                    <span className={`${styles.importanceBadge} ${styles[row.importance]}`}>
                      {row.importance === 'critical' ? 'Critique' : row.importance === 'high' ? 'Important' : 'Modéré'}
                    </span>
                  </div>
                  <div className={styles.featureComparison}>
                    <div className={styles.traditionalSide}>
                      <i className="fas fa-times"></i>
                      <p>{row.traditional}</p>
                    </div>
                    <div className={styles.hashguardSide}>
                      <i className="fas fa-check"></i>
                      <p>{row.hashguard}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.securityScore}>
              <h3 className={styles.scoreTitle}>Score de sécurité</h3>
              <div className={styles.scoreCircle}>
                <svg viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <circle
                    className={styles.background}
                    cx="50"
                    cy="50"
                    r="44"
                  />
                  <circle
                    className={styles.progress}
                    cx="50"
                    cy="50"
                    r="44"
                    strokeDasharray={`${calculateSecurityScore() * 2.77}, 277`}
                  />
                </svg>
                <motion.div 
                  className={styles.scoreValue}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  key={calculateSecurityScore()}
                >
                  {calculateSecurityScore()}%
                </motion.div>
              </div>
              <motion.p 
                className={styles.scoreMessage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                key={calculateSecurityScore()}
              >
                {selectedFeatures.length === 0 
                  ? "Sélectionnez des fonctionnalités pour voir votre score"
                  : calculateSecurityScore() < 50
                  ? "Votre sécurité pourrait être améliorée"
                  : calculateSecurityScore() < 80
                  ? "Bon niveau de sécurité"
                  : "Excellent niveau de sécurité"}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;