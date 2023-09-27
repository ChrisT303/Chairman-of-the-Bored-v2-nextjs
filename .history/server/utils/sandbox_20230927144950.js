async deleteActivity(_, { activityId }) {
    console.log('Activity Id:', activityId);
    
    const activity = await Activity.findById(activityId);
    if (!activity) {
      throw new Error("Activity not found");
    }
    
    const user = await User.findOne({ savedActivities: activityId });
    if (!user) {
      throw new Error("User not found");
    }
  
    // Removing the activity from user's savedActivities
    user.savedActivities = user.savedActivities.filter(
      (savedActivity) => savedActivity.toString() !== activityId.toString()
    );
  
    await user.save();
  
    // Deleting the activity
    await Activity.findByIdAndDelete(activityId);
  
    // Populating user's savedActivities after deleting the activity
    await user.populate('savedActivities').execPopulate();
  
    // Constructing the response ensuring that the savedActivities and activity are populated correctly.
    return {
      ...user._doc,
      id: user._id.toString(),
      savedActivities: user.savedActivities.map(sa => ({
        ...sa._doc,
        id: sa._id.toString(),
        // Assuming that 'activity' field in 'SavedActivity' contains the fields like 'activity', 'type', 'participants', 'price'
        activity: {
          activity: sa.activity ? sa.activity.activity : '', // Add proper fallback or error handling
          type: sa.activity ? sa.activity.type : '', // Add proper fallback or error handling
          participants: sa.activity ? sa.activity.participants : 0, // Add proper fallback or error handling
          price: sa.activity ? sa.activity.price : 0, // Add proper fallback or error handling
        },
      })),
    };
  
  