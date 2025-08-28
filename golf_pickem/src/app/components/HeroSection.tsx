import React from 'react';
import styles from './HeroSection.module.css';

type TournamentDataProps = {
  tournament: {
    name?: string;
    course?: string;
  };
};

const HeroSection: React.FC<TournamentDataProps> = ({ tournament }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroImage}>
        <img src="/golf.jpg" alt="Golf Header" className={styles.heroImg} />
        <div className={styles.heroText}>
          <h1 className={styles.title}>{`Golf Pick 'Em`}</h1>
        </div>
      </div>
      <div className={styles.tournamentInfo}>
        <h2 className={styles.tournamentName}>{tournament.name} at {tournament.course}</h2>
      </div>
    </div>
  );
};

export default HeroSection;