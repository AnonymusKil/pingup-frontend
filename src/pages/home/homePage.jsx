import { useState } from "react";

import Hero from "./Hero";
import AuthCard from "./AuthCard";
import { assets } from "../../assets/assets";

function HomePage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <section
      className="min-h-screen bg-cover bg-center px-6 py-8"
      style={{ backgroundImage: `url(${assets.bgImage})` }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-11">{/* Your PingUp logo can stay here */}</div>

        <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
          <Hero />

          <AuthCard isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
        </div>
      </div>
    </section>
  );
}

export default HomePage;
