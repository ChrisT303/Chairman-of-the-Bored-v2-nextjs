import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";
import { UPDATE_USER_PREFERENCES } from "../server/utils/mutations";
import { GET_USER_SAVED_ACTIVITIES } from "../server/utils/queries";
import Select from "react-select";

const Profile = () => {
  const [interest, setInterest] = useState([]);
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, loading } = useContext(AuthContext);

  const options = [
    { value: "education", label: "Education" },
    { value: "recreational", label: "Recreational" },
    { value: "social", label: "Social" },
    { value: "diy", label: "DIY" },
    { value: "charity", label: "Charity" },
    { value: "cooking", label: "Cooking" },
    { value: "relaxation", label: "Busywork" },
    { value: "exercise", label: "Exercise" },
  ];

  const handleInterestChange = (selectedOptions) => {
    setInterest(selectedOptions);
  };

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
      userId: user.id,  // assuming user id is stored in auth context when user is logged in
    },
  });
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = user.id;

    let ageInput = parseInt(age);

    if (isNaN(ageInput)) {
      setErrorMessage("Age must be a valid number");
      return;
    }

    const interestString = interest.map(i => i.value).join(", ");


    await updateUserPreferences({
      variables: {
          userPreferenceInput: {
              id: userId,
              interest: interestString,
              age: ageInput,
              location,
              skillLevel
          }
      }
  });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Interest</label>
          <Select
            isMulti
            value={interest}
            onChange={handleInterestChange}
            options={options}
            className="w-full p-2 border border-gray-300 rounded"
            classNamePrefix="select"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Skill Level</label>
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select skill level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        {successMessage && (
          <p className="text-green-600 mb-4">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
      <div className="mt-10">
        <h2 className="text-2xl mb-4">Saved Activities</h2>
        {savedActivitiesData && savedActivitiesData.savedActivities.map((savedActivity) => (
          <div key={savedActivity.id}>
            <h2 className="text-2xl font-bold">{savedActivity.activity.activity}</h2>
            <p>Type: {savedActivity.activity.type}</p>
            <p>Participants: {savedActivity.activity.participants}</p>
            <p>Price: {savedActivity.activity.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Profile;
