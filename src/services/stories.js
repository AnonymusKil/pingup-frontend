const getPeopleIFollowStory = async () => {
  try {
    const response = await fetch(
      "https://pingup-backend-q5c9.onrender.com/auth/stories",
      {
        method: "GET",
        credentials: "include",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data.stories;
  } catch (error) {
    console.log("Error getting User", error);
    return null;
  }
};

const getMyStories = async () => {
  try {
    const response = await fetch(
      "https://pingup-backend-q5c9.onrender.com/auth/my-stories",
      {
        method: "GET",
        credentials: "include",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return null;
    }
    return data.myStories;
  } catch (error) {
    console.log("Error getting User", error);
    return null;
  }
};

export { getMyStories, getPeopleIFollowStory };
