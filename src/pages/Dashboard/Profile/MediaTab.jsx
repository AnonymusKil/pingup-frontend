import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getMyMedia, getUserMedia } from "../../../services/media";
import { Play } from "lucide-react";

function MediaTab() {
  const { userId } = useParams();

  const [media, setMedia] = useState([]);

  useEffect(() => {
    const loadMediaTab = async () => {
      let userMedia;
      if (userId) {
        userMedia = await getUserMedia(userId);
      } else {
        userMedia = await getMyMedia();
      }
      if (!userMedia) {
        return;
      }
      setMedia(userMedia);
    };

    loadMediaTab();
  }, [userId]);

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#111827]">Media</h2>
        <p className="mt-1 text-sm text-[#6A7282]">
          Photos and videos shared by {media[0]?.author?.userName}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {media.map((item) => (
          <Link
            key={item._id}
            to={`/pingup/post/${item.postId}`}
            className="group relative aspect-square overflow-hidden rounded-xl bg-[#F8FAFC]"
          >
            <img
              src={item.url}
              alt="Post media"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />

            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md">
                  <Play className="ml-0.5 h-5 w-5 fill-[#111827] text-[#111827]" />
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MediaTab;
