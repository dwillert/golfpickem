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

type LeaderBoard = { //might have to fix
    first_name: string;
    last_name: string;
    total_to_par: number;
    rank: number;
    status: string;
    holes_played: number;
    rounds: { strokes: number }[];
}

type ScoresSearchProps = {
  players: Golfer[];
  leaderboard: LeaderBoard[]; // Add the leaderboard prop
};

const ScoresSearch: React.FC<ScoresSearchProps> = ({ players, leaderboard }) => {
  const [searchInput, setSearchInput] = useState('');



  const enrichedPlayers = players.map((player) => {
    const totalScore = player.golfers.reduce((golferSum, golfer) => {
      const leaderboardGolfer = leaderboard.find((lbGolfer) => `${lbGolfer.first_name} ${lbGolfer.last_name}` === golfer.name);
      const golferScore = leaderboardGolfer?.total_to_par || 0;
      return golferSum + golferScore;
    }, 0);

    return {
      ...player,
      score: totalScore, // Update the player's score based on the sum of golfer scores
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
          thru: holesPlayed,
        };
      }),
    };
  });

  // Sort players by score and assign rank
  const sortedPlayers = enrichedPlayers.sort((a, b) => a.score - b.score).map((player, index) => ({
    ...player,
    rank: index + 1, // Assign rank based on the sorted order
  }));
  const filteredPlayers = sortedPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className={styles.scoresSearch}>
      <div className={styles.searchRow}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Type to Search Card..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <ul className={styles.cards}>
        {filteredPlayers.map((player) => (
          <li key={player.id} className={styles.cardItem}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeader}>{player.name}</div>
              <div className={styles.cardHeader}>{sortedPlayers.find((sortedPlayer) => sortedPlayer.id === player.id)?.score}</div>
            </div>
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
                {sortedPlayers
                  .find((sortedPlayer) => sortedPlayer.id === player.id)
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