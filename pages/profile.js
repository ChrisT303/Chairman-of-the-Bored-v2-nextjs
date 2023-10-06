import React, { useState, useContext, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";
import {
  GET_USER_SAVED_ACTIVITIES,
  GET_USER_PREFERENCES,
} from "../server/utils/queries";
import {
  UPDATE_USER_PREFERENCES,
  INCREMENT_USER_POINTS,
  DELETE_ACTIVITY,
  COMPLETE_ACTIVITY,
  MARK_ACTIVITY_AS_INCOMPLETE,
} from "../server/utils/mutations";

import ActivityCard from "../components/ActivityCard";
import Select from "react-select";

const Profile = () => {
  const [interest, setInterest] = useState([]);
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [deductPoints, { loading: deductLoading }] = useMutation(DEDUCT_POINTS);

  const { user, loading } = useContext(AuthContext);

  const options = [
    { value: "education", label: "Education" },
    { value: "recreational", label: "Recreational" },
    { value: "social", label: "Social" },
    { value: "music", label: "Music" },
    { value: "charity", label: "Charity" },
    { value: "busywork", label: "Busywork" },
    { value: "cooking", label: "Cooking" },
    { value: "relaxation", label: "Relaxation" },
  ];

  const handleInterestChange = (selectedOptions) => {
    setInterest(selectedOptions);
  };

  const [completeActivity, { loading: completeLoading }] = useMutation(
    COMPLETE_ACTIVITY,
    {
      refetchQueries: [
        { query: GET_USER_SAVED_ACTIVITIES, variables: { userId: user?.id } },
      ],
    }
  );

  const { data: userPreferencesData, loading: preferencesLoading } = useQuery(
    GET_USER_PREFERENCES,
    {
      variables: {
        id: user?.id,
      },
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (userPreferencesData) {
      const userData = userPreferencesData.getUserPreferences;
      setAge(userData.age || "");
      setLocation(userData.location || "");
      setSkillLevel(userData.skillLevel || "");

      // Assuming interests in DB is saved as comma-separated strings
      const interestsArray = userData.interest
        .split(",")
        .map((interest) => ({ value: interest, label: interest }));
      setInterest(interestsArray);
    }
  }, [userPreferencesData]);

  const [updateUserPreferences, { loading: updateLoading }] = useMutation(
    UPDATE_USER_PREFERENCES,
    {
      onCompleted: (data) => {
        setSuccessMessage("Profile updated successfully");
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    }
  );

  const { data: savedActivitiesData } = useQuery(GET_USER_SAVED_ACTIVITIES, {
    variables: {
      userId: user?.id,
    },
    fetchPolicy: "network-only",
  });
  console.log("Fetching saved activities:", savedActivitiesData);

  console.log("Saved Activities Data:", savedActivitiesData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = user.id;

    let ageInput = parseInt(age);

    if (isNaN(ageInput)) {
      setErrorMessage("Age must be a valid number");
      return;
    }

    const interestString = interest.map((i) => i.value).join(", ");

    await updateUserPreferences({
      variables: {
        userPreferenceInput: {
          id: userId,
          interest: interestString,
          age: ageInput,
          location,
          skillLevel,
        },
      },
    });
  };

  const [deleteActivity, { loading: deleteLoading }] = useMutation(
    DELETE_ACTIVITY,
    {
      refetchQueries: [
        { query: GET_USER_SAVED_ACTIVITIES, variables: { userId: user?.id } },
      ],
      onError: (error) => {
        console.error("Failed to delete activity:", error);
      },
    }
  );

  const [awardPoints] = useMutation(INCREMENT_USER_POINTS);

  const handleCompletion = async (activityId) => {
    try {
      await completeActivity({
        variables: {
          activityId: activityId,
        },
      });

      await awardPoints({ variables: { userId: user?.id } });
    } catch (error) {
      console.error("Failed to complete the activity:", error);
    }
  };

  return (
    <div className="mx-auto p-4 bg-woman bg-cover bg-center min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl mb-4">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 retro-text">Interest</label>
            <Select
              isMulti
              value={interest}
              onChange={handleInterestChange}
              options={options}
              className="w-full p-2 retro-border rounded"
              classNamePrefix="select"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 retro-text">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 retro-border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 retro-text">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 retro-border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 retro-text">Skill Level</label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full p-2 retro-border rounded"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          {successMessage && (
            <p className="text-green-600 mb-4">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            className="bg-blue-500 retro-btn text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
        ...
        <div className="mt-10">
          <h2 className="text-2xl mb-4">Saved Activities</h2>
          {savedActivitiesData?.getUserSavedActivities?.length ? (
            savedActivitiesData.getUserSavedActivities.map((savedActivity) => (
              <ActivityCard
                user={user}
                key={savedActivity.id}
                savedActivity={savedActivity}
                onDelete={async (activityId) => {
                  await deleteActivity({ variables: { activityId } });
                }}
                onCompletion={handleCompletion}
              />
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-2xl">No Activities Saved Yet</p>
            </div>
          )}
        </div>
        ...
      </div>
    </div>
  );
};

export default Profile;
