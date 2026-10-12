import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  likeUserPost,
  unLikeUserPost,
} from "../../../../services/likes";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { assets } from "../../../../assets/assets";
import getAuthenticatedUser from "../../../../services/auth";

function PostCard() {
  const [feeds, setFeeds] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getFeeds = async () => {
      const response = await fetch(
        "https://pingup-backend-q5c9.onrender.com/auth/users/timeline",
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

      setFeeds(data.getFollowingPost);
    };

    getFeeds();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const authenticatedUser = await getAuthenticatedUser();

      if (!authenticatedUser) {
        return;
      }

      setUser(authenticatedUser);
    };

    loadUser();
  }, []);

  const handleLikeToggle = async (postId, isLiked) => {
    let data;

    if (isLiked) {
      data = await unLikeUserPost(postId);
    } else {
      data = await likeUserPost(postId);
    }

    if (!data) {
      return;
    }

    setFeeds((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id !== postId) {
          return post;
        }

        if (isLiked) {
          return {
            ...post,
            likes: post.likes.filter(
              (id) => id.toString() !== user._id.toString(),
            ),
          };
        }

        return {
          ...post,
          likes: [...post.likes, user._id],
        };
      }),
    );
  };

  return (
    <section className="mx-auto flex max-w-3xl flex-col rounded-3xl bg-[#FFFFFF] p-5 shadow-sm">
      {feeds.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center">
          <p className="text-sm text-[#64748B]">
            You don't have any connections yet.
          </p>
        </div>
      ) : (
        feeds.map((post) => {
          const createdAt = new Date(post.createdAt);
          const now = new Date();
          const difference = now - createdAt;

          const days = Math.floor(
            difference / (1000 * 60 * 60 * 24),
          );

          const isLiked = post.likes?.some(
            (id) => id.toString() === user?._id?.toString(),
          );

          return (
            <div
              key={post._id}
              className="mb-6 border-b border-[#E5E7EB] pb-6 last:mb-0 last:border-b-0"
            >
              <Link
                to={`/pingup/post/${post._id}`}
                className="block"
              >
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-[#EEF2FF]"
                    src={
                      post.author?.profilePicture?.url ||
                      assets.sample_profile
                    }
                    alt=""
                  />

                  <div className="min-w-0">
                    <h2 className="text-[15px] font-semibold text-[#111827]">
                      {post.author?.firstName}{" "}
                      {post.author?.lastName}
                    </h2>

                    <p className="truncate text-[13px] text-[#6A7282]">
                      @{post.author?.userName} •{" "}
                      {days === 0 ? "Today" : `${days} days ago`}
                    </p>
                  </div>
                </div>

                {/* Content */}
                {post.content && (
                  <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#364153]">
                    {post.content}
                  </p>
                )}

                {/* Images */}
                {post.image?.length > 0 && (
                  <div
                    className={`mt-4 grid gap-2 overflow-hidden rounded-2xl ${
                      post.image.length === 1
                        ? "grid-cols-1"
                        : "grid-cols-2"
                    }`}
                  >
                    {post.image.map((image) => (
                      <img
                        key={image._id}
                        className="max-h-125 w-full object-cover"
                        src={image.url}
                        alt="Post"
                      />
                    ))}
                  </div>
                )}
              </Link>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-8 border-t border-[#E5E7EB] pt-3">
                <button
                  onClick={() =>
                    handleLikeToggle(post._id, isLiked)
                  }
                  className="flex items-center gap-2 text-sm text-[#6A7282] transition hover:text-red-500"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isLiked
                        ? "fill-red-500 text-red-500"
                        : ""
                    }`}
                  />

                  <span>{post.likes?.length || 0}</span>
                </button>

                <Link
                  to={`/pingup/post/${post._id}`}
                  className="flex items-center gap-2 text-sm text-[#6A7282] transition hover:text-[#615FFF]"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments?.length || 0}</span>
                </Link>

                <button className="flex items-center gap-2 text-sm text-[#6A7282] transition hover:text-green-500">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}

export default PostCard;