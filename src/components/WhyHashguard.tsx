import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/components/WhyHashguard.module.css";
import SectionTitle from "./common/SectionTitle";

const WhyHashguard: React.FC = () => {
  const { t } = useTranslation("why");

  return (
    <section className={styles.whySection} id="why-hashguard">
      <div className={styles.container}>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className={styles.intro}>{t("intro")}</div>

        <div className={styles.profiles}>
          <div className={styles.profile}>
            <h3>{t("profiles.creators.title")}</h3>
            <p>{t("profiles.creators.description")}</p>
          </div>

          <div className={styles.profile}>
            <h3>{t("profiles.privacyCitizens.title")}</h3>
            <p>{t("profiles.privacyCitizens.description")}</p>
          </div>

          <div className={styles.profile}>
            <h3>{t("profiles.families.title")}</h3>
            <p>{t("profiles.families.description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHashguard;
