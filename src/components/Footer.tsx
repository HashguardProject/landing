import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import AppButton from "./common/AppButton";
import styles from "../styles/components/ProblemSolution.module.css";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation(["common", "footer"]);
  const { t: tHero } = useTranslation("hero");

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <i className="fas fa-shield-alt"></i>
              Hashguard
            </div>
            <p className="footer-description">{t("footer:description")}</p>
            <div className={styles.titleSection}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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

            <div className="social-links">
              <a
                href="https://linkedin.com/company/hashguard"
                target="_blank"
                aria-label={t("footer:social.linkedin")}
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://twitter.com/hashguard"
                target="_blank"
                aria-label={t("footer:social.twitter")}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://discord.gg/hashguard"
                target="_blank"
                aria-label={t("footer:social.discord")}
              >
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>

          <div className="footer-links"></div>
          <div className="footer-links">
            <h4>{t("footer:links.product.title")}</h4>
            <ul>
              <li>
                <a href="#features">{t("footer:links.product.features")}</a>
              </li>
              <li>
                <a href="#pricing">{t("footer:links.product.pricing")}</a>
              </li>
              <li>
                <a href="#roadmap">{t("footer:links.product.roadmap")}</a>
              </li>
              {/* <li>
                <a href="#">{t("footer:links.product.api")}</a>
              </li>
              <li>
                <a href="#">{t("footer:links.product.downloads")}</a>
              </li> */}
            </ul>
          </div>
          <div className="footer-links"></div>

          {/* <div className="footer-links">
            <h4>{t("footer:links.resources.title")}</h4>
            <ul>
              <li>
                <a href="#">{t("footer:links.resources.helpCenter")}</a>
              </li>
              <li>
                <a href="#">{t("footer:links.resources.documentation")}</a>
              </li>
              <li>
                <a href="#">{t("footer:links.resources.blog")}</a>
              </li>
              <li>
                <a href="#">{t("footer:links.resources.community")}</a>
              </li>
              <li>
                <a href="#">{t("footer:links.resources.tutorials")}</a>
              </li>
            </ul>
          </div> */}

          {/* <div className="footer-links">
            <h4>{t("footer:links.company.title")}</h4>
            <ul>
              <li>
                <a href="#">{t("footer:links.company.about")}</a>
              </li>
              <li>
                <a href="#">{t("footer:links.company.contact")}</a>
              </li>
              <li>
                <a href="#">{t("footer:links.company.careers")}</a>
              </li>
              <li>
                <a href="#">{t("footer:links.company.partners")}</a>
              </li>
              <li>
                <a href="#">{t("footer:links.company.press")}</a>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="footer-bottom">
          <p>{t("common:footer.rights")}</p>
          <div className="footer-links-secondary">
            {/* <a href="#">{t("common:footer.legal")}</a>
            <a href="#">{t("common:footer.privacy")}</a> */}
            <a href="/terms">{t("common:footer.terms")}</a>
            {/* <a href="#">{t("common:footer.cookies")}</a> */}
          </div>
          <button
            className="language-selector"
            onClick={toggleLanguage}
            aria-label={`Switch to ${
              i18n.language === "fr" ? "English" : "French"
            }`}
          >
            <i className="fas fa-globe"></i>
            {t("common:footer.language")}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
