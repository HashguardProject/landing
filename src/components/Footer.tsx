import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/components/CTA.module.css";
import { g } from "framer-motion/client";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
        }) => void;
      };
    };
  }
}

globalThis as unknown as Window;

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation(["common", "footer"]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.charset = "utf-8";

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "143742081",
          formId: "4bcf8e41-ab2b-41d3-a6fb-5fe79157bbb6",
          region: "eu1",
          target: "#hubspotForm",
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This would typically call an API to register for the newsletter
    alert("Thank you for subscribing to our newsletter!");
  };

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

            <div className="social-links">
              <a
                href="https://linkedin.com/company/hashguard"
                target="_blank"
                aria-label={t("footer:social.linkedin")}
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://x.com/Hashguard_"
                target="_blank"
                aria-label={t("footer:social.twitter")}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://discord.gg/AYfZeMAP2A"
                target="_blank"
                aria-label={t("footer:social.discord")}
              >
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>

          {/* <div className="footer-links"></div> */}
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
              <li>
                <a href="/press">{t("footer:links.product.press")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <div id="hubspotForm" className={styles.hubspotFormContainer}></div>
          </div>

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
            <a href="/cookies">{t("common:footer.cookies")}</a>
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
