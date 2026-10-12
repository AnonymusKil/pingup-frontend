const getPendingConnections = async () => {
  const response = await fetch(
    "https://pingup-backend-q5c9.onrender.com/auth/users/pending-connections",
    {
      method: "GET",
      credentials: "include",
    },
  );
  const data = await response.json();
  if (!response.ok) {
    console.log(data);
    return;
  }
  console.log(data);
  return data.pendingConnections.length;
};

const getConnections = async () => {
  const response = await fetch(
    "https://pingup-backend-q5c9.onrender.com/auth/users/connections",
    {
      method: "GET",
      credentials: "include",
    },
  );
  const data = await response.json();
  if (!response.ok) {
    console.log(data);
    return;
  }
  console.log(data);
    return data.connections.length;

};
export { getPendingConnections , getConnections};
