import { ArrowBigRightDash } from "lucide-react";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function AuthCard({ isSignIn, setIsSignIn }) {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">

      <h2 className="text-[17px] font-bold text-[#212126]">
        {isSignIn ? "Sign in to PingUp" : "Sign up to PingUp"}
      </h2>

      <p className="mt-2 text-[13px] text-gray-500">
        {isSignIn
          ? "Welcome back! Please sign in to continue"
          : "Welcome! Please sign up to continue"}
      </p>

      <div className="mt-6">
        {isSignIn ? <SignInForm /> : <SignUpForm />}
      </div>

      <div className="mt-6 border-t border-gray-100 pt-5 text-sm text-gray-500">
        {isSignIn ? (
          <p>
            Don't have an account?

            <button
              className="ml-1 cursor-pointer font-semibold text-[#372AAC] hover:underline"
              onClick={() => setIsSignIn(false)}
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?

            <button
              className="ml-1 cursor-pointer font-semibold text-[#372AAC] hover:underline"
              onClick={() => setIsSignIn(true)}
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthCard;