import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_TOP_USERS } from "../server/utils/queries";


const Leaderboard = () => {
  const { data: leaderboardData } = useQuery(GET_TOP_USERS);
  console.log(leaderboardData);

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
          <tbody>
  {leaderboardData?.getTopUsers?.map((user) => (
    <tr key={user.id}>
      <td>{user.username}</td>
      <td>{user.points}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
