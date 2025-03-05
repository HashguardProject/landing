import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';

interface Tab {
  id: string;
  label: string;
  title: string;
  description: string;
}

const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { t } = useTranslation('product-showcase');

  const tabs = t('tabs', { returnObjects: true }) as unknown as Tab[];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

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
            {tabs.map(tab => (
              <img 
                key={tab.id}
                src={`https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`} 
                alt={tab.label} 
                className={`product-screen ${activeTab === tab.id ? 'active' : ''}`} 
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