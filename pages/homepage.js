import React, { useContext } from "react";
import Greeting from "../components/Greeting";
import BoredApi from "../components/BoredApi";
import Results from "../components/Results";
import { AuthContext } from "../context/authContext";
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_PREFERENCES } from '../server/utils/queries';

const HomePage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);

  const { loading: queryLoading, error, data } = useQuery(GET_USER_PREFERENCES, {
    variables: { id: user?.id },
    skip: authLoading || !user
  });

  if (authLoading || queryLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let userPreferences = data?.getUserPreferences;
  if (userPreferences && typeof userPreferences.interest === 'string') {
    userPreferences = { ...userPreferences, interest: userPreferences.interest.split(',') };
  }

  return (
    <div className=" min-h-screen flex flex-col">
      <div className="flex flex-col">
      <Greeting  />
      </div>
      <div className="flex flex-col p-10" id="bored-api">
        <BoredApi userPreferences={userPreferences} />
      </div>
      <div className="flex flex-col p-10">
        <Results />
      </div>
    </div>
  );
};

export default HomePage;




  
  
  

