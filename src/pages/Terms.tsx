"use client";

import { useTranslation } from "react-i18next";
import styles from "../styles/components/Terms.module.css";

export function Terms() {
  const { t, i18n } = useTranslation("terms");

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  const sections = [
    "legalInformation",
    "termsOfUse",
    "serviceDescription",
    "dataProtection",
    "intellectualProperty",
    "links",
    "externalLinks",
    "security",
    "applicableLaw",
    "contactInformation",
  ];

  return (
    <section className={styles.termsSection}>
      <div className={styles.container}>
        <div className={styles.termsCard}>
          <h1 className={styles.mainTitle}>{t("title")}</h1>

          <div className={styles.homeButtonContainer}>
            <a href="/" className={styles.homeButton}>
              Home
            </a>
          </div>
          <div
            className={styles.homeButtonContainer}
            onClick={toggleLanguage}
            aria-label={`Switch to ${
              i18n.language === "fr" ? "English" : "French"
            }`}
          >
            <div className={styles.homeButton}>
              {t("common:footer.language")}
            </div>
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.contentStack}>
              {sections.map((sectionKey) => (
                <div key={sectionKey} className={styles.contentSection}>
                  <h3 className={styles.sectionTitle}>
                    {t(`${sectionKey}.title`)}
                  </h3>
                  <p className={styles.sectionText}>
                    {t(`${sectionKey}.content`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terms;
