import { useEffect, useState } from "react";
import {
  Search,
  X,
  Users,
  CalendarDays,
  UserPlus,
  UserCheck,
} from "lucide-react";
import { assets } from "../../assets/assets";
import getAuthenticatedUser from "../../services/auth";

function Discover() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const loadAuthenticatedUser = async () => {
      const authenticatedUser = await getAuthenticatedUser();

      if (!authenticatedUser) {
        return;
      }

      setFollowing(authenticatedUser.following || []);
    };

    loadAuthenticatedUser();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      return;
    }

    const searchUsers = async () => {
      const response = await fetch(
        `https://pingup-backend-q5c9.onrender.com/auth/users/search?search=${encodeURIComponent(search)}`,
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

      setUsers(data.users);
    };

    searchUsers();
  }, [search]);

  const followUser = async (userId) => {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/users/${userId}/follow`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      return;
    }

    console.log(data);

    setFollowing((prev) => [...prev, userId]);
  };

  const unfollowUser = async (userId) => {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/users/${userId}/follow`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      return;
    }

    console.log(data);

    setFollowing((prev) => prev.filter((id) => id.toString() !== userId));
  };

  const handleFollowToggle = (userId) => {
    const isFollowing = following.some(
      (id) => id.toString() === userId.toString(),
    );

    if (isFollowing) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8FAFC] px-8 py-6">
      <h2 className="text-4xl font-bold text-[#0F172B]">Discover People</h2>

      <p className="mt-1 text-sm text-[#45556C]">
        Connect with amazing people and grow your network
      </p>

      <div className="relative mt-6 flex w-full rounded-xl bg-[#FFFFFFCC] p-3.5 shadow-sm">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#64748B]">
          <Search />
        </div>

        <input
          className="w-full rounded-lg border border-[#D1D5DB] bg-[#F8FAFC] py-3 pl-11 pr-4 text-sm text-[#0F172B] outline-none transition-all duration-200 placeholder:text-[#94A3B8] hover:border-[#B8C0CC] focus:border-[#615FFF] focus:bg-white focus:ring-2 focus:ring-[#615FFF]/10"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);

            if (!value.trim()) {
              setUsers([]);
            }
          }}
          type="text"
          placeholder="Search people by name, username, bio, or location..."
        />
      </div>

      {search.trim() && users.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-[#64748B]">No people found.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-3 gap-5">
          {users.map((user) => {
            const createdAt = new Date(user.createdAt);
            const now = new Date();
            const difference = now - createdAt;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));

            const isFollowing = following.some(
              (id) => id.toString() === user._id.toString(),
            );

            return (
              <div
                key={user._id}
                className="flex min-h-75 flex-col items-center rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src={user.profilePicture?.url || assets.sample_profile}
                  alt={`${user.firstName} ${user.lastName}`}
                />

                <p className="text-base font-semibold text-[#0F172B]">
                  {user.firstName} {user.lastName}
                </p>

                <span className="text-sm text-[#64748B]">@{user.userName}</span>

                <p className="mt-2 min-h-15 line-clamp-3 text-sm leading-relaxed text-[#4A5565]">
                  {user.bio || "No bio available."}
                </p>

                <div className="mt-4 flex w-full items-center justify-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full border border-[#D1D5DC] px-3 py-1.5 text-xs text-[#4A5565]">
                    <Users size={14} />
                    {user.followers?.length || 0} followers
                  </span>

                  <span className="flex items-center gap-1.5 rounded-full border border-[#D1D5DC] px-3 py-1.5 text-xs text-[#4A5565]">
                    <CalendarDays size={14} />
                    Joined {days} days ago
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleFollowToggle(user._id)}
                    className={`flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                      isFollowing
                        ? "border border-[#D1D5DC] bg-white text-[#4A5565] hover:bg-[#F8FAFC]"
                        : "bg-linear-to-r from-[#615FFF] to-[#9810FA] text-white hover:opacity-90"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck size={17} />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus size={17} />
                        Follow
                      </>
                    )}
                  </button>

                  <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D1D5DC] text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#0F172B]">
                    <X size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Discover;
