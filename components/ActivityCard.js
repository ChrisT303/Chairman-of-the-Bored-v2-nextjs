import React from 'react'

const ActivityCard = ({ savedActivity }) => {
    return (
      <div className="retro-border rounded-lg overflow-hidden shadow-lg m-2 p-4 bg-retro-background flex justify-between items-start">
        <div>
          <h3 className="font-bold text-xl mb-2 retro-text">{savedActivity.activity.activity}</h3>
          <p className="retro-text">Type: {savedActivity.activity.type}</p>
          <p className="retro-text">Participants: {savedActivity.activity.participants}</p>
          <p className="retro-text">Price: {savedActivity.activity.price}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="retro-btn bg-green-500 px-4 py-2">Complete</button>
          <button className="retro-btn bg-red-500 px-4 py-2">Delete</button>
        </div>
      </div>
    );
};

export default ActivityCard;


  