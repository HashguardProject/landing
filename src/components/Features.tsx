import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionTitle from "./common/SectionTitle";
import styles from "../styles/components/Features.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
  url: string;
}

const Features: React.FC = () => {
  const { t } = useTranslation("features");
  const features = t("features", { returnObjects: true }) as Feature[];

  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <motion.div
          className={styles.featureGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.a
              key={index}
              href={feature.url}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              target="_blank"
            >
              <div className={styles.featureIcon}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              {/* <a href="#" className={styles.learnMore}>
                {t("learnMore")}
                <span className={styles.learnMoreIcon}>
                  <i className="fas fa-arrow-right"></i>
                </span>
              </a> */}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
