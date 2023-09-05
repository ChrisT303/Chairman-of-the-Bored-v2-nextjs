// pages/Leaderboard.js
import React from "react";

const Leaderboard = () => {
  return (
    <div className="flex flex-col bg-leaderboard bg-cover bg-center h-screen p-8">
      <div className="flex flex-col space-y-4 bg-yellow-300 p-8 rounded-xl">
        <table className="table-fixed w-6/12">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

