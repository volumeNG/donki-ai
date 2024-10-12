"use client";

import { useState } from "react";

export default function Toggle() {
  const [isDay, setIsDay] = useState(false);

  const toggleTheme = () => {
    setIsDay(!isDay);
  };

  return (
    <div
      className={`tdnn ${isDay ? "day" : "night"} relative mx-auto mt-40 h-[16em] w-[30em] cursor-pointer rounded-[16em] transition-all duration-500 ease-in-out`}
      onClick={toggleTheme}
    >
      <div
        className={`moon ${isDay ? "sun" : ""} duration-400 absolute rounded-full transition-all ease-in-out ${isDay ? "top-18 left-[18em] h-[7em] w-[7em] rotate-0 bg-white" : "bg-bgNight left-12 top-12 h-[10em] w-[10em] rotate-[-75deg] shadow-[3em_2.5em_0_0em_inset_var(--tw-shadow-color)]"}`}
      ></div>
    </div>
  );
}
