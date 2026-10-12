import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import getAuthenticatedUser from "../../../services/auth";
import {
  getPendingConnections,
  getConnections,
} from "../../../services/connectionservice";
import { UserPlus, Users, UserRoundCheck, Clock } from "lucide-react";
function Connections() {
  const [user, setUser] = useState();
  const [connectionCount, setConnectionCount] = useState([]);
  const[pendingConnectionCount, setPendingConnectionCount] = useState([])
  useEffect(() => {
    const loadProfile = async () => {
      const authenticatedUser = await getAuthenticatedUser();
      setUser(authenticatedUser);
    };
    const fetchConnectionCount = async () => {
      const count = await getConnections();
      setConnectionCount(count);
    };
    const fetchPendingConnectionCount = async() => {
      const pendingConnectionCount = await getPendingConnections()
      setPendingConnectionCount(pendingConnectionCount)
    }
    fetchConnectionCount();
    fetchPendingConnectionCount()
    loadProfile();
  }, []);
  return (
    <section className="bg-[#F8FAFC]  min-h-screen px-8 py-6">
      <h2 className="text-[#0F172B] text-4xl font-bold">Connections</h2>
      <p className="text-[#45556C] text-sm mt-1">
        Manage your network and discover new connections
      </p>
      <div className="flex gap-6 mt-5 items-center  text-center">
        <div className="shadow-sm bg-[#FFFFFF]  border border-[#E5E7EB] rounded-xl  px-6 py-4 min-w-32.5">
          <p className="text-2xl font-bold text-[#0F172B]">
            {user?.followers?.length || 0}
          </p>
          <p className="text-sm text-[#64748B] mt-1">Followers</p>
        </div>

        <div className="shadow-sm bg-[#FFFFFF]border border-[#E5E7EB] rounded-xl  px-6 py-4 min-w-32.5">
          <p className="text-2xl font-bold text-[#0F172B] ">
            {user?.following?.length || 0}
          </p>
          <p className="text-sm text-[#64748B] mt-1">Following</p>
        </div>

        <div className="shadow-sm bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl  px-6 py-4 min-w-32.5">
          <p className="text-2xl font-bold text-[#0F172B] ">
            {pendingConnectionCount}
          </p>
          <p className="text-sm text-[#64748B] mt-1">Pending</p>
        </div>

        <div className="shadow-sm bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl  px-6 py-4 min-w-32.5">
          <p className="text-2xl font-bold text-[#0F172B]">
            {connectionCount}
          </p>
          <p className="text-sm text-[#64748B] mt-1">Connection</p>
        </div>
      </div>
      <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] rounded-xl shadow-sm mt-8 p-1 w-fit">
        <NavLink
          to="followers"
          className={({ isActive }) =>
            `flex items-center gap-2 px-5 py-3 rounded-lg text-sm transition ${
              isActive
                ? "bg-[#F1F5F9] text-[#0F172B] font-semibold"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172B]"
            }`
          }
        >
          <Users />
          Followers
        </NavLink>
        <NavLink
          to="following"
          className={({ isActive }) =>
            `flex items-center gap-2 px-5 py-3 rounded-lg text-sm transition ${
              isActive
                ? "bg-[#F1F5F9] text-[#0F172B] font-semibold"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172B]"
            }`
          }
        >
          <UserPlus /> Following
        </NavLink>
        <NavLink
          to="pending"
          className={({ isActive }) =>
            `flex items-center gap-2 px-5 py-3 rounded-lg text-sm transition ${
              isActive
                ? "bg-[#F1F5F9] text-[#0F172B] font-semibold"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172B]"
            }`
          }
        >
          <Clock />
          Pending
        </NavLink>
        <NavLink
          to="."
          className={({ isActive }) =>
            `flex items-center gap-2 px-5 py-3 rounded-lg text-sm transition ${
              isActive
                ? "bg-[#F1F5F9] text-[#0F172B] font-semibold"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172B]"
            }`
          }
        >
          <UserRoundCheck />
          Connections
        </NavLink>
      </div>
      <Outlet />
    </section>
  );
}

export default Connections;
