import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import {
  getMyLikePost,
  getUserLikePost,
  likeUserPost,
  unLikeUserPost,
} from "../../../services/likes";

function LikesTab() {
  const { userId } = useParams();

  const [likePost, setLikePost] = useState([]);

  useEffect(() => {
    const loadLikedPosts = async () => {
      let userLikePosts;

      if (userId) {
        userLikePosts = await getUserLikePost(userId);
      } else {
        userLikePosts = await getMyLikePost();
      }

      if (!userLikePosts) {
        return;
      }

      setLikePost(userLikePosts);
    };

    loadLikedPosts();
  }, [userId]);

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

    setLikePost((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id !== postId) {
          return post;
        }

        if (isLiked) {
          return {
            ...post,
            likes: post.likes.filter(
              (id) => id.toString() !== userId?.toString(),
            ),
          };
        }

        return post;
      }),
    );
  };

  return (
    <section className="space-y-4">
      {likePost.length === 0 ? (
        <div className="rounded-xl bg-white p-5 text-center shadow-sm">
          <p className="text-[#6A7282]">No liked posts yet.</p>
        </div>
      ) : (
        likePost.map((post) => (
          <article
            key={post._id}
            className="rounded-xl bg-white p-5 shadow-sm"
          >
            <Link
              to={`/pingup/profile/${post.author?._id}`}
              className="flex items-center gap-3"
            >
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={
                  post.author?.profilePicture?.url ||
                  "/default-profile.png"
                }
                alt={post.author?.userName || "User"}
              />

              <div>
                <h2 className="font-bold text-[16px]">
                  {post.author?.firstName} {post.author?.lastName}
                </h2>

                <div className="flex gap-2">
                  <p className="text-sm text-[#6A7282]">
                    @{post.author?.userName}
                  </p>

                  <p className="text-sm text-[#6A7282]">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>

            <Link to={`/pingup/post/${post._id}`}>
              {post.content && (
                <p className="mt-4 text-[15px] leading-relaxed text-[#364153]">
                  {post.content}
                </p>
              )}

              {post.image?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {post.image.map((image) => (
                    <img
                      key={image._id}
                      src={image.url}
                      alt="Post media"
                      className="max-h-125 w-full rounded-xl object-cover"
                    />
                  ))}
                </div>
              )}
            </Link>

            <div className="mt-4 flex items-center gap-6 border-t border-[#E5E7EB] pt-3">
              <button
                onClick={() => handleLikeToggle(post._id, true)}
                className="flex items-center gap-2 text-sm text-red-500 transition"
              >
                <Heart className="h-5 w-5 fill-red-500" />
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
          </article>
        ))
      )}
    </section>
  );
}

export default LikesTab;