import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppButton from "./common/AppButton";
import { g } from "framer-motion/client";
import styles from "../styles/components/CTA.module.css";

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

const CTA: React.FC = () => {
  const { t } = useTranslation("cta");

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This would typically call an API to register for the newsletter
    alert("Thank you for subscribing to our newsletter!");
  };

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

  return (
    <section className="cta">
      <div className="cta-blob"></div>
      <div className="cta-blob-2"></div>
      <div className="container">
        <h2 className="fade-in-up">{t("title")}</h2>
        <p className="fade-in-up delay-100">{t("description")}</p>
        <AppButton action="app" variant="light" icon="arrow-right" iconAfter>
          {t("button")}
        </AppButton>

        {/* <div className="newsletter fade-in-up delay-300">
          <h3>{t('newsletter.title')}</h3>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" placeholder={t('newsletter.placeholder')} required />
            <button type="submit" className="btn btn-light">
              {t('newsletter.button')}
            </button>
          </form>
        </div> */}
        <div id="hubspotForm" className={styles.hubspotFormContainer}></div>
      </div>
    </section>
  );
};

export default CTA;
