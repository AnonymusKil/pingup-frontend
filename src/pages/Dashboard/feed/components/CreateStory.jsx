import { useState } from "react";
import { toast } from "react-toastify";

import { ArrowLeft, Image, Video, Type, Upload, X, Check } from "lucide-react";
import { Link } from "react-router-dom";

function CreateStory() {
  const [storyType, setStoryType] = useState("text");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [storyImage, setStoryImage] = useState([]);
  const [storyVideo, setStoryVideo] = useState([]);
  const [preview, setPreview] = useState(null);
  const createStory = async () => {
    const formData = new FormData();
    formData.append("content", content);

    storyImage.forEach((file) => {
      formData.append("images", file);
    });
    storyVideo.forEach((file) => formData.append("videos", file));
    const response = await fetch(
      "https://pingup-backend-q5c9.onrender.com/auth/stories",
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

  const backgroundColors = [
    "#615FFF",
    "#0EA5E9",
    "#10B981",
    "#F97316",
    "#EC4899",
    "#111827",
  ];

  const [backgroundColor, setBackgroundColor] = useState("#615FFF");

  const handleMediaChange = (event, type) => {
    const files = Array.from(event.target.files);

    if (!files.length) return;

    setStoryType(type);

    if (type === "image") {
      setStoryImage(files);
      setStoryVideo([]);
    }

    if (type === "video") {
      setStoryVideo(files);
      setStoryImage([]);
    }

    setMedia(files);
    setPreview(URL.createObjectURL(files[0]));
  };

  const handleTextMode = () => {
    setStoryType("text");
    setMedia(null);
    setPreview(null);
  };

  return (
    <section className="min-h-screen bg-[#F8FAFC] px-8 py-6">
      {/* Header */}
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <Link
          to="/pingup"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#364153] shadow-sm transition hover:bg-[#EEF2FF]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Create Story</h1>
          <p className="text-sm text-[#6A7282]">
            Share something with your connections
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-[280px_1fr] gap-8">
        {/* Controls */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[#111827]">Story Type</h2>

          <div className="mt-4 space-y-3">
            {/* Text */}
            <button
              onClick={handleTextMode}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                storyType === "text"
                  ? "border-[#615FFF] bg-[#EEF2FF]"
                  : "border-[#E5E7EB] hover:bg-[#F8FAFC]"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#615FFF] text-white">
                <Type className="h-5 w-5" />
              </div>

              <div>
                <p className="font-medium text-[#111827]">Text</p>
                <p className="text-xs text-[#6A7282]">Share a text story</p>
              </div>
            </button>

            {/* Photo */}
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                storyType === "image"
                  ? "border-[#615FFF] bg-[#EEF2FF]"
                  : "border-[#E5E7EB] hover:bg-[#F8FAFC]"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10B981] text-white">
                <Image className="h-5 w-5" />
              </div>

              <div>
                <p className="font-medium text-[#111827]">Photo</p>
                <p className="text-xs text-[#6A7282]">Upload an image</p>
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => handleMediaChange(event, "image")}
              />
            </label>

            {/* Video */}
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                storyType === "video"
                  ? "border-[#615FFF] bg-[#EEF2FF]"
                  : "border-[#E5E7EB] hover:bg-[#F8FAFC]"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F97316] text-white">
                <Video className="h-5 w-5" />
              </div>

              <div>
                <p className="font-medium text-[#111827]">Video</p>
                <p className="text-xs text-[#6A7282]">Upload a video</p>
              </div>

              <input
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={(event) => handleMediaChange(event, "video")}
              />
            </label>
          </div>

          {/* Text controls */}
          {storyType === "text" && (
            <div className="mt-6 border-t border-[#E5E7EB] pt-5">
              <label className="text-sm font-medium text-[#111827]">
                Your Story
              </label>

              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="What's on your mind?"
                maxLength={250}
                className="mt-2 h-28 w-full resize-none rounded-xl border border-[#E5E7EB] p-3 text-sm outline-none transition focus:border-[#615FFF]"
              />

              <p className="mt-1 text-right text-xs text-[#6A7282]">
                {content.length}/250
              </p>

              <p className="mt-5 text-sm font-medium text-[#111827]">
                Background
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {backgroundColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setBackgroundColor(color)}
                    style={{ backgroundColor: color }}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-sm ring-1 ring-[#E5E7EB] ${
                      backgroundColor === color ? "ring-2 ring-[#615FFF]" : ""
                    }`}
                  >
                    {backgroundColor === color && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected file */}
          {media && (
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#F8FAFC] p-3">
              <div className="flex items-center gap-2 overflow-hidden">
                <Upload className="h-4 w-4 shrink-0 text-[#615FFF]" />
                <p className="truncate text-sm text-[#364153]">{media.name}</p>
              </div>

              <button
                onClick={() => {
                  setMedia(null);
                  setPreview(null);
                  setStoryType("text");
                }}
                className="text-[#6A7282] hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Share */}
          <button
            onClick={createStory}
            className="mt-6 w-full rounded-xl bg-[#615FFF] py-3 font-medium text-white transition hover:bg-[#4F46E5]"
          >
            Share Story
          </button>
        </div>

        {/* Preview */}
        <div className="flex min-h-175 items-center justify-center rounded-2xl bg-[#E5E7EB] p-8">
          <div
            className="relative h-145 w-82.5 overflow-hidden rounded-2xl bg-cover bg-center shadow-xl"
            style={
              storyType === "text"
                ? { backgroundColor }
                : preview
                  ? {
                      backgroundImage:
                        storyType === "image" ? `url(${preview})` : "none",
                    }
                  : { backgroundColor: "#111827" }
            }
          >
            {/* Video */}
            {storyType === "video" && preview && (
              <video
                src={preview}
                controls
                className="h-full w-full object-cover"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Preview text */}
            {storyType === "text" && (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <p className="text-center text-2xl font-semibold leading-relaxed text-white">
                  {content || "Your story text will appear here..."}
                </p>
              </div>
            )}

            {/* Image empty state */}
            {storyType === "image" && !preview && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <Image className="h-10 w-10" />
                <p className="mt-3 text-sm">Upload a photo</p>
              </div>
            )}

            {/* User */}
            <div className="absolute left-4 top-4 z-10 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-white bg-[#D1D5DB]" />

              <div>
                <p className="text-sm font-semibold text-white">Your Story</p>
                <p className="text-xs text-white/80">Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateStory;
