import React from 'react'

const ActivityCard = ({ savedActivity }) => {
    return (
      <div className="border rounded-lg overflow-hidden shadow-lg m-2 p-4 bg-white">
        <h3 className="font-bold text-xl mb-2">{savedActivity.activity.activity}</h3>
        <p className="text-gray-700 text-base">Type: {savedActivity.activity.type}</p>
        <p className="text-gray-700 text-base">Participants: {savedActivity.activity.participants}</p>
        <p className="text-gray-700 text-base">Price: {savedActivity.activity.price}</p>
      </div>
    );
  };

export default ActivityCard
  