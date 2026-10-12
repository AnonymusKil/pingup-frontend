import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import getAuthenticatedUser from "../../../services/auth";
import { ArrowLeft, Camera, Save } from "lucide-react";

function EditProfile() {
  const [user, setUser] = useState();
  const [profilePreview, setProfilePreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [bio, setBio] = useState();

  useEffect(() => {
    const loadProfile = async () => {
      const authenticatedUser = await getAuthenticatedUser();
      setUser(authenticatedUser);
      setFirstName(authenticatedUser?.firstName || "");
      setLastName(authenticatedUser?.lastName || "");
      setUserName(authenticatedUser?.userName || "");
      setBio(authenticatedUser?.bio || "");
    };
    loadProfile();
  }, []);
  const handleImageChange = (event, setPreview, setFile) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setFile(file);
  };

  const updateProfilePicture = async (file) => {
    try {
      if (!file) return;

      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await fetch(
        "https://pingup-backend-q5c9.onrender.com/auth/profile-picture",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message || "Failed to update profile picture");
        return;
      }

      console.log(data);
    } catch (error) {
      console.log("Profile picture update error:", error);
    }
  };

  const updateCoverPicture = async (file) => {
    try {
      if (!file) return;

      const formData = new FormData();
      formData.append("coverPicture", file);

      const response = await fetch(
        "https://pingup-backend-q5c9.onrender.com/auth/cover-picture",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message || "Failed to update profile picture");
        return;
      }

      console.log(data);
    } catch (error) {
      console.log("Profile picture update error:", error);
    }
  };
  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        "https://pingup-backend-q5c9.onrender.com/auth/userprofile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName,
            lastName,
            userName,
            bio,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        toast.error(data.message || "Unable to create account");
        return;
      }
      if (profileFile) {
        await updateProfilePicture(profileFile);
      }

      // Update cover picture if a new one was selected
      if (coverFile) {
        await updateCoverPicture(coverFile);
      }

      toast.success(data.message || "Account updated successfully!");
      console.log(data);
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <section className="mx-auto mt-5 max-w-3xl overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#E5E7EB] bg-white px-6 py-4">
        <Link
          to="/pingup/profile"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#4A5565] transition hover:bg-[#F8FAFC]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div>
          <h1 className="text-lg font-bold text-[#111827]">Edit Profile</h1>
          <p className="text-sm text-[#6A7282]">
            Update your profile information
          </p>
        </div>
      </div>

      {/* Cover */}
      <div className="relative h-56 w-full overflow-hidden bg-[#EEF2FF]">
        <img
          src={coverPreview || user?.coverPicture.url}
          alt="Cover preview"
          className="h-full w-full object-cover"
        />

        <label className="absolute right-4 top-4 flex cursor-pointer items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-sm font-medium text-[#364153] shadow-sm transition hover:bg-white">
          <Camera className="h-4 w-4" />
          Change cover
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) =>
              handleImageChange(event, setCoverPreview, setCoverFile)
            }
          />
        </label>
      </div>

      {/* Form */}
      <form onSubmit={updateProfile} className="bg-white px-8 pb-8">
        {/* Profile picture */}
        <div className="relative -mt-16 mb-8 w-fit">
          <img
            src={profilePreview || user?.profilePicture.url}
            alt="Profile preview"
            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
          />

          <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#615FFF] text-white shadow-md transition hover:bg-[#5048e8]">
            <Camera className="h-4 w-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) =>
                handleImageChange(event, setProfilePreview, setProfileFile)
              }
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#364153]">
              First name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none transition focus:border-[#615FFF] focus:ring-2 focus:ring-[#615FFF]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#364153]">
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none transition focus:border-[#615FFF] focus:ring-2 focus:ring-[#615FFF]/10"
            />
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#364153]">
              Username
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none transition focus:border-[#615FFF] focus:ring-2 focus:ring-[#615FFF]/10"
            />
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#364153]">
              Bio
            </label>
            <textarea
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full resize-none rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-[#615FFF] focus:ring-2 focus:ring-[#615FFF]/10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-7 flex items-center justify-end gap-3 border-t border-[#E5E7EB] pt-5">
          <Link
            to="/pingup/profile"
            className="rounded-lg border border-[#D1D5DB] px-5 py-2.5 text-sm font-medium text-[#364153] transition hover:bg-[#F8FAFC]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#615FFF] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#5048e8]"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditProfile;
