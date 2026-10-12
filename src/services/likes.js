const getMyLikePost = async () => {
  try {
    const response = await fetch(
      "https://pingup-backend-q5c9.onrender.com/auth/users/me/likepost",
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

const getUserLikePost = async (userId) => {
  try {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/users/${userId}/likepost`,
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

const likeUserPost = async (postId) => {
  try {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/posts/${postId}/like`,
      {
        method: "POST",
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

const unLikeUserPost = async (postId) => {
  try {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/posts/${postId}/unlike`,
      {
        method: "DELETE",
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
export { getMyLikePost, getUserLikePost, likeUserPost, unLikeUserPost };
