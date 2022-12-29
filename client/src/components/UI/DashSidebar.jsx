import { useState } from "react";
import SidebarMenublock from "./SidebarMenublock";
import chevronRight from "../../assets/right-thin-chevron-svgrepo-com.svg";

const DashSidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${open ? "w-72" : "w-20"} h-screen  pt-8 relative duration-300 bg-gray-500`}
    >
      <img
        src={chevronRight}
        alt="Control"
        className={`absolute cursor-pointer -right-4 top-9 w-7 border-gray-500 bg-gray-500
   border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      {/* Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-white h-9 w-9"
      >
        <path
          fillRule="evenodd"
          d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
          clipRule="evenodd"
        />
        <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
      </svg>

      {/* Logo end*/}

      <div className="flex flex-col items-center justify-center gap-x-4">
        <div className="relative flex items-center justify-center w-12 h-12 text-xl text-white uppercase bg-blue-500 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
        {/* Menu Block */}
        <SidebarMenublock sidebarOpenState={open} menuTitle="Dash Menu" />
        {/* Menu Block */}
      </div>
    </div>
  );
};

export default DashSidebar;
