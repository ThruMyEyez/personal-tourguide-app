import { useState } from "react";
import { Link } from "react-router-dom";

const SidebarMenublock = ({ sidebarOpenState, menuTitle, MenuTitleIcon, links }) => {
  const [open, setOpen] = useState(false);

  return (
    <ul className="flex-1 block min-w-full pb-3 mx-0 mt-3 overflow-y-auto">
      <li
        className={`relative z-0 mx-3 overflow-hidden transition duration-500 ease-in-out rounded-lg ${
          open && "bg-gray-700 bg-opacity-60"
        }`}
      >
        <div
          className="flex items-center h-10 px-3 py-px text-gray-100 truncate transition-all duration-150 ease-in-out outline-none cursor-pointer hover:text-white focus:text-opacity-100 "
          onClick={() => setOpen(!open)}
        >
          <span className="">
            {(!MenuTitleIcon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
              </svg>
            )) || <MenuTitleIcon />}
          </span>
          {sidebarOpenState && <span className="mx-4 leading-none">{menuTitle}</span>}
          <span
            className={`transition duration-150 ease-in transform ${
              open ? "rotate-0" : "rotate-180"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <div
            className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden"
            duration="850"
            color="#fff"
          ></div>
        </div>
        {/* Submenu */}
        <div className={`${open ? "block" : "hidden"} rah-static rah-static--height-auto}`}>
          <div>
            <ul className="overflow-hidden">
              {links?.map(({ title, url, Icon, location }) => {
                return (
                  <li
                    key={title}
                    className="relative z-0 -ml-px overflow-hidden transition duration-500 ease-in-out rounded-lg"
                  >
                    <Link
                      state={location && { background: location }}
                      className="flex items-center h-10 px-3 py-px text-gray-300 truncate transition-all duration-150 ease-in-out outline-none cursor-pointer hover:text-white focus:text-opacity-100"
                      to={url}
                    >
                      {(!Icon && <span></span>) || (
                        <span>
                          <Icon />
                        </span>
                      )}
                      {sidebarOpenState && <span className="leading-none">{title}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default SidebarMenublock;
