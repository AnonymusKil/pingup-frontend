import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ArrowBigRightDash } from "lucide-react";

function SignInForm() {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    console.log({
      usernameOrEmail,
      password,
    });
    try {
      const response = await fetch(
        "https://pingup-backend-q5c9.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({
            usernameOrEmail,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        toast.error(data.message || "Unable to login account");
        return;
      }

      console.log(data);
      toast.success(data.message || "Account login successfully!");
      navigate("/pingup", { replace: true });
    } catch (error) {
      console.log("Signup error:", error);
    }

  };

  return (
    <form onSubmit={handleSignin} className="text-left">
      <label
        htmlFor="usernameOrEmail"
        className="block font-bold text-[#212126]"
      >
        User Name or Email
      </label>

      <input
        id="usernameOrEmail"
        name="usernameOrEmail"
        type="text"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        className="mt-3.5 w-full rounded-md border border-gray-200 p-2 outline-none transition focus:border-[#372AAC]"
      />

      <label htmlFor="password" className="mt-4 block font-bold text-[#212126]">
        Password
      </label>

      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-3.5 w-full rounded-md border border-gray-200 p-2 outline-none transition focus:border-[#372AAC]"
      />

      <button
        type="submit"
        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#2F3037] px-2 py-2 font-bold text-white transition hover:bg-[#212126]"
      >
        Sign In
        <ArrowBigRightDash size={20} />
      </button>
    </form>
  );
}

export default SignInForm;
