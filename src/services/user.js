const getUserById = async (userId) => {
  try {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/users/${userId}`,
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
    console.log("Error getting User", error);
    return null;
  }
};
export default getUserById