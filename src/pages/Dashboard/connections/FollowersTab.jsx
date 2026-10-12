import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { assets } from "../../../assets/assets";

function FollowersTab() {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await fetch(
          "https://pingup-backend-q5c9.onrender.com/auth/users/followers",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          console.log(data);
          toast.error(data.message || "Unable to fetch followers");
          return;
        }

        console.log(data);
        setFollowers(data.followers);
      } catch (error) {
        console.log("Get followers error:", error);
        toast.error("Something went wrong");
      }
    };

    getFollowers();
  }, []);

  return (
    <section>
      {followers.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center">
          <p className="text-sm text-[#64748B]">
            You don't have any followers yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 mt-8 max-w-4xl">
          {followers.map((user) => (
            <div
              key={user._id}
              className="flex gap-4 bg-white border border-[#E5E7EB] shadow-sm rounded-2xl p-5 hover:shadow-md transition"
            >
              <div>
                <img
                  className="w-14 h-14 rounded-full object-cover"
                  src={user.profilePicture.url || assets.sample_profile}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </div>

              <div>
                <p className="text-base font-semibold text-[#0F172B]">
                  {user.firstName} {user.lastName}
                </p>

                <span className="text-sm text-[#64748B]">
                  @{user.userName}
                </span>

                <p className="text-sm text-[#64748B] mt-2 line-clamp-1">
                  {user.bio || "No bio available"}
                </p>

                <Link
                  to={`/pingup/profile/${user._id}`}
                  className="flex items-center justify-center rounded-lg bg-linear-to-r from-[#615FFF] to-[#9810FA] px-4 py-2 text-sm font-medium text-white mt-4 hover:opacity-90 transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FollowersTab;