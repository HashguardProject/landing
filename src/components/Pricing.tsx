import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./common/SectionTitle";
import styles from "../styles/components/Pricing.module.css";
import { useTranslation } from "react-i18next";

interface PricingPlan {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  popular: boolean;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popularLabel?: string;
  featuresAvailable: boolean[];
  icon: string;
  title: string;
  description: string;
}

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { t } = useTranslation("pricing");
  const pricingPlans = t("pricingPlans", {
    returnObjects: true,
  }) as PricingPlan[];

  return (
    <section className={styles.pricing} id="pricing">
      <div className={styles.container}>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className={styles.priceSwitch}>
          <span
            className={`${styles.switchLabel} ${
              !isAnnual ? styles.active : ""
            }`}
          >
            {t("Monthly")}
          </span>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <span className={styles.toggleSlider}></span>
          </label>
          <span
            className={`${styles.switchLabel} ${isAnnual ? styles.active : ""}`}
          >
            {t("Annual")}
          </span>
        </div>

        <motion.div
          className={styles.pricingCards}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {pricingPlans.slice(0, 4).map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
              data-popular-label={plan.popularLabel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3>{plan.name}</h3>
              <div className="price">
                {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                {isAnnual ? (
                  <span>/{t("year")}</span>
                ) : (
                  <span>/{t("month")}</span>
                )}
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <i
                      className={`fas ${
                        plan.featuresAvailable[featureIndex]
                          ? "fa-check"
                          : "fa-times"
                      }`}
                    ></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.ctaLink}
                target="_blank"
                className={`btn ${
                  plan.popular ? "btn-primary" : "btn-outline"
                }`}
              >
                {plan.ctaText}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div
          className={styles.enterpriseCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.enterpriseContent}>
            <h3>{pricingPlans[3].title}</h3>{" "}
            <p className={styles.enterpriseDescription}>
              {pricingPlans[3].description}
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
              <div className={styles.enterprisePrice}>
                {t("companyButtonTitle")}
              </div>
              <p>{t("companyButtonDescription")}</p>
            </div>
            <a
              href={pricingPlans[3].ctaLink}
              target="_blank"
              className="btn btn-primary"
            >
              {pricingPlans[3].ctaText}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Pricing;
