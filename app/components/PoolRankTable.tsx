import React from 'react';
import styles from './PoolRankTable.module.css';

type Player = {
  rank: number;
  name: string;
  score: number;
  tiebreaker: string;
  golfers: { name: string; score: number; thru: string }[];
  };

type LeaderBoard = {
  first_name: string;
  last_name: string;
  total_to_par: number;
  rank: number;
  status: string;
  holes_played: number;
  rounds: { strokes: number }[];
}

type PoolRankTableProps = {
  players: Player[];
  leaderboard: LeaderBoard[];
};

const PoolRankTable: React.FC<PoolRankTableProps> = ({ players, leaderboard }) => {
  
  const enrichedPlayers = players.map((player) => {
    const totalScore = player.golfers.reduce((golferSum, golfer) => {
      const leaderboardGolfer = leaderboard.find((lbGolfer) => `${lbGolfer.first_name} ${lbGolfer.last_name}` === golfer.name);
      const golferScore = leaderboardGolfer?.total_to_par || 0;
      return golferSum + golferScore;
    }, 0);

    return {
      ...player,
      score: totalScore, // Assign totalScore to player.score
    };
  });

  const sortedPlayers = enrichedPlayers.sort((a, b) => a.score - b.score).map((player, index) => ({
    ...player,
    rank: index + 1, // Assign rank based on the sorted order
  }));

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>Player Rankings</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
            <th>Tiebreaker</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={`${player.rank}-${index}`}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
              <td>{player.tiebreaker}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PoolRankTable;