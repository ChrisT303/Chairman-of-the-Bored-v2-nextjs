import React from "react";
import Greeting from "../components/Greeting";
import BoredApi from "../components/BoredApi";
import Results from "../components/Results";
import LeaderBoard from "../components/LeaderBoard";

const HomePage = () => {
  return (
    <div className="flex flex-col bg-girl bg-cover bg-center h-screen">
      <div className="flex flex-col">
        <Greeting />
      </div>
      <div className="flex flex-col p-10" id="bored-api">
        <BoredApi />
      </div>
      <div className="flex flex-col p-10">
        <Results />
      </div>
    </div>
  );
};

export default HomePage;