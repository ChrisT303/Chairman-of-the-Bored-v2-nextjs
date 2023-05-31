import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";
import { UPDATE_USER_PREFERENCES } from "../server/utils/mutations";
import Link from "next/link";


const Profile = () => {
  // Define state variables to store user preferences
  const [interest, setInterest] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, loading } = useContext(AuthContext);

  const [updateUserPreferences, { loading: updateLoading }] = useMutation(UPDATE_USER_PREFERENCES, {
    onCompleted: data => {
      setSuccessMessage('Profile updated successfully');
    },
    onError: error => {
      setErrorMessage(error.message);
    }
  });
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = user.id;
  
    let ageInput = parseInt(age);
  
    if (isNaN(ageInput)) {
      setErrorMessage('Age must be a valid number');
      return;
    }
  
    await updateUserPreferences({
      variables: {
        userPreferenceInput: {
          id: userId,
          interest,
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
          <input
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
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
    </div>
  );
};

export default Profile;
