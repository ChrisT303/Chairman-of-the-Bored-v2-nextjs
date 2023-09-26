import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_TOP_USERS } from "../server/utils/queries";


const Leaderboard = () => {
  const { data: leaderboardData } = useQuery(GET_TOP_USERS);
  
  return (
    <div className="flex items-center justify-center bg-leaderboard bg-cover bg-center h-screen p-8">
      <div className="flex flex-col items-center justify-center bg-yellow-300 space-y-4 p-8 rounded-xl max-w-screen-lg mx-auto w-full">
        <table className="table-fixed w-6/12 mb-8">
          <thead>
            <tr>
              <th className="sm:text-5xl text-4xl">Name</th>
              <th className="sm:text-5xl text-4xl">Score</th>
            </tr>
          </thead>
          <tbody >
            {leaderboardData?.getTopUsers?.map((user) => (
              <tr key={user.id}>
                <td className="text-center text-2xl">{user.username}</td>
                <td className="text-center text-2xl">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default Leaderboard;
