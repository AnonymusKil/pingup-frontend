import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getAuthenticatedUser from "../../services/auth";
import {
  likeUserPost,
  unLikeUserPost,
} from "../../services/likes";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Send,
  MoreHorizontal,
} from "lucide-react";
import { assets } from "../../assets/assets";

function PostDetails() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [profile, setProfile] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://pingup-backend-q5c9.onrender.com/auth/post/${postId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          console.log(data);
          toast.error(data.message || "Unable to load post");
          return;
        }

        setPost(data.post);
      } catch (error) {
        console.log("Error getting post:", error);
        toast.error("Unable to load post");
      } finally {
        setLoading(false);
      }
    };

    const loadProfile = async () => {
      const authenticatedUser = await getAuthenticatedUser();

      if (!authenticatedUser) {
        return;
      }

      setProfile(authenticatedUser);
    };

    loadPost();
    loadProfile();
  }, [postId]);

  if (loading) {
    return (
      <section className="min-h-full bg-[#F8FAFC] p-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-[#64748B]">
            Loading post...
          </p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-full bg-[#F8FAFC] p-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-[#64748B]">
            Post not found.
          </p>

          <Link
            to="/pingup"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#615FFF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Feed
          </Link>
        </div>
      </section>
    );
  }

  const isPostLiked = post.likes?.some(
    (id) => id.toString() === profile?._id?.toString(),
  );

  const getCommentTime = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();

    const difference = now - created;

    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(
      difference / (1000 * 60 * 60),
    );
    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24),
    );

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return created.toLocaleDateString();
  };

  const handlePostLike = async () => {
    if (!profile) {
      toast.error("You need to be logged in to like a post");
      return;
    }

    let data;

    if (isPostLiked) {
      data = await unLikeUserPost(post._id);
    } else {
      data = await likeUserPost(post._id);
    }

    if (!data) {
      toast.error(
        isPostLiked
          ? "Unable to unlike post"
          : "Unable to like post",
      );
      return;
    }

    setPost((prevPost) => {
      if (!prevPost) {
        return prevPost;
      }

      if (isPostLiked) {
        return {
          ...prevPost,
          likes: prevPost.likes.filter(
            (id) =>
              id.toString() !== profile._id.toString(),
          ),
        };
      }

      return {
        ...prevPost,
        likes: [...prevPost.likes, profile._id],
      };
    });

    toast.success(
      data.message ||
        (isPostLiked
          ? "Post unliked"
          : "Post liked"),
    );
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      return;
    }

    if (!profile) {
      toast.error(
        "You need to be logged in to comment",
      );
      return;
    }

    try {
      setCommentLoading(true);

      const response = await fetch(
        `https://pingup-backend-q5c9.onrender.com/auth/posts/${postId}/comments`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        toast.error(
          data.message || "Unable to add comment",
        );
        return;
      }

      console.log(data);

      /*
       * If your backend returns the newly created comment,
       * add it directly to the current post.
       */
      if (data.comment) {
        setPost((prevPost) => ({
          ...prevPost,
          comments: [
            ...prevPost.comments,
            data.comment,
          ],
        }));
      } else {
        /*
         * If your backend only returns success/message,
         * reload the post so the new comment appears.
         */
        const refreshResponse = await fetch(
          `https://pingup-backend-q5c9.onrender.com/auth/post/${postId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const refreshData =
          await refreshResponse.json();

        if (refreshResponse.ok) {
          setPost(refreshData.post);
        }
      }

      setComment("");

      toast.success(
        data.message ||
          "Comment added successfully",
      );
    } catch (error) {
      console.log("Error adding comment:", error);
      toast.error("Unable to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleCommentLike = (commentId) => {
    console.log("Like comment:", commentId);

    // Connect your comment-like API here
  };

  return (
    <section className="min-h-full bg-[#F8FAFC] p-6">
      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <Link
          to="/pingup"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#615FFF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Feed
        </Link>

        {/* Post */}
        <div className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">

          {/* Author */}
          <div className="flex items-center justify-between">
            <Link
              to={`/pingup/profile/${post.author?._id}`}
              className="flex items-center gap-3"
            >
              <img
                src={
                  post.author?.profilePicture?.url ||
                  assets.sample_profile
                }
                alt={
                  post.author?.userName || "User"
                }
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <h2 className="font-semibold text-[#1D293D]">
                  {post.author?.firstName}{" "}
                  {post.author?.lastName}
                </h2>

                <p className="text-sm text-[#64748B]">
                  @{post.author?.userName}
                </p>
              </div>
            </Link>

            <button className="rounded-full p-2 text-[#64748B] transition hover:bg-[#F1F5F9]">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          {post.content && (
            <p className="mt-5 text-[15px] leading-7 text-[#364153]">
              {post.content}
            </p>
          )}

          {/* Images */}
          {post.image?.length > 0 && (
            <div className="mt-5 overflow-hidden rounded-2xl">
              {post.image.map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  alt="Post"
                  className="max-h-[600px] w-full object-cover"
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 flex items-center gap-7 border-t border-[#E5E7EB] pt-4">

            {/* Like */}
            <button
              onClick={handlePostLike}
              className="flex items-center gap-2 text-sm text-[#64748B] transition hover:text-red-500"
            >
              <Heart
                className={`h-5 w-5 ${
                  isPostLiked
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
              />

              <span>
                {post.likes?.length || 0}
              </span>
            </button>

            {/* Comments */}
            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <MessageCircle className="h-5 w-5" />

              <span>
                {post.comments?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-5 rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">

          {/* Comment Header */}
          <div className="mb-5 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#615FFF]" />

            <h2 className="font-semibold text-[#1D293D]">
              Comments
            </h2>

            <span className="text-sm text-[#94A3B8]">
              ({post.comments?.length || 0})
            </span>
          </div>

          {/* Add Comment */}
          <form
            onSubmit={handleCommentSubmit}
            className="mb-6 flex items-center gap-3"
          >
            <img
              src={
                profile?.profilePicture?.url ||
                assets.sample_profile
              }
              alt="You"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="flex flex-1 items-center rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2 focus-within:border-[#615FFF]">
              <input
                type="text"
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value)
                }
                placeholder="Write a comment..."
                className="flex-1 bg-transparent text-sm text-[#1D293D] outline-none placeholder:text-[#94A3B8]"
              />

              <button
                type="submit"
                disabled={
                  !comment.trim() ||
                  commentLoading
                }
                className="ml-2 rounded-full p-2 text-[#615FFF] transition hover:bg-[#EEF2FF] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-5">
            {post.comments?.length === 0 ? (
              <div className="py-10 text-center">
                <MessageCircle className="mx-auto h-10 w-10 text-[#CBD5E1]" />

                <p className="mt-3 text-sm font-medium text-[#64748B]">
                  No comments yet
                </p>

                <p className="mt-1 text-xs text-[#94A3B8]">
                  Be the first to comment on this post.
                </p>
              </div>
            ) : (
              post.comments.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3"
                >
                  {/* Avatar */}
                  <Link
                    to={`/pingup/profile/${item.user?._id}`}
                  >
                    <img
                      src={
                        item.user?.profilePicture?.url ||
                        assets.sample_profile
                      }
                      alt={
                        item.user?.userName || "User"
                      }
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">

                    {/* Comment Bubble */}
                    <div className="rounded-2xl bg-[#F8FAFC] px-4 py-3">
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/pingup/profile/${item.user?._id}`}
                          className="text-sm font-semibold text-[#1D293D] hover:text-[#615FFF]"
                        >
                          {item.user?.firstName}{" "}
                          {item.user?.lastName}
                        </Link>

                        <button className="text-[#94A3B8] hover:text-[#64748B]">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-1 text-sm leading-6 text-[#475569]">
                        {item.content}
                      </p>
                    </div>

                    {/* Comment Actions */}
                    <div className="mt-2 flex items-center gap-5 px-2">

                      <button
                        onClick={() =>
                          handleCommentLike(
                            item._id,
                          )
                        }
                        className="flex items-center gap-1.5 text-xs font-medium text-[#64748B] transition hover:text-red-500"
                      >
                        <Heart className="h-4 w-4" />

                        <span>
                          {item.likes?.length || 0}
                        </span>
                      </button>

                      <span className="text-xs text-[#94A3B8]">
                        Reply
                      </span>

                      <span className="text-xs text-[#94A3B8]">
                        {getCommentTime(
                          item.createdAt,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostDetails;