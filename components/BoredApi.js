import { useState } from 'react';

const BoredApi = () => {
  const [activity, setActivity] = useState({});

  const SearchApi = () => {
    fetch('http://www.boredapi.com/api/activity')
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        setActivity(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center mb-8">
        {activity.activity && (
          <div>
            <h2 className="text-2xl font-bold">{activity.activity}</h2>
            <p>Type: {activity.type}</p>
            <p>Participants: {activity.participants}</p>
            <p>Price: {activity.price}</p>
          </div>
        )}
      </div>
      <button
        onClick={SearchApi}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tell me what to do!
      </button>
    </div>
  );
};

export default BoredApi;