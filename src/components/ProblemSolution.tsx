import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionTitle from "./common/SectionTitle";
import AppButton from "./common/AppButton";
import styles from "../styles/components/ProblemSolution.module.css";

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
  importance: "critical" | "high" | "medium";
  category: "security" | "compliance" | "resilience";
  weight: number;
  relatedFeatures?: string[];
}

interface FeatureCategory {
  name: "security" | "compliance" | "resilience";
  icon: string;
  color: string;
  threshold: number;
}

interface Celebration {
  message: string;
  icon: string;
  color: string;
}

const CATEGORIES: FeatureCategory[] = [
  {
    name: "security",
    icon: "shield-alt",
    color: "#6366f1",
    threshold: 80,
  },
  {
    name: "compliance",
    icon: "check-circle",
    color: "#10b981",
    threshold: 75,
  },
  {
    name: "resilience",
    icon: "layer-group",
    color: "#8b5cf6",
    threshold: 75,
  },
];

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

interface CategoryScores {
  security: number;
  compliance: number;
  performance: number;
  resilience: number;
}

const ProblemSolution: React.FC = () => {
  const [activeComparison, setActiveComparison] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [celebration, setCelebration] = useState<Celebration | null>(null);
  const [categoryScores, setCategoryScores] = useState<CategoryScores>({
    security: 0,
    compliance: 0,
    performance: 0,
    resilience: 0,
  });
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [hasShownGlobalRecommendation, setHasShownGlobalRecommendation] =
    useState(false);
  const [hasShownPerfectRecommendation, setHasShownPerfectRecommendation] =
    useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "security" | "compliance" | "performance" | "resilience"
  >("security");
  const carouselRef = useRef<HTMLDivElement>(null);
  const recommendationRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation<"problem-solution", keyof Translations>(
    "problem-solution"
  );

  useEffect(() => {
    // If recommendation is not shown, no need to add a listener
    if (!showRecommendation) return;

    // Define the handler that closes the dialog when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      // Make sure recommendationRef is defined and contains current
      if (!recommendationRef.current) return;

      // Check if the click is outside the recommendation content
      if (!recommendationRef.current.contains(event.target as Node)) {
        setShowRecommendation(false);
      }
    };

    // Add a slight delay to ensure proper DOM updates
    setTimeout(() => {
      // Add the event listener to the document
      document.addEventListener("mousedown", handleClickOutside);
    }, 10);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRecommendation]); // Only re-run if showRecommendation changes

  const calculateCategoryScore = (category: string, features: string[]) => {
    const categoryFeatures = t("security.features", {
      returnObjects: true,
    }) as SecurityFeature[];
    const featuresForCategory = categoryFeatures.filter(
      (f) => f.category === category
    );

    if (featuresForCategory.length === 0) return 0;

    const totalWeight = featuresForCategory.reduce(
      (acc, f) => acc + f.weight,
      0
    );
    const selectedWeight = featuresForCategory
      .filter((f) => features.includes(f.feature))
      .reduce((acc, f) => acc + f.weight, 0);

    return Math.round((selectedWeight / totalWeight) * 100);
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) => {
      const newSelection = prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature];

      // Reset celebration before checking for new ones
      setCelebration(null);

      // Calculate new scores immediately
      const newScores = CATEGORIES.reduce(
        (acc, cat) => ({
          ...acc,
          [cat.name]: calculateCategoryScore(cat.name, newSelection),
        }),
        {} as CategoryScores
      );

      setCategoryScores(newScores);

      // Trigger celebration check after state update with a slight delay
      setTimeout(() => checkForCelebrations(newSelection, newScores), 300);
      return newSelection;
    });
  };

  const checkForCelebrations = (features: string[], scores: CategoryScores) => {
    const allPerfect = CATEGORIES.every(
      (category) => scores[category.name] === 100
    );

    if (allPerfect && !hasShownPerfectRecommendation && !showRecommendation) {
      setCelebration({
        message: t("celebrations.perfect"),
        icon: "stars",
        color: "#6366f1",
      });
      setTimeout(() => {
        setCelebration(null);
        setShowRecommendation(true);
        setHasShownPerfectRecommendation(true);
      }, 1500);
      return;
    }

    const totalScore =
      Object.values(scores).reduce((a, b) => a + b, 0) / CATEGORIES.length;

    if (totalScore >= 90 && !showRecommendation && !allPerfect) {
      setCelebration({
        message: t("celebrations.perfect"),
        icon: "stars",
        color: "#6366f1",
      });
      setTimeout(() => {
        setCelebration(null);
      }, 1500);
      return;
    }

    for (const cat of CATEGORIES) {
      if (scores[cat.name] >= cat.threshold) {
        setCelebration({
          message: t(`celebrations.${cat.name}`),
          icon: cat.icon,
          color: cat.color,
        });
        setTimeout(() => setCelebration(null), 1500);
        break;
      }
    }
  };

  const calculateSecurityScore = () => {
    if (selectedFeatures.length === 0) return 0;
    const features = t("security.features", {
      returnObjects: true,
    }) as SecurityFeature[];
    const score = selectedFeatures.reduce((acc, feature) => {
      const featureData = features.find((d) => d.feature === feature);
      switch (featureData?.importance) {
        case "critical":
          return acc + 30;
        case "high":
          return acc + 20;
        case "medium":
          return acc + 10;
        default:
          return acc;
      }
    }, 0);

    const finalScore = Math.min(100, score);

    if (
      finalScore === 100 &&
      !showRecommendation &&
      !hasShownGlobalRecommendation
    ) {
      setTimeout(() => {
        setShowRecommendation(true);
        setHasShownGlobalRecommendation(true);
      }, 800);
    }

    return finalScore;
  };

  const getScoreMessage = () => {
    if (selectedFeatures.length === 0) return t("security.score.empty");
    const score = calculateSecurityScore();
    if (score < 50) return t("security.score.low");
    if (score < 80) return t("security.score.medium");
    return t("security.score.high");
  };

  const getRelatedFeatures = (feature: string) => {
    const features = t("security.features", {
      returnObjects: true,
    }) as SecurityFeature[];
    const currentFeature = features.find((f) => f.feature === feature);
    return currentFeature?.relatedFeatures || [];
  };

  const traditionalItems = t("comparison.traditional.items", {
    returnObjects: true,
  }) as ComparisonItem[];
  const hashguardItems = t("comparison.hashguard.items", {
    returnObjects: true,
  }) as ComparisonItem[];
  const securityFeatures = t("security.features", {
    returnObjects: true,
  }) as SecurityFeature[];

  const filteredFeatures = () => {
    const features = t("security.features", {
      returnObjects: true,
    }) as SecurityFeature[];
    return features.filter((feature) => feature.category === activeCategory);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const scrollAmount = 320; // Approximate card width + gap
    const currentScroll = carouselRef.current.scrollLeft;

    carouselRef.current.scrollTo({
      left:
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount,
      behavior: "smooth",
    });
  };

  const handleCloseRecommendation = () => {
    setShowRecommendation(false);
  };

  const areAllCategoriesPerfect = (): boolean => {
    return CATEGORIES.every(
      (category) => categoryScores[category.name] === 100
    );
  };

  return (
    <section className={styles.problemSolution} id="solution">
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <SectionTitle
            eyebrow={t("section.eyebrow")}
            title={t("section.title")}
            description={t("section.description")}
          />
        </div>

        <div className={styles.comparison}>
          <motion.div
            className={`${styles.comparisonCard} ${styles.hashguard}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.cardTitle}>
              <i className="fas fa-shield-alt"></i>{" "}
              {t("comparison.hashguard.title")}
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
          <motion.div
            className={`${styles.comparisonCard} ${styles.traditional}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.cardTitle}>
              <i className="fas fa-cloud"></i>{" "}
              {t("comparison.traditional.title")}
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
        </div>
      </div>

      {/* <div className={styles.securityComparison}>
          <SectionTitle
            eyebrow={t('security.eyebrow')}
            title={t('security.title')}
            description={t('security.description')}
          />
          
          <div className={styles.categoryTabs}>
            {CATEGORIES.map((category, index) => (
              <motion.button 
                key={category.name}
                className={`${styles.categoryTab} ${activeCategory === category.name ? styles.active : ''}`}
                onClick={() => setActiveCategory(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                style={{ 
                  color: activeCategory === category.name ? category.color : 'inherit'
                }}
              >
                <i className={`fas fa-${category.icon} ${styles.tabIcon}`}></i>
                <span>{t(`categories.${category.name}`) || category.name}</span>
              </motion.button>
            ))}
          </div>
          
          <div className={styles.featureCalculator}>
            <div className={styles.featureList} ref={carouselRef}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={styles.featureList}
                  ref={carouselRef}
                >
                  {filteredFeatures().map((row, index) => (
                    <motion.div 
                      key={`${activeCategory}-${row.feature}`}
                      className={`${styles.featureItem} ${selectedFeatures.includes(row.feature) ? styles.selected : ''}`}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                      onClick={() => handleFeatureToggle(row.feature)}
                    >
                      <div className={styles.featureHeader}>
                        <h4 className={styles.featureTitle}>{row.feature}</h4>
                        <div className={styles.featureBadges}>
                          <motion.span 
                            className={`${styles.importanceBadge} ${styles[row.importance]}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                          >
                            {t(`security.importance.${row.importance}`)}
                          </motion.span>
                        </div>
                      </div>
                      
                      <motion.div 
                        className={styles.featureComparison}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                      >
                        <div className={styles.traditionalSide}>
                          <i className="fas fa-times"></i>
                          <p>{row.traditional}</p>
                        </div>
                        <div className={styles.hashguardSide}>
                          <i className="fas fa-check"></i>
                          <p>{row.hashguard}</p>
                        </div>
                      </motion.div>
                      
                      {selectedFeatures.includes(row.feature) && row.relatedFeatures && row.relatedFeatures.length > 0 && (
                        <motion.div 
                          className={styles.relatedFeatures}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>{t('security.relatedFeatures')}:</span>
                          {row.relatedFeatures.map((related, idx) => (
                            <motion.span 
                              key={related}
                              className={styles.relatedFeature}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: idx * 0.05 }}
                              whileHover={{ y: -2 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!selectedFeatures.includes(related)) {
                                  handleFeatureToggle(related);
                                }
                              }}
                            >
                              {related}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className={styles.carouselControls}>
              <button 
                className={styles.carouselButton}
                onClick={() => scrollCarousel('left')}
                aria-label="Previous features"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                className={styles.carouselButton}
                onClick={() => scrollCarousel('right')}
                aria-label="Next features"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            
            <div className={styles.securityScore}>
              <h3 className={styles.scoreTitle}>{t('security.score.title')}</h3>
              <div className={styles.scoreCircle}>
                <svg viewBox="0 0 100 100" width="180" height="180">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <circle 
                    className={styles.background}
                    cx="50" 
                    cy="50" 
                    r="44" 
                    strokeWidth="10" 
                    stroke="rgba(0, 0, 0, 0.1)" 
                    fill="none" 
                  />
                  <motion.circle 
                    className={styles.progress}
                    cx="50" 
                    cy="50" 
                    r="44" 
                    strokeWidth="12" 
                    stroke="url(#scoreGradient)" 
                    fill="none" 
                    strokeLinecap="round"
                    strokeDasharray={`${calculateSecurityScore() * 2.76}, 276`}
                    strokeDashoffset="0"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: calculateSecurityScore() / 100 }}
                    transition={{ 
                      duration: 1.2, 
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: 0.2
                    }}
                  />
                </svg>
                <motion.div 
                  className={styles.scoreValue}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  {calculateSecurityScore()}%
                </motion.div>
              </div>
              <motion.p 
                className={styles.scoreMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {getScoreMessage()}
              </motion.p>
              
              <div className={styles.categoryScores}>
                {CATEGORIES.map((category, index) => (
                  <motion.div 
                    key={category.name}
                    className={styles.categoryScore}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.5, 
                      ease: [0.34, 1.56, 0.64, 1] 
                    }}
                  >
                    <i className={`fas fa-${category.icon}`} style={{ color: category.color }}></i>
                    <div className={styles.categoryProgress}>
                      <motion.div 
                        className={styles.categoryFill}
                        style={{ backgroundColor: category.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${categoryScores[category.name]}%` }}
                        transition={{ 
                          duration: 1, 
                          delay: 0.1 + index * 0.1,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                      />
                    </div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    >
                      {categoryScores[category.name]}%
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div> */}

      {/* <AnimatePresence>
          {celebration && (
            <motion.div 
              className={styles.celebration}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{ backgroundColor: celebration.color }}
            >
              <i className={`fas fa-${celebration.icon}`}></i>
              <span>{celebration.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showRecommendation && (
            <motion.div 
              className={styles.recommendation}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleCloseRecommendation}
            >
              <div 
                className={styles.recommendationContent}
                ref={recommendationRef}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className={styles.closeButton} 
                  onClick={handleCloseRecommendation}
                  aria-label="Close"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h4>{t('recommendation.title')}</h4>
                <p>{t('recommendation.description')}</p>
                <AppButton 
                  action="signup" 
                  className={styles.recommendationCta}
                  icon="arrow-right"
                  iconAfter
                >
                  {t('recommendation.cta')}
                </AppButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
    </section>
  );
};

export default ProblemSolution;
