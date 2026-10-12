import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import getAuthenticatedUser from "../../services/auth";

import { Image } from "lucide-react";
function CreatePost() {
  const [filePreviews, setFilePreviews] = useState([]);
  const [user, setUser] = useState();
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState([]);
  useEffect(() => {
    const loadProfile = async () => {
      const authenticatedUser = await getAuthenticatedUser();
      setUser(authenticatedUser);
    };
    loadProfile();
  }, []);
  const createPost = async () => {
    const formData = new FormData();
    formData.append("content", content);
    postImage.forEach((file) => {
      formData.append("postPicture", file);
    });
    const response = await fetch(
      "https://pingup-backend-q5c9.onrender.com/auth/posts",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );
    

    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      toast.error(data.message || "Unable to Post");
      return;
    }
    toast.success(data.message || "Post created successfully!");

    console.log(data);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));

    setPostImage(files);
    setFilePreviews(previews);
  };
  return (
    <section className="bg-[#F8FAFC] p-8 ml-5">
      <h1 className="text-3xl font-bold text-black mb-2">Create Post</h1>
      <p>Share your thoughts with the world!</p>
      <div className="flex items-center gap-2 mt-4">
        <div>
          <img
            className="h-10 w-10 shrink-0 rounded-full"
            src={user?.profilePicture?.url}
            alt="John Warren"
          />
        </div>
        <div>
          <p className="truncate font-medium text-[#000000]">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="truncate text-sm font-normal text-[#6A7282]">
            {user?.userName}{" "}
          </p>
        </div>
      </div>

      <textarea
        id="post-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        name="content"
        rows="4"
        placeholder="What's happening?"
        className="w-full resize-none border-0 border-b border-[#D1D5DB] bg-white p-3 text-[#212126] outline-none placeholder:text-[#99A1AF] focus:border-[#615FFF] mt-8"
      />
      <div className="mt-4 flex items-center justify-between">
        <div>
          <label
            htmlFor="picture"
            className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-[#615FFF] hover:bg-[#EEF2FF]"
          >
            {filePreviews.length > 0 ? (
              <div
                className={`mt-4 grid gap-2 ${
                  filePreviews.length === 1 ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {filePreviews.slice(0, 4).map((preview, index) => (
                  <div key={preview} className="relative">
                    <img
                      src={preview}
                      alt="Post preview"
                      className={`h-64 w-full rounded-lg object-cover ${
                        filePreviews.length === 3 && index === 2
                          ? "col-span-2"
                          : ""
                      }`}
                    />

                    {filePreviews.length > 4 && index === 3 && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                        <span className="text-2xl font-bold text-white">
                          +{filePreviews.length - 4} more
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Image className="h-5 w-5" />
            )}
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <button
          onClick={createPost}
          className="flex items-center gap-2 rounded-lg bg-linear-to-r from-[#615FFF] to-[#9810FA] px-4 py-2 text-white cursor-pointer"
        >
          Publish Post
        </button>
      </div>
    </section>
  );
}

export default CreatePost;
