import react, { useContext } from "react";
import { AuthContext } from "../context/authContext";


const UserGreeting = () => {
  const { user } = useContext(AuthContext);
  console.log(user);  
  const userName = user?.name;

  return (
    <div className="flex justify-center font-black bg-yellow-300/60 text-black text-center">
      <h1>Hello, {userName}! You&apos;re  bored again?! So are we. Find your next activity!</h1>
    </div>
  );
};





const GenericGreeting = (props) => {
  return (
    <div className=" flex justify-center font-black bg-yellow-300/60 text-black text-center">
      <h1>We know your&apos;e bored! Click the Signup button!</h1>
    </div>
  );
};

const Greeting = () => {
  const { user } = useContext(AuthContext);
  const loggedIn = user !== null;

  if (loggedIn) {
    return <UserGreeting />;
  } else {
    return <GenericGreeting />;
  }
};











export default Greeting;