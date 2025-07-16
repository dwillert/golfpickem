'use client'
import React, { useState } from 'react';
import styles from './ScoresSearch.module.css';

type Golfer = {
  id: string;
  name: string;
  score: number;
  tiebreaker: string;
  rank: number;
  golfers: { name: string; score: number; thru: string }[];
};

type ScoresSearchProps = {
  players: Golfer[];
  leaderboard: any[]; // Add the leaderboard prop
};

const ScoresSearch: React.FC<ScoresSearchProps> = ({ players, leaderboard }) => {
  const [searchInput, setSearchInput] = useState('');

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const enrichedPlayers = players.map((player) => ({
    ...player,
    golfers: player.golfers.map((golfer) => {
      const leaderboardGolfer = leaderboard.find((lbGolfer) => `${lbGolfer.first_name} ${lbGolfer.last_name}` === golfer.name);
      let holesPlayed;

      if (leaderboardGolfer?.holes_played === 0 && leaderboardGolfer.status === "complete") {
        holesPlayed = "F";
      } else if (leaderboardGolfer?.holes_played === 0 && leaderboardGolfer.status === "cut") {
        holesPlayed = "CUT";
      } else {
        holesPlayed = leaderboardGolfer?.holes_played;
      }

      return {
        ...golfer,
        score: leaderboardGolfer?.total_to_par,
        thru: holesPlayed, // Replace thru with holesPlayed
      };
    }),
  }));

  return (
    <div className={styles.scoresSearch}>
      <div className={styles.searchRow}>
        <i className="material-icons">search</i>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Type to Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <ul className={styles.cards}>
        {filteredPlayers.map((player) => (
          <li key={player.id} className={styles.cardItem}>
            <div className={styles.cardHeader}>{player.name}</div>
            <div className={styles.cardInfo}>
              <p>Tiebreaker: {player.tiebreaker}</p>
              <p>Current Place: {player.rank}</p>
            </div>
            <table className={styles.cardTable}>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Score</th>
                  <th>Thru</th>
                </tr>
              </thead>
              <tbody>
                {enrichedPlayers
                  .find((enrichedPlayer) => enrichedPlayer.id === player.id)
                  ?.golfers.map((golfer, index) => (
                    <tr key={index}>
                      <td>{golfer.name}</td>
                      <td>{golfer.score}</td>
                      <td>{golfer.thru}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoresSearch;