const getAuthenticatedUser = async () => {
  try {
    const response = await fetch(
      "https://pingup-backend-q5c9.onrender.com/auth/ME",
      {
        method: "GET",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data.user;
  } catch (error) {
    console.log("Authentication error:", error);
    return null;
  }
};

export default getAuthenticatedUser