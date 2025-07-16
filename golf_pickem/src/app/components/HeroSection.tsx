import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <div className={styles.heroImage}>
      <div className={styles.heroText}>
        <h1 className={styles.title}>Golf Pick 'Em</h1>
      </div>
    </div>
  );
};

export default HeroSection;