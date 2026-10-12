import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { Calendar, Edit2Icon } from "lucide-react";
import getAuthenticatedUser from "../../../services/auth";
import getUserById from "../../../services/user";
import { getMyPosts, getUserPosts } from "../../../services/posts";
function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [postCount, setPostCount] = useState(0);
  const [days, setDays] = useState(0);
  useEffect(() => {
    const loadProfile = async () => {
      let profileUser;
      let profilePosts;
      if (userId) {
        profileUser = await getUserById(userId);
        profilePosts = await getUserPosts(userId);
      } else {
        profileUser = await getAuthenticatedUser();
        profilePosts = await getMyPosts();
        // profileUser = authenticatedUser;
      }

      setUser(profileUser);
      setPostCount(profilePosts?.length || 0);

      const createdAt = new Date(profileUser.createdAt);
      const now = new Date();

      const difference = now - createdAt;

      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
    };

    loadProfile();
  }, [userId]);

  return (
    <section className=" mx-auto mt-5 max-w-3xl overflow-hidden rounded-[20px] bg-[#F8FAFC]">
      <div className=" h-64 w-full overflow-hidden  rounded-t-[20px]">
        <img
          src={user?.coverPicture?.url}
          className="h-full w-full object-cover"
          alt="Cover photo"
        />{" "}
      </div>

      <div className="flex bg-white w-full px-8 pb-6 gap-5 shadow-md">
        <div className="-mt-16 h-32 w-32 shrink-0">
          <img
            src={user?.profilePicture?.url}
            className="h-full w-full rounded-full border-4 border-white object-cover shadow-md"
            alt="Profile"
          />
        </div>
        <div>
          <div className="flex items-start justify-between">
            <div className="pt-3">
              <h2 className="font-bold text-2xl">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm text-[#6A7282]">@{user?.userName}</p>
              <p className="text-[#364153] text-[14px] mt-2">{user?.bio}</p>
              <div className="mt-4 mb-3 flex items-center gap-2 border-b border-[#E5E7EB] pb-4">
                <Calendar className="h-4 w-4 text-[#6A7282]" />

                <p className="text-sm text-[#6A7282]">Joined</p>

                <span className="text-sm font-medium text-[#6A7282]">
                  {days} days ago
                </span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex gap-2 items-center">
                  <p className="text-2xl font-bold">{postCount}</p>
                  <p className="text-[#6A7282] text-[14px]">Posts</p>
                </div>

                <div className="flex gap-2 items-center">
                  <p className="text-2xl font-bold">
                    {user?.followers?.length || 0}
                  </p>
                  <p className="text-[#6A7282] text-[14px]">Followers</p>
                </div>

                <div className="flex gap-2 items-center">
                  <p className="text-2xl font-bold">
                    {user?.following?.length || 0}
                  </p>
                  <p className="text-[#6A7282] text-[14px]">Following</p>
                </div>
              </div>
            </div>
            <Link
              to="/pingup/edit-profile"
              className="flex shrink-0 items-center gap-2 rounded-lg border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#364153] transition hover:bg-[#F8FAFC] mt-3 "
            >
              <Edit2Icon className="h-4 w-4" />
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-2xl bg-white p-2 shadow-md">
        <NavLink
          to="posts"
          className={({ isActive }) =>
            `rounded-full px-5 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-[#EEF2FF] text-[#615FFF]"
                : "text-[#4A5565] hover:bg-[#F8FAFC]"
            }`
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="media"
          className={({ isActive }) =>
            `rounded-full px-5 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-[#EEF2FF] text-[#615FFF]"
                : "text-[#4A5565] hover:bg-[#F8FAFC]"
            }`
          }
        >
          Media
        </NavLink>
        <NavLink
          to="likes"
          className={({ isActive }) =>
            `rounded-full px-5 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-[#EEF2FF] text-[#615FFF]"
                : "text-[#4A5565] hover:bg-[#F8FAFC]"
            }`
          }
        >
          Likes
        </NavLink>
      </div>
      <Outlet />
    </section>
  );
}

export default Profile;
