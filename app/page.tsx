'use client'
import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import TabsNavigation from "./components/TabsNavigation";
import PoolRankTable from "./components/PoolRankTable";
import ScoresSearch from "./components/ScoresSearch";
import LiveLeaderboardTable from "./components/LiveLeaderboardTable";

interface TournamentData {
  results: {
    tournament: Record<string, string | number | boolean>;
    leaderboard: Array<{ first_name: string; last_name: string; total_to_par: number; position: string; rank: number; status: string; holes_played: number; rounds: { strokes: number }[]; chosenCount: number }>;
  };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("scoreLeaderboard");
  const [tournamentData, setTournamentData] = useState<TournamentData | null>(null);
  const [picksData, setPicksData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/aws/retrieveGolfData");
        const data = await response.json();
        setTournamentData(data.tournamentData);
        setPicksData(data.picksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <HeroSection tournament={tournamentData?.results?.tournament || {}}/>
      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">
        {activeTab === "scoreLeaderboard" && <PoolRankTable players={picksData || []} leaderboard={tournamentData?.results?.leaderboard || []} />}
        {activeTab === "scores" && <ScoresSearch players={picksData || []} leaderboard={tournamentData?.results?.leaderboard || []} />}
        {activeTab === "leaderboard" && <LiveLeaderboardTable leaderboard={tournamentData?.results?.leaderboard || []} />}
      </div>
    </div>
  );
}
