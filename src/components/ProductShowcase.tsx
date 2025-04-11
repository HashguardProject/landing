import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionTitle from "./common/SectionTitle";

interface Tab {
  id: string;
  image: string;
  label: string;
  title: string;
  description: string;
}

const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { t } = useTranslation("product-showcase");

  const tabs = t("tabs", { returnObjects: true }) as unknown as Tab[];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="product-showcase" id="product-showcase">
      <div className="container">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="showcase-wrapper fade-in-up delay-200">
          <div className="product-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`product-tab ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="product-screens">
            {tabs.map((tab) => (
              <img
                key={tab.id}
                src={tab.image}
                alt={tab.label}
                className={`product-screen ${
                  activeTab === tab.id ? "active" : ""
                }`}
                id={`${tab.id}-screen`}
              />
            ))}

            <div className="screen-description">
              <h3>{activeTabData?.title}</h3>
              <p>{activeTabData?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
