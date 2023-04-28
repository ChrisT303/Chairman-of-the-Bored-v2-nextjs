import React from "react";

import LeaderBoard from "../components/LeaderBoard";

const LeaderBoardPage = () => {
  return (
    <div className="flex flex-col bg-leaderboard bg-cover bg-center h-screen p-8">
      <LeaderBoard />
    </div>
  );
};

export default LeaderBoardPage;