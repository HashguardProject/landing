import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/components/Press.module.css";
import { Link } from "react-router-dom";

interface PressLink {
  id: string;
  url: string;
  source: string;
  titleKey: string;
  descriptionKey: string;
  imageUrl?: string;
}

export function Press(): JSX.Element {
  const { t, i18n } = useTranslation(["press", "common"]);

  const toggleLanguage = (): void => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLanguage", newLang);
    }
  };

  const pressLinks: PressLink[] = [
    {
      id: "cryptoast-alyra",
      url: "https://cryptoast.fr/focus-3-startups-web3-francaises-anciens-etudients-alyra-ecole-blockchain/",
      source: "Cryptoast.fr",
      titleKey: "cryptoastTitle",
      descriptionKey: "cryptoastDesc",
      imageUrl: "/image/press/cryptoast.jpeg",
    },
    {
      id: "fil-hashguard",
      url: "https://fil.org/ecosystem-explorer/hashguard",
      source: "FIL.org Ecosystem Explorer",
      titleKey: "filOrgTitle",
      descriptionKey: "filOrgDesc",
      imageUrl: "/image/press/filecoin.png",
    },
    {
      id: "x-iexec-ownership",
      url: "https://x.com/iEx_ec/status/1885031589589209443",
      source: "X.com (iExec)",
      titleKey: "xIexecTitle",
      descriptionKey: "xIexecDesc",
      imageUrl: "/image/press/iexec.jpeg",
    },
    {
      id: "linkedin-iexec-ownership",
      url: "https://www.linkedin.com/posts/iex.ec_we-believe-true-ownership-starts-with-activity-7290798692066861057-KIt_?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACzb3CQBAJL3mnf3D6Slg_bLOBWj5JSG_vs",
      source: "LinkedIn (iExec)",
      titleKey: "linkedinIexecTitle",
      descriptionKey: "linkedinIexecDesc",
      imageUrl: "/image/press/iexec2.jpeg",
    },
  ];

  const handleLanguageKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (e.key === "Enter" || e.key === " ") {
      toggleLanguage();
    }
  };

  return (
    <section className={styles.pressSection}>
      <div className={styles.container}>
        <div className={styles.pressCardContainer}>
          <h1 className={styles.mainTitle}>{t("press:title")}</h1>

          <div className={styles.buttonRow}>
            <Link to="/" className={styles.navButton}>
              Home
            </Link>

            <div
              className={styles.navButton}
              onClick={toggleLanguage}
              onKeyPress={handleLanguageKeyPress}
              role="button"
              tabIndex={0}
              aria-label={`Switch to ${
                i18n.language === "fr" ? "English" : "French"
              }`}
            >
              {t("common:footer.language")}
            </div>
          </div>

          <div className={styles.pressGrid}>
            {pressLinks.map((link) => (
              <div key={link.id} className={styles.pressItemCard}>
                {link.imageUrl && (
                  <img
                    src={link.imageUrl}
                    alt={t(`press:${link.titleKey}`)}
                    className={styles.pressItemImage}
                  />
                )}
                <div className={styles.pressItemContent}>
                  <span className={styles.pressItemSource}>{link.source}</span>
                  <h3 className={styles.pressItemTitle}>
                    {t(`press:${link.titleKey}`)}
                  </h3>
                  <p className={styles.pressItemDesc}>
                    {t(`press:${link.descriptionKey}`)}
                  </p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.readMoreButton}
                  >
                    {t("press:readMore")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Press;
