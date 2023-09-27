import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_ACTIVITY } from "../server/utils/mutations";
import { GET_USER_SAVED_ACTIVITIES } from "../server/utils/queries";
import { AuthContext } from "../context/authContext";
import { formatPrice } from '../server/utils/priceFormatter'; 


const defaultUserPreferences = {
  interest: ["recreational", "social", "diy"],
  // ...other default values if you want to add later for default user preferences
};

const BoredApi = ({ userPreferences = defaultUserPreferences }) => {
  const [activity, setActivity] = useState({});
  const { user } = useContext(AuthContext);
  const [saveActivity] = useMutation(SAVE_ACTIVITY, {
    refetchQueries: [
      {
        query: GET_USER_SAVED_ACTIVITIES,
        variables: { userId: user.id },
      },
    ],
  });
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
  
    // Ensure activity.participants is a valid number before saving
    if (activity.participants === null || activity.participants === undefined) {
      console.error("Invalid participants value in activity");
      return;
    }
  
    // Transform activity object to match the format expected by the GraphQL mutation
    const transformedActivity = {
      activity: activity.activity,
      type: activity.type,
      participants: activity.participants,
      price: activity.price,
    };
  
    const { data } = await saveActivity({
      variables: {
        userId,
        activity: transformedActivity,
      },
    });
  
    if (data) {
      console.log("Activity saved successfully");
    } else {
      console.log("Failed to save activity");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-start pt-10 h-screen">
      <div
        className={`bg-white bg-opacity-70 shadow-lg rounded-lg p-6 mb-8 text-center ${
          !activity.activity && "awaiting-adventure"
        }`}
      >
        {activity.activity ? (
          <>
            <h2 className="text-2xl font-bold">{activity.activity}</h2>
            <p>Type: {activity.type}</p>
            <p>Participants: {activity.participants}</p>
            <p>Price: {formatPrice(activity.price)}</p>
          </>
        ) : (
          <>
          <h2 className="text-2xl font-bold">Awaiting Adventure!</h2>
          <p>Click &quot;Tell me what to do!&quot; to get started.</p>
      </>
      
        )}
      </div>
      <button
        onClick={SearchApi}
        className="retro-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tell me what to do!
      </button>
      {user && (
        <button
          onClick={() => saveActivityHandler(activity)}
          className="retro-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 mt-2"
        >
          Save this activity
        </button>
      )}
    </div>
  );
};



export default BoredApi;
