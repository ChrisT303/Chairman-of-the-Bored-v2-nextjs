import React, { useState } from "react";

const defaultUserPreferences = {
  interest: ["recreational", "social", "diy"],
  // ...other default values if you want to add later for default user preferences
};

const BoredApi = ({ userPreferences = defaultUserPreferences }) => {
  const [activity, setActivity] = useState({});

  const SearchApi = async () => {
    // If userPreferences is undefined, use the defaultUserPreferences
    const preferences = userPreferences || defaultUserPreferences;

    console.log(preferences.interest);

    const activities = await Promise.all(
      preferences.interest.map(async (interest) => {
        const apiUrl = `http://www.boredapi.com/api/activity?type=${interest}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(`Response for ${interest}:`, data);
        return data;
      })
    );

    const nonEmptyActivities = activities.filter(
      (activity) => activity.activity
    );
    if (nonEmptyActivities.length > 0) {
      const randomActivity =
        nonEmptyActivities[
          Math.floor(Math.random() * nonEmptyActivities.length)
        ];
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
