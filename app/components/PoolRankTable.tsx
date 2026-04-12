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
  name: string;
  score: number;
  rank: number;
  status: string;
  thru: number;
  rounds: { strokes: number }[];
}

type PoolRankTableProps = {
  players: Player[];
  leaderboard: LeaderBoard[];
  cutScore: number;
};

const PoolRankTable: React.FC<PoolRankTableProps> = ({ players, leaderboard, cutScore }) => {
  
  const enrichedPlayers = players.map((player) => {
    const originalScore = player.golfers.reduce((golferSum, golfer) => {
      const leaderboardGolfer = leaderboard.find((lbGolfer) => lbGolfer.name === golfer.name);
      return golferSum + (leaderboardGolfer?.score || 0);
    }, 0);

    const cutPenaltyTotal = player.golfers.reduce((penaltySum, golfer) => {
      const leaderboardGolfer = leaderboard.find((lbGolfer) => lbGolfer.name === golfer.name);
      return penaltySum + (leaderboardGolfer?.status === 'CUT' ? cutScore * 2 : 0);
    }, 0);

    const totalScore = originalScore + cutPenaltyTotal;

    return {
      ...player,
      score: totalScore,
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