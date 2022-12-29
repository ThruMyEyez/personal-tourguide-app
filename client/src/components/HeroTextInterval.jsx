import { useState } from "react";
import { useInterval } from "react-use";

const HeroTextInterval = ({ title, strings }) => {
  const [currentString, setCurrentString] = useState(0);

  useInterval(() => {
    setCurrentString(strings.length - 1 === currentString ? 0 : currentString + 1);
  }, 1000);

  return (
    <div className="flex flex-col items-center font-extrabold whitespace-pre sm:text-2xl">
      <div className="bg-[url('../assets/topography.svg')] bg-cover text-center">
        <p className="text-md">{title}</p>
        {strings.map((string, idx) => {
          return (
            <span key={string} className="relative block text-center">
              <span
                className={`text-6xl md:text-7xl lg:text-8xl absolute transition duration-1000 ${
                  currentString !== idx ? "opacity-100" : "opacity-0"
                }`}
              >
                {string}
              </span>

              <span
                className={`text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r ${
                  (idx === 0 && "from-yellow-400 via-red-500 to-pink-500") ||
                  (idx === 1 && idx === 1 && "from-purple-400 via-pink-500 to-red-500") ||
                  (idx === 2 && "from-green-400 to-blue-500")
                }`}
              >
                {string}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default HeroTextInterval;
