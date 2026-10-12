import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { getUserPosts, getMyPosts } from "../../../services/posts";
import getAuthenticatedUser from "../../../services/auth";

function PostsTab() {
  const { userId } = useParams();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const likePost = async (postId) => {
    const response = await fetch(
      `https://pingup-backend-q5c9.onrender.com/auth/posts/${postId}/like`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      toast.error(data.message || "Unable to like post");
      return;
    }
    console.log(data);
    toast.success(data.message || "Post liked successfully");
  };

  useEffect(() => {
    const loadPostTab = async () => {
      let userPosts;

      if (userId) {
        userPosts = await getUserPosts(userId);
      } else {
        userPosts = await getMyPosts();
      }

      if (!userPosts) {
        return;
      }

      setPosts(userPosts);
    };

    const loadUser = async () => {
      const authenticatedUser = await getAuthenticatedUser();

      if (!authenticatedUser) return;

      setUser(authenticatedUser);
    };

    loadPostTab();
    loadUser();
  }, [userId]);

  return (
    <section className="space-y-4">
      {posts.length === 0 ? (
        <div className="rounded-xl bg-white p-5 text-center shadow-sm">
          <p className="text-[#6A7282]">No posts yet.</p>
        </div>
      ) : (
        posts.map((post) => (
          <article key={post._id} className="rounded-xl bg-white p-5 shadow-sm">
            <Link
              to={`/pingup/profile/${post.author?._id}`}
              className="flex items-center gap-3"
            >
              <div>
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={
                    post.author?.profilePicture?.url || "/default-profile.png"
                  }
                  alt={post.author?.userName || "User"}
                />
              </div>

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
              <p className="mt-4 text-[15px] leading-relaxed text-[#364153]">
                {post.content}
              </p>

              {post.image?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {post.image.map((image) => (
                    <img
                      key={image._id}
                      src={image.url}
                      alt="Post"
                      className="max-h-125 w-full rounded-xl object-cover"
                    />
                  ))}
                </div>
              )}
            </Link>

            <div className="mt-4 flex items-center gap-6 border-t border-[#E5E7EB] pt-3">
              <button
                onClick={() => {
                  likePost(post._id);
                }}
                className="flex items-center gap-2 text-sm text-[#6A7282] transition hover:text-red-500"
              >
                {user &&
                  (post.likes?.some(
                    (id) => id.toString() === user._id.toString(),
                  ) ? (
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                  ) : (
                    <Heart className="h-5 w-5" />
                  ))}
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

export default PostsTab;
