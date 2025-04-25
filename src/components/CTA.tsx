import React from "react";
import { useTranslation } from "react-i18next";
import AppButton from "./common/AppButton";
import { motion } from "framer-motion";
import stylesProblemSolution from "../styles/components/ProblemSolution.module.css";

const CTA: React.FC = () => {
  const { t } = useTranslation("cta");
  const { t: tHero } = useTranslation("hero");

  return (
    <section className="cta">
      <div className="cta-blob"></div>
      <div className="cta-blob-2"></div>
      <div className="container">
        <h2 className="fade-in-up">{t("title")}</h2>
        <p className="fade-in-up delay-100">{t("description")}</p>

        <div className={stylesProblemSolution.titleSection}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AppButton
              action="app"
              variant="primary"
              icon="arrow-right"
              iconAfter
            >
              {tHero("buttons.join")}
            </AppButton>
          </motion.div>
        </div>

        {/* <div className="newsletter fade-in-up delay-300">
          <h3>{t('newsletter.title')}</h3>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" placeholder={t('newsletter.placeholder')} required />
            <button type="submit" className="btn btn-light">
              {t('newsletter.button')}
            </button>
          </form>
        </div> */}
      </div>
    </section>
  );
};

export default CTA;
