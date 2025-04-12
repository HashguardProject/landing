import React from "react";
import { useTranslation } from "react-i18next";
import SectionTitle from "./common/SectionTitle";
import { motion } from "framer-motion";
import AppButton from "./common/AppButton";
import styles from "../styles/components/ProblemSolution.module.css";

interface Step {
  number: number;
  title: string;
  description: string;
}

const HowItWorks: React.FC = () => {
  const { t } = useTranslation("how-it-works");
  const { t: tHero } = useTranslation("hero");
  const steps = t("steps", { returnObjects: true }) as Step[];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="steps">
          {steps.map((step: Step, index: number) => (
            <div
              key={index}
              className={`step-card card-3d fade-in-up ${
                index > 0 ? `delay-${index * 200}` : ""
              }`}
            >
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.titleSection} style={{ marginTop: "3rem" }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AppButton
              action="app"
              variant="primary"
              icon="arrow-right"
              iconAfter
            >
              {tHero("buttons.explore")}
            </AppButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
