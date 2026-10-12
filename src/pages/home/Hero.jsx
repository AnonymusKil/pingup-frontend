import { assets } from "../../assets/assets";
import { Star } from "lucide-react";

function Hero() {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-2">
        <img
          className="w-20"
          src={assets.group_users}
          alt="PingUp community"
        />

        <div className="flex flex-col">
          <div className="flex">
            <Star className="fill-[#FD9A00] text-[#FD9A00]" />
            <Star className="fill-[#FD9A00] text-[#FD9A00]" />
            <Star className="fill-[#FD9A00] text-[#FD9A00]" />
            <Star className="fill-[#FD9A00] text-[#FD9A00]" />
            <Star className="fill-[#FD9A00] text-[#FD9A00]" />
          </div>

          <p className="text-[16px] text-[#1C398E]">
            Used by 12k+ developers
          </p>
        </div>
      </div>

      <h1 className="mt-3 max-w-xl bg-linear-to-r from-[#1E1A4D] to-[#372AAC] bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-6xl">
        More than just friends truly connect
      </h1>

      <p className="mt-4 max-w-2xl text-xl font-normal text-[#312C85] md:text-3xl">
        Connect with a global community on PingUp.
      </p>
    </div>
  );
}

export default Hero;