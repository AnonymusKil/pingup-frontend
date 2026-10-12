import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getNotificationIcon,
  getNotificationMessage,
  getNotificationTitle,
} from "../../helper/notificationHelper.jsx";
import { Bell, Trash2, CheckCheck } from "lucide-react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const markAllNotificationsAsRead = async () => {
    const response = await fetch(
      "https://pingup-backend-q5c9.onrender.com/auth/notifications/read-all",
      {
        method: "PATCH",
        credentials: "include",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      toast.error(data.message || "Unable to fetch followers");
      return;
    }
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
    console.log(data);
    toast.success(data.message || "All Notification has been marked as read");
  };

  const markANotificationAsRead = async (notificationId) => {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/notifications/${notificationId}/read`,
      {
        method: "PATCH",
        credentials: "include",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      toast.error(data.message || "Unable to fetch followers");
      return;
    }
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
    console.log(data);
    toast.success(data.message || "All Notification has been marked as read");
  };

  const deleteAllNotification = async () => {
    const response = await fetch(
      "https://pingup-backend-q5c9.onrender.com/auth/notifications/delete-all",
      {
        method: "DELETE",
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
    toast.success(data.message || "All Notification has been marked as read");
  };
  const deleteANotification = async (notificationId) => {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/notifications/${notificationId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      toast.error(data.message || "Unable to fetch followers");
      return;
    }
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification._id !== notificationId,
      ),
    );
    setNotifications([])
    console.log(data);
    toast.success(data.message || "All Notification has been marked as read");
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(
        "https://pingup-backend-q5c9.onrender.com/auth/notifications",
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
      setNotifications(data.notifications);
    };
    fetchNotifications();
  }, []);

  const getNotificationTime = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();

    const difference = now - created;

    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    if (hours < 24) {
      return `${hours}h ago`;
    }

    return `${days}d ago`;
  };

  return (
    <section className="min-h-full bg-[#F8FAFC] p-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1D293D]">Notifications</h1>

            <p className="mt-1 text-sm text-[#6A7282]">
              Stay updated with what's happening on PingUp.
            </p>
          </div>

          <button
            onClick={markAllNotificationsAsRead}
            className="cursor-pointer flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#615FFF] transition hover:bg-[#EEF2FF]"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        </div>

        {/* Notifications */}
        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2FF]">
                <Bell className="h-7 w-7 text-[#615FFF]" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-[#1D293D]">
                No notifications yet
              </h2>

              <p className="mt-1 max-w-sm text-sm text-[#6A7282]">
                When someone interacts with you, you'll see their activity here.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`group flex items-center gap-4 border-b border-[#E5E7EB] p-5 transition last:border-b-0 ${
                  !notification.read
                    ? "bg-[#F5F7FF]"
                    : "bg-white hover:bg-[#F8FAFC]"
                }`}
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9]">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <p className="text-sm font-medium text-[#1D293D]">
                      {getNotificationTitle(notification.type)}
                    </p>

                    {!notification.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#615FFF]" />
                    )}
                  </div>

                  {getNotificationMessage(notification) && (
                    <p className="mt-1 text-sm text-[#6A7282]">
                      {getNotificationMessage(notification)}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-[#94A3B8]">
                    {getNotificationTime(notification.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2 opacity-0 transition group-hover:opacity-100">
                  {!notification.read && (
                    <button
                      onClick={() => markANotificationAsRead(notification._id)}
                      title="Mark as read"
                      className=" cursor-pointer rounded-lg p-2 text-[#6A7282] transition hover:bg-[#EEF2FF] hover:text-[#615FFF]"
                    >
                      <CheckCheck className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      deleteANotification(notification._id);
                    }}
                    title="Delete notification"
                    className="cursor-pointer  rounded-lg p-2 text-[#6A7282] transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Delete all */}
        {notifications.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={deleteAllNotification}
              className=" cursor-pointer flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete all notifications
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Notifications;
