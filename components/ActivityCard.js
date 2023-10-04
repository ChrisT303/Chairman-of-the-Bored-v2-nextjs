import React, { useState } from "react";
import { formatPrice } from "../server/utils/priceFormatter";
import { useMutation } from "@apollo/react-hooks";
import {
  MARK_ACTIVITY_AS_INCOMPLETE,
  COMPLETE_ACTIVITY,
  DEDUCT_POINTS,
  INCREMENT_USER_POINTS,
} from "../server/utils/mutations";
import { GET_TOP_USERS } from "../server/utils/queries";

const ActivityCard = ({ savedActivity, onDelete, onCompletion, user }) => {
  const [isCompleted, setIsCompleted] = useState(savedActivity.isCompleted);
  const [markActivityAsIncomplete, { loading: markingIncomplete }] =
    useMutation(MARK_ACTIVITY_AS_INCOMPLETE);
  const [markActivityAsComplete, { loading: markingComplete }] =
    useMutation(COMPLETE_ACTIVITY);
  const [deductPoints, { loading: deducting }] = useMutation(DEDUCT_POINTS, {
    refetchQueries: [{ query: GET_TOP_USERS }],
  });
  const [awardPoints, { loading: awarding }] = useMutation(
    INCREMENT_USER_POINTS,
    {
      refetchQueries: [{ query: GET_TOP_USERS }],
    }
  );

  const handleToggleCompletion = async () => {
    if (isCompleted) {
      await markActivityAsIncomplete({
        variables: {
          activityId: savedActivity.id,
        },
      });
      await deductPoints({
        variables: {
          userId: user.id,
        },
      });
    } else {
      await markActivityAsComplete({
        variables: {
          activityId: savedActivity.id,
        },
      });
      await awardPoints({
        variables: {
          userId: user.id,
        },
      });
    }
    setIsCompleted(!isCompleted);
  };

  return (
    <div
      className={`retro-border rounded-lg overflow-hidden shadow-lg m-2 p-4 
    ${
      isCompleted ? "bg-green-200" : "bg-retro-background"
    } flex justify-between items-start`}
    >
      <div>
        <h3 className="font-bold text-xl mb-2 retro-text">
          {savedActivity.activity.type}
        </h3>

        <p className="retro-text">
          Participants: {savedActivity.activity.participants}
        </p>
        <p className="retro-text">
          Price: {formatPrice(savedActivity.activity.price)}
        </p>
      </div>
      <div className="flex flex-col space-y-2">
        <button
          className={`retro-btn ${
            isCompleted ? "bg-gray-400" : "bg-green-500"
          } px-4 py-2`}
          onClick={handleToggleCompletion}
        >
          {isCompleted ? "Incomplete" : "Complete"}
        </button>

        <button
          className="retro-btn bg-red-500 px-4 py-2"
          onClick={() => onDelete(savedActivity.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
