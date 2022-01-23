import React from "react";

function HeroSection() {
  return (
    <div className="flex justify-between items-center bg-gradient-to-br from-[#FEB692] to-[#EA5455] py-10 lg:py-0 rounded-md shadow shadow-lg shadow-black`">
      <div className="px-10 space-y-5">
        <h1 className="text-6xl font-serif text-black max-w-xl">
          Welcome to{" "}
          <span className="underline decoration-black decoration-4 ">My</span>{" "}
          blog
        </h1>
        <h3 className="text-black">Medium inspired Blog using next.js and tailwind with sanity cms</h3>
      </div>
      <img
        src="/avatar_voxel.png"
        className="hidden md:inline-flex h-52 lg:h-[500px] py-10 pr-10 hover:scale-110 transition-all  duration-500 hover:saturate-150 saturate-[0.8] ease-in-out"
        alt=""
      />
    </div>
  );
}

export default HeroSection;
