import React from 'react';

const AboutPage = () => {
  return (
    <div className="flex flex-col bg-about bg-cover bg-center min-h-screen p-8 space-y-6">
      <div className="flex bg-yellow-300/70 justify-center md:text-xl h-4/6 rounded-lg">
        <div className="flex flex-col justify-center items-center p-8">
          <h1 className="text-6xl text-black font-bold mb-4">
            Welcome to <span className="text-blue-500">Chairman of the Bored</span>
          </h1>
          <p className="text-2xl text-black text-center mb-4">
            Where Boredom Meets Productivity!
          </p>
          <p className="text-xl text-gray-700 text-center">
            Discover exciting activities with the Bored API, or log in to create a personalized profile.
          </p>
          <ul className="list-disc list-inside text-xl text-gray-700 text-center mt-4">
            <li>Save your favorite activities in your digital diary.</li>
            <li>Set activity preferences for tailored suggestions.</li>
            <li>Earn achievement points for completing tasks.</li>
            <li>Compete with friends on the leaderboard for top honors.</li>
          </ul>
          <p className="text-xl text-gray-700 text-center mt-4">
            <span className="text-blue-500">Chairman of the Bored</span> is your partner in making every moment count. Say goodbye to boredom and hello to a life filled with excitement, personal growth, and friendly competition. Join our community and start your adventure today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


