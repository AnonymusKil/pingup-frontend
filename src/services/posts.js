const getMyPosts = async () => {
  try {
    const response = await fetch(
      "https://pingup-backend-q5c9.onrender.com/auth/users/me/posts",
      {
        method: "GET",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data.posts;
  } catch (error) {
    console.log("Error getting User", error);
    return null;
  }
};

const getUserPosts = async (userId) => {
  try {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/users/${userId}/posts`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data.posts;
  } catch (error) {
    console.log("Error getting User", error);
    return null;
  }
};

export { getMyPosts, getUserPosts };
