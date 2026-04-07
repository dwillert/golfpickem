'use client'
import React, { useState } from 'react';
import styles from './ScoresSearch.module.css';

type Golfer = {
  id: string;
  name: string;
  score: number;
  tiebreaker: string;
  rank: number;
  golfers: { name: string; score: number; thru: string; status?: string }[];
};

type LeaderBoard = { //might have to fix
    name: string;
    score: number;
    rank: number;
    status: string;
    thru: number;
    rounds: { strokes: number }[];
}

type ScoresSearchProps = {
  players: Golfer[];
  leaderboard: LeaderBoard[];
  cutScore: number;
};

const ScoresSearch: React.FC<ScoresSearchProps> = ({ players, leaderboard, cutScore }) => {
  const [searchInput, setSearchInput] = useState('');

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
      golfers: player.golfers.map((golfer) => {
        const leaderboardGolfer = leaderboard.find((lbGolfer) => lbGolfer.name === golfer.name);
        const isCut = leaderboardGolfer?.status === 'CUT';
        let holesPlayed;

        if (leaderboardGolfer?.thru === 18 && leaderboardGolfer?.status === 'F') {
          holesPlayed = 'F';
        } else if (isCut) {
          holesPlayed = 'CUT';
        } else {
          holesPlayed = leaderboardGolfer?.thru?.toString() || '';
        }

        const originalGolferScore = leaderboardGolfer?.score || 0;
        const cutPenalty = isCut ? cutScore * 2 : 0;
        const adjustedGolferScore = originalGolferScore + cutPenalty;
        const golferScoreDisplay = isCut ? `${originalGolferScore} (+${cutPenalty})` : `${originalGolferScore}`;

        return {
          ...golfer,
          score: adjustedGolferScore,
          displayScore: golferScoreDisplay,
          thru: holesPlayed,
          status: leaderboardGolfer?.status,
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
              <div className={styles.cardHeader}>{player.score}</div>
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
                    <tr key={index} className={golfer.status === "CUT" ? styles.cutRow : ""}>
                      <td>{golfer.name}</td>
                      <td>{golfer.displayScore || golfer.score}</td>
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