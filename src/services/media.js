const getMyMedia = async () => {
  try {
    const response = await fetch(
      "https://pingup-backend-q5c9.onrender.com/auth/users/me/media",
      {
        method: "GET",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data.media;
  } catch (error) {
    console.log("Error getting User", error);
    return null;
  }
};

const getUserMedia = async (userId) => {
  try {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/users/${userId}/media`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data.media;
  } catch (error) {
    console.log("Error getting User", error);
    return null;
  }
};

export {getMyMedia,getUserMedia}