import React from 'react';
// import styles from './PoolRankTable.module.css';

type Player = {
  rank: number;
  name: string;
  score: number;
  tiebreaker: string;
};

type PoolRankTableProps = {
  players: Player[];
  leaderboard: any[];
};

const PoolRankTable: React.FC<PoolRankTableProps> = ({ players, leaderboard }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
          <th>Tiebreaker</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          //  TODO use enriched data to calculate score
          <tr key={`${player.rank}-${index}`}>
            <td>{player.rank}</td>
            <td>{player.name}</td>
            <td>{player.score}</td>
            <td>{player.tiebreaker}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PoolRankTable;