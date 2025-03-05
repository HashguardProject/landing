import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './common/SectionTitle';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslation('faq');
  
  const faqItems = t('items', { returnObjects: true }) as FAQItem[];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="faq-container">
          {" "}
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-item fade-in-up ${
                index > 0 ? `delay-${index * 100}` : ""
              } ${activeIndex === index ? "active" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{item.question}</h3>
                <i className="fas fa-plus"></i>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;