import React from "react";
import Greeting from "../components/Greeting";
import BoredApi from "../components/BoredApi";
import Results from "../components/Results";
import LeaderBoard from "../components/LeaderBoard";
import { useAuth } from "../context/authContext";

const HomePage = () => {
    return (
      <div className=" min-h-screen flex flex-col">
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
  
  
  

