import React, {useState} from "react";


const BoredApi = ({ userPreferences }) => {
  const [activity, setActivity] = useState({});
  const SearchApi = async () => {
    // check if userPreferences.interest exists and is an array
    if (!userPreferences.interest || !Array.isArray(userPreferences.interest)) {
      console.log("No interests selected");
      return;
    }
  
    console.log(userPreferences.interest); // log the interests array
  
    const activities = await Promise.all(
      userPreferences.interest.map(async (interest) => {
        const apiUrl = `http://www.boredapi.com/api/activity?type=${interest}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(`Response for ${interest}:`, data); // log the response for each interest
        return data;
      })
    );
  
    const nonEmptyActivities = activities.filter(activity => activity.activity);
    if(nonEmptyActivities.length > 0) {
      const randomActivity = nonEmptyActivities[Math.floor(Math.random() * nonEmptyActivities.length)];
      setActivity(randomActivity);
    } else {
      console.log("No activities found for the selected interests.");
    }
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

