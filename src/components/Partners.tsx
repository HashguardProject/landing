import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionTitle from "./common/SectionTitle";
import "./styles/Partners.css";

interface Partner {
  name: string;
  alt: string;
  url: string;
  imageLight: string;
  imageDark: string;
}

const Partners: React.FC = () => {
  const { t } = useTranslation("partners");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const partners = t("partners", { returnObjects: true }) as Partner[];
  const duplicatedPartners = [...partners, ...partners, ...partners];

  useEffect(() => {
    const imageUrls = partners.map((partner) =>
      isDarkMode ? partner.imageDark : partner.imageLight
    );

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }

    imageUrls.forEach((url) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = url;
    });
  }, [partners, isDarkMode]);

  return (
    <section className="partners-section" id="partners">
      <div className="container">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="partners-carousel-container">
          <div className={`partners-carousel ${imagesLoaded ? "animate" : ""}`}>
            {duplicatedPartners.map((partner, index) => {
              const imageUrl = isDarkMode
                ? partner.imageDark
                : partner.imageLight;

              return (
                <div key={`${partner.name}-${index}`} className="partner-logo">
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={imageUrl}
                      alt={partner.alt}
                      className="partner-image"
                      loading="lazy"
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
