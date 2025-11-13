"use client";
import Image from "next/image";
const RoundedButton = () => {
  return (
    <>
      {/*  <button
        id="explore-btn"
        onClick={() => {
          console.log("clicked Me");
        }}
        className="px-4 py-2 bg-black-500 content-center	 min-w-max whitespace-nowrap text-white rounded-full hover:bg-blue-600 transition  mt-6 block mx-auto"
      >
        Explore More Options
        <a href="#events" className="items-center">
          <Image
            src="/icons/arrow-down.svg"
            alt="Down Arrow"
            width={24}
            height={24}
            className="inline-block ml-2"
          />
        </a>
      </button> */}

      <button
        className="
    bg-blue-500/20
    text-white
     mx-auto
     mt-10
    font-semibold
    px-6 py-2
    rounded-full
    hover:bg-blue-500/30
    transition
    dark:bg-blue-400/20
    dark:hover:bg-blue-400/30
    border border-blue-500/30
    backdrop-blur-sm
    w-fit 
  "
      >
        Semi-Transparent Button
        <a href="#events" className="items-center ">
          <Image
            src="/icons/arrow-down.svg"
            alt="Down Arrow"
            width={24}
            height={24}
            className="inline-block ml-2"
          />
        </a>
      </button>
    </>
  );
};

export default RoundedButton;
