import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAuthenticatedUser from "../../services/auth.js";
import { assets } from "../../assets/assets";
import {
  House,
  MessageCircle,
  Users,
  Compass,
  UserRound,
  LogOut,
  Plus,
  Bell,
} from "lucide-react";
function Sidebar() {
  const [user, setUser] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    const loadProfile = async () => {
      const authenticatedUser = await getAuthenticatedUser();
      setUser(authenticatedUser);
    };
    loadProfile();
  }, []);

  const logOutUser = async () => {
    try {
      const response = await fetch(
        "https://pingup-backend-q5c9.onrender.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        toast.error(data.message || "Unable to logout");
        return;
      }

      console.log(data);
      toast.success(data.message || "Logout successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <main className="border-l-[#E5E7EB] border-r-[#E5E7EB] border-l border-r w-65 h-screen px-6 py-8">
      <div className="border-b-[#E5E7EB] border-b ">
        <img src={assets.logo} alt="" />
      </div>

      <div className="flex flex-col gap-4 mt-8 text-[#4A5565] font-medium   ">
        <NavLink
          to="."
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 rounded-lg bg-[#EEF2FF] px-4 py-3 text-[#432DD7]"
              : "flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-50"
          }
        >
          <House className="w-5 h-5" />
          <p>Feed</p>
        </NavLink>
        <NavLink
          to="/pingup/messages"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 rounded-lg bg-[#EEF2FF] px-4 py-3 text-[#432DD7]"
              : "flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-50"
          }
        >
          <MessageCircle className="w-5 h-5" />
          <p>Messages</p>
        </NavLink>
        <NavLink
          to="/pingup/connections"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 rounded-lg bg-[#EEF2FF] px-4 py-3 text-[#432DD7]"
              : "flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-50"
          }
        >
          <Users className="w-5 h-5" />
          <p>Connections</p>
        </NavLink>

        <NavLink
          to="/pingup/discover"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 rounded-lg bg-[#EEF2FF] px-4 py-3 text-[#432DD7]"
              : "flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-50"
          }
        >
          <Compass className="w-5 h-5" />
          <p>Discover</p>
        </NavLink>

        <NavLink
          to="/pingup/profile"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 rounded-lg bg-[#EEF2FF] px-4 py-3 text-[#432DD7]"
              : "flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-50"
          }
        >
          <UserRound className="w-5 h-5" />
          <p>Profile</p>
        </NavLink>

        <NavLink
          to="/pingup/notifications"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 rounded-lg bg-[#EEF2FF] px-4 py-3 text-[#432DD7]"
              : "flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-50"
          }
        >
          <Bell className="w-5 h-5" />
          <p>Notifications</p>
        </NavLink>
        <NavLink
          to="/pingup/create-post"
          className="flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#615FFF] to-[#9810FA] px-4 py-3 text-white"
        >
          <Plus className="h-5 w-5" />
          Create Post
        </NavLink>
      </div>
      <div className="mt-8 flex w-full items-center justify-between border-t border-[#E5E7EB] pt-4">
        <div className="flex min-w-0 items-center gap-3">
          <img
            className="h-10 w-10 shrink-0 rounded-full"
            src={user?.profilePicture?.url}
            alt="John Warren"
          />

          <div className="min-w-0">
            <p className="truncate font-medium text-[#000000]">
              {" "}
              {user?.firstName} {user?.lastName}
            </p>
            <p className="truncate text-sm font-normal text-[#6A7282]">
              {user?.userName}
            </p>
          </div>
        </div>

        <LogOut
          onClick={logOutUser}
          className="h-5 w-5 shrink-0 cursor-pointer"
        />
      </div>
    </main>
  );
}

export default Sidebar;
