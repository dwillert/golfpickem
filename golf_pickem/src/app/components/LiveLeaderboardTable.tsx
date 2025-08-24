import React from 'react';
import styles from './LiveLeaderboardTable.module.css';

type LeaderboardPlayer = {
  position: string;
  first_name: string;
  last_name: string;
  total_to_par: number;
  holes_played: string;
  chosenCount: number;
  rounds: { strokes: number }[];
};

type LiveLeaderboardTableProps = {
  leaderboard: LeaderboardPlayer[];
};

const LiveLeaderboardTable: React.FC<LiveLeaderboardTableProps> = ({ leaderboard }) => {
  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>Live Leaderboard</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Player</th>
            <th>Score</th>
            <th>Thru</th>
            <th>R1</th>
            <th>R2</th>
            <th>R3</th>
            <th>R4</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(leaderboard) ? leaderboard.map((player, index) => (
            <tr key={index}>
              <td>{player.position}</td>
              <td>{`${player.first_name} ${player.last_name}`}</td>
              <td>{player.total_to_par}</td>
              <td>{player.holes_played}</td>
              {player.rounds.map((round, roundIndex) => (
                <td key={roundIndex}>{round.strokes}</td>
              ))}
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
};

export default LiveLeaderboardTable;