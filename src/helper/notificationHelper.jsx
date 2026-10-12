import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
} from "lucide-react";

const getNotificationIcon = (type) => {
  switch (type) {
    case "LIKE_POST":
      return <Heart className="h-5 w-5 text-red-500" />;

    case "COMMENT":
      return <MessageCircle className="h-5 w-5 text-[#615FFF]" />;

    case "FOLLOW":
      return <UserPlus className="h-5 w-5 text-green-500" />;

    case "LIKE_COMMENT":
      return <Heart className="h-5 w-5 text-red-500" />;

    default:
      return <Bell className="h-5 w-5 text-[#615FFF]" />;
  }
};


const getNotificationMessage = (notification) => {
  const senderName = `${notification.sender.firstName} ${notification.sender.lastName}`;

  switch (notification.type) {
    case "LIKE_POST":
      return `${senderName} liked your post`;

    case "COMMENT":
      return `${senderName} commented on your post`;

    case "FOLLOW":
      return `${senderName} started following you`;

    case "LIKE_COMMENT":
      return `${senderName} liked your comment`;

    default:
      return "You have a new notification";
  }
};

const getNotificationTitle = (type) => {
  switch (type) {
    case "LIKE_POST":
      return "New Like";

    case "COMMENT":
      return "New Comment";

    case "FOLLOW":
      return "New Follower";

    case "LIKE_COMMENT":
      return "Comment Liked";

    default:
      return "New Notification";
  }
};
export {getNotificationIcon, getNotificationMessage, getNotificationTitle}