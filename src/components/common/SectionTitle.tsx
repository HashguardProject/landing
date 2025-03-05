import React from 'react';
import styles from '../../styles/components/SectionTitle.module.css';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ eyebrow, title, description }) => {
  return (
    <div className={styles.sectionTitle}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default SectionTitle;