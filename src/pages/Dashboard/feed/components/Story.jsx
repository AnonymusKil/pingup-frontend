import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getMyStories,
  getPeopleIFollowStory,
} from "../../../../services/stories.js";
import { PlusIcon } from "lucide-react";

function Story() {
  const [stories, setStories] = useState([]);
  const [myStories, setMyStories] = useState([]);

  useEffect(() => {
    const loadStories = async () => {
      const userStories = await getPeopleIFollowStory();
      const ownStories = await getMyStories();

      if (userStories) {
        setStories(userStories);
      }

      if (ownStories) {
        setMyStories(ownStories);
      }
    };
    console.log("STORY COMPONENT RENDERED");

    loadStories();
  }, []);

  const getStoryTime = (createdAt) => {
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

  const renderStoryCard = (story) => (
    <div
      key={story._id}
      className="relative h-48 w-32 shrink-0 overflow-hidden rounded-xl bg-cover bg-center"
    >
      {/* Images */}
      {story.images?.length > 0 &&
        story.images.map((image) => (
          <img
            key={image._id}
            src={image.url}
            alt="Story"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}

      {/* Videos */}
      {story.videos?.length > 0 &&
        story.videos.map((video) => (
          <video
            key={video._id}
            src={video.url}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ))}

      {/* Text story */}
      {story.images?.length === 0 &&
        story.videos?.length === 0 &&
        story.content && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#615FFF] p-4">
            <p className="text-center text-sm font-medium text-white">
              {story.content}
            </p>
          </div>
        )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* User info */}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
        <img
          className="h-10 w-10 rounded-full border-2 border-white object-cover"
          src={
            story?.author?.profilePicture?.url ||
            "/default-profile.png"
          }
          alt={story?.author?.userName || "User"}
        />

        <p className="max-w-16 truncate text-sm font-medium text-white">
          {story?.author?.userName}
        </p>
      </div>

      {/* Story time */}
      <p className="absolute bottom-3 right-3 z-10 text-xs text-white">
        {getStoryTime(story.createdAt)}
      </p>
    </div>
  );

  return (
    <section className="ml-20 flex gap-4 overflow-x-auto">
      {/* Create Story */}
      <Link
        to="/pingup/create-story"
        className="flex h-48 w-32 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#C7D2FE] bg-linear-to-r from-[#EEF2FF] to-[#FFFFFF] transition hover:-translate-y-1 hover:shadow-md"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#615FFF] text-white transition hover:bg-[#4F46E5]">
          <PlusIcon className="h-5 w-5" />
        </div>

        <p className="mt-3 text-base font-medium text-[#314158]">
          Create Story
        </p>
      </Link>

      {/* My Stories */}
      {myStories.length > 0 &&
        myStories.map((story) => renderStoryCard(story))}

      {/* Stories From People I Follow */}
      {stories.length > 0 &&
        stories.map((story) => renderStoryCard(story))}
    </section>
  );
}

export default Story;