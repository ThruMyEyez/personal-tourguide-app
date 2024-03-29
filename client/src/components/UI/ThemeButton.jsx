import { MoonStars, Sun } from "phosphor-react";
import React, { useContext } from "react";
import { ThemeContext } from "./../../context/theme";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button className="text-3xl text-black" onClick={toggleTheme}>
      {theme === "light" ? (
        <MoonStars className="text-indigo-500 hover:rotate-12" />
      ) : (
        <Sun className="text-pink-500 hover:rotate-12" />
      )}
    </button>
  );
};

export default ThemeButton;
