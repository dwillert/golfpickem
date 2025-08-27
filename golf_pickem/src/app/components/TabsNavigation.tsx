import React from 'react';
import styles from './TabsNavigation.module.css';

type TabsNavigationProps = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const TabsNavigation: React.FC<TabsNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabsBar}>
      <button
        className={`${styles.tabButton} ${activeTab === 'scoreLeaderboard' ? styles.active : ''}`}
        onClick={() => setActiveTab('scoreLeaderboard')}
      >
        Pool Rank
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === 'scores' ? styles.active : ''}`}
        onClick={() => setActiveTab('scores')}
      >
        Scores
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === 'leaderboard' ? styles.active : ''}`}
        onClick={() => setActiveTab('leaderboard')}
      >
        Live LeaderBoard
      </button>
    </div>
  );
};

export default TabsNavigation;