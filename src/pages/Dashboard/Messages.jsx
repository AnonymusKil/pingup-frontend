import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { MessageCircle, Eye } from "lucide-react";
// import { assets } from "../../assets/assets";

function Messages() {
  const [connection, setConnection] = useState([]);
  useEffect(() => {
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
        toast.error(data.message || "Unable to fetch followers");
        return;
      }
      console.log(data);
      setConnection(data.connections);
    };
    getConnections();
  }, []);
  return (
    <section className="bg-[#F8FAFC] min-h-screen px-8 py-6">
      <h2 className="text-[#0F172B] text-4xl font-bold">Messages</h2>

      <p className="text-[#45556C] text-sm mt-1">
        Talk to your friends and family
      </p>
      {connection.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center">
          <p className="text-sm text-[#64748B]">
            You don't have any connections yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-8 max-w-md">
          {connection.map((user) => (
            <div className="flex gap-5 bg-white border border-[#E5E7EB] shadow-sm rounded-2xl p-5 hover:shadow-md transition w-full max-w-md min-h-45">
              <div className="relative shrink-0">
                <img
                  className="w-14 h-14 rounded-full object-cover"
                  src={user?.profilePicture?.url}
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-[#0F172B] truncate">
                  {user?.firstName} {user?.lastName}
                </p>

                <span className="text-sm text-[#64748B]">
                  @{user?.userName}
                </span>

                <p className="text-sm text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                 {user?.bio}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                <NavLink className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F1F5F9] text-[#0F172B] hover:bg-[#E2E8F0] hover:scale-105 transition">
                  <MessageCircle size={18} />
                </NavLink>

                <NavLink className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F1F5F9] text-[#0F172B] hover:bg-[#E2E8F0] hover:scale-105 transition">
                  <Eye size={18} />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}

     
    </section>
  );
}

export default Messages;
