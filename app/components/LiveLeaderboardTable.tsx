import React from 'react';
import styles from './LiveLeaderboardTable.module.css';

type LeaderboardPlayer = {
  position: string;
  name: string;
  score: number;
  thru: number;
  status: string;
  rounds: { strokes: number }[];
};

type LiveLeaderboardTableProps = {
  leaderboard: LeaderboardPlayer[];
};

const LiveLeaderboardTable: React.FC<LiveLeaderboardTableProps> = ({ leaderboard }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Live Leaderboard</h2>
      <div className={`${styles.tableContainer} p-0`}>
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
              <tr key={index} className={player.status === "CUT" ? styles.cutPlayer : ""}>
                <td>{player.position}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
                <td>{player.status === "CUT" ? "CUT" : player.thru}</td>
                {player.rounds.map((round, roundIndex) => (
                  <td key={roundIndex}>{round.strokes}</td>
                ))}
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LiveLeaderboardTable;