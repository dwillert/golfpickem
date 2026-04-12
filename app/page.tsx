'use client'
import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import TabsNavigation from "./components/TabsNavigation";
import PoolRankTable from "./components/PoolRankTable";
import ScoresSearch from "./components/ScoresSearch";
import LiveLeaderboardTable from "./components/LiveLeaderboardTable";

interface TournamentData {
  tournament: Record<string, string | number | boolean>;
  leaderboard: Array<{ name: string; score: number; position: string; rank: number; status: string; thru: number; rounds: { strokes: number }[]; chosenCount: number }>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("scoreLeaderboard");
  const [tournamentData, setTournamentData] = useState<TournamentData | null>(null);
  const [picksData, setPicksData] = useState(null);

  const fetchData = async () => {
    try {
      const timestamp = Date.now();
      const response = await fetch(`/api/aws/retrieveGolfData?refresh=true&t=${timestamp}`);
      const data = await response.json();
      setTournamentData(data.tournamentData);
      setPicksData(data.picksData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <HeroSection tournament={tournamentData?.tournament || {}} />
      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">
        {activeTab === "scoreLeaderboard" && (
        <PoolRankTable
          players={picksData || []} 
          leaderboard={tournamentData?.leaderboard || []}
          cutScore={typeof tournamentData?.tournament?.cut_score === 'number' ? tournamentData.tournament.cut_score : 0}
        />
      )}
        {activeTab === "scores" && (
        <ScoresSearch
          players={picksData || []}
          leaderboard={tournamentData?.leaderboard || []}
          cutScore={typeof tournamentData?.tournament?.cut_score === 'number' ? tournamentData.tournament.cut_score : 0}
        />
      )}
        {activeTab === "leaderboard" && <LiveLeaderboardTable leaderboard={tournamentData?.leaderboard || []} />}
      </div>
    </div>
  );
}
