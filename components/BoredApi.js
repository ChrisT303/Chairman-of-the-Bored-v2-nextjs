import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks"; 
import { SAVE_ACTIVITY } from "../server/utils/mutations";
import { AuthContext } from "../context/authContext";




const defaultUserPreferences = {
  interest: ["recreational", "social", "diy"],
  // ...other default values if you want to add later for default user preferences
};

const BoredApi = ({ userPreferences = defaultUserPreferences }) => {
  const [activity, setActivity] = useState({});
  const [saveActivity] = useMutation(SAVE_ACTIVITY);
  const { user } = useContext(AuthContext);


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

  const saveActivityHandler = async (activity) => {
    const userId = user.id;
  
    const { data } = await saveActivity({
      variables: {
        userId,
        activity,
      },
    });
  
    if (data) {
      console.log("Activity saved successfully");
    } else {
      console.log("Failed to save activity");
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
      {user && (
        <button
          onClick={() => saveActivityHandler(activity)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 mt-2"
        >
          Save this activity
        </button>
      )}
    </div>
  );

};

export default BoredApi;
