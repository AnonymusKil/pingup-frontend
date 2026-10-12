import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { ArrowBigRightDash } from "lucide-react";

function SignUpForm() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://pingup-backend-q5c9.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            userName,
            email,
            password,
            dateOfBirth,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        toast.error(data.message || "Unable to create account");
        return;
      }

      console.log(data);
      toast.success(data.message || "Account created successfully!");
      navigate("/pingup", { replace: true });
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <form onSubmit={handleSignup} className="text-left">
      <label htmlFor="email" className="block font-bold text-[#212126]">
        Email address
      </label>

      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-3.5 w-full rounded-md border border-gray-200 p-2 outline-none transition focus:border-[#372AAC]"
      />

      <label
        htmlFor="firstName"
        className="mt-4 block font-bold text-[#212126]"
      >
        First Name
      </label>

      <input
        id="firstName"
        name="firstName"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="mt-3.5 w-full rounded-md border border-gray-200 p-2 outline-none transition focus:border-[#372AAC]"
      />

      <label htmlFor="lastName" className="mt-4 block font-bold text-[#212126]">
        Last Name
      </label>

      <input
        id="lastName"
        name="lastName"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="mt-3.5 w-full rounded-md border border-gray-200 p-2 outline-none transition focus:border-[#372AAC]"
      />

      <label htmlFor="userName" className="mt-4 block font-bold text-[#212126]">
        User Name
      </label>

      <input
        id="userName"
        name="userName"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="mt-3.5 w-full rounded-md border border-gray-200 p-2 outline-none transition focus:border-[#372AAC]"
      />

      <label
        htmlFor="dateOfBirth"
        className="mt-4 block font-bold text-[#212126]"
      >
        Date of Birth
      </label>

      <input
        id="dateOfBirth"
        name="dateOfBirth"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
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
        Create Account
        <ArrowBigRightDash size={20} />
      </button>
    </form>
  );
}

export default SignUpForm;
