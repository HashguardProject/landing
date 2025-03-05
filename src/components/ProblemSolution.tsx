import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';
import styles from '../styles/components/ProblemSolution.module.css';

interface ComparisonItem {
  title: string;
  description: string;
  details: string;
  impact: number;
}

interface SecurityFeature {
  feature: string;
  traditional: string;
  hashguard: string;
  importance: 'critical' | 'high' | 'medium';
}

interface Translations {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  comparison: {
    traditional: {
      title: string;
      items: ComparisonItem[];
    };
    hashguard: {
      title: string;
      items: ComparisonItem[];
    };
  };
  security: {
    eyebrow: string;
    title: string;
    description: string;
    features: SecurityFeature[];
    importance: {
      critical: string;
      high: string;
      medium: string;
    };
    score: {
      title: string;
      empty: string;
      low: string;
      medium: string;
      high: string;
    };
  };
}

const ProblemSolution: React.FC = () => {
  const [activeComparison, setActiveComparison] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { t } = useTranslation<'problem-solution', keyof Translations>('problem-solution');

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const calculateSecurityScore = () => {
    if (selectedFeatures.length === 0) return 0;
    const features = t('security.features', { returnObjects: true }) as SecurityFeature[];
    const score = selectedFeatures.reduce((acc, feature) => {
      const featureData = features.find(d => d.feature === feature);
      switch (featureData?.importance) {
        case 'critical': return acc + 30;
        case 'high': return acc + 20;
        case 'medium': return acc + 10;
        default: return acc;
      }
    }, 0);
    return Math.min(100, score);
  };

  const getScoreMessage = () => {
    if (selectedFeatures.length === 0) return t('security.score.empty');
    const score = calculateSecurityScore();
    if (score < 50) return t('security.score.low');
    if (score < 80) return t('security.score.medium');
    return t('security.score.high');
  };

  const traditionalItems = t('comparison.traditional.items', { returnObjects: true }) as ComparisonItem[];
  const hashguardItems = t('comparison.hashguard.items', { returnObjects: true }) as ComparisonItem[];
  const securityFeatures = t('security.features', { returnObjects: true }) as SecurityFeature[];

  return (
    <section className={styles.problemSolution} id="problem-solution">
      <div className={styles.container}>
        <div className={styles.titleSection}>
        <SectionTitle 
            eyebrow={t('section.eyebrow')}
            title={t('section.title')}
            description={t('section.description')}
          />
        </div>
        
        <div className={styles.comparison}>
          <motion.div 
            className={`${styles.comparisonCard} ${styles.traditional}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.cardTitle}>
              <i className="fas fa-cloud"></i> {t('comparison.traditional.title')}
            </h3>
            <ul>
              {traditionalItems.map((item, index) => (
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
                    <strong className={styles.itemTitle}>{item.title}</strong>
                    <p className={styles.itemDescription}>{item.description}</p>
                    <AnimatePresence>
                      {showTooltip === `trad-${index}` && (
                        <motion.div 
                          className={styles.tooltip}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                        >
                          {item.details}
                          <div className={styles.impactBar}>
                            <div 
                              className={`${styles.impactFill} ${styles.traditionalFill}`}
                              style={{ width: `${item.impact}%` }}
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
            <h3 className={styles.cardTitle}>
              <i className="fas fa-shield-alt"></i> {t('comparison.hashguard.title')}
            </h3>
            <ul>
              {hashguardItems.map((item, index) => (
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
                    <strong className={styles.itemTitle}>{item.title}</strong>
                    <p className={styles.itemDescription}>{item.description}</p>
                    <AnimatePresence>
                      {showTooltip === `hash-${index}` && (
                        <motion.div 
                          className={styles.tooltip}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                        >
                          {item.details}
                          <div className={styles.impactBar}>
                            <div 
                              className={`${styles.impactFill} ${styles.hashguardFill}`}
                              style={{ width: `${item.impact}%` }}
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
              eyebrow={t('security.eyebrow')}
              title={t('security.title')}
              description={t('security.description')}
            />
          </div>

          <div className={styles.featureCalculator}>
            <div className={styles.featureList}>
              {securityFeatures.map((row, index) => (
                <motion.div 
                  key={index}
                  className={`${styles.featureItem} ${selectedFeatures.includes(row.feature) ? styles.selected : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleFeatureToggle(row.feature)}
                >
                  <div className={styles.featureHeader}>
                    <h4 className={styles.featureTitle}>{row.feature}</h4>
                    <span className={`${styles.importanceBadge} ${styles[row.importance]}`}>
                      {t(`security.importance.${row.importance}`)}
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
              <h3 className={styles.scoreTitle}>{t('security.score.title')}</h3>
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
                {getScoreMessage()}
              </motion.p>
            </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;