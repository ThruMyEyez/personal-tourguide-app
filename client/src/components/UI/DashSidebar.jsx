import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SidebarMenublock from "./SidebarMenublock";
import chevronRight from "../../assets/right-thin-chevron-svgrepo-com.svg";

import {
  IconMapLocationDot,
  IconMapLocationPlus,
  IconMapLocation,
  MapIcon,
  EventItemIcon,
  OfferingsIcon,
  ProviderUserIcon,
  ProviderOffersIcon,
  OfferTagIcon,
  TourEventIcon,
  MoneyIcon,
} from "./Icons";

// menuLinks could be serving well for user profile?
const menuLinks = [
  {
    title: "Public Profile",
    url: "/dashboard/profile",
    Icon: ProviderUserIcon,
    tooltip: "Profile",
  },
  {
    title: "Edit Profile",
    url: "/dashboard/profile/edit",
    Icon: ProviderUserIcon,
    tooltip: "Edit Profile",
  },
  {
    title: "Booked Tours",
    url: "/",
    Icon: MoneyIcon,
    tooltip: "Show Sales",
  },
];
// contains the Product dashboard Links
const productLinks = [
  {
    title: "New Offer",
    url: "/dashboard/new-offering",
    Icon: OfferTagIcon,
    tooltip: "New Offer",
  },
  {
    title: "My Offerings",
    url: "/dashboard/my-offerings",
    Icon: ProviderOffersIcon,
    tooltip: "Offers",
  },
];
// contains the productItem dashboard Links
const eventLinks = [
  {
    title: "My Events & Tours",
    url: "/dashboard/my-events",
    Icon: TourEventIcon,
    tooltip: "Events",
  },
  {
    title: "New Tour/Event",
    url: "/dashboard/new-event",
    Icon: IconMapLocationDot,
  },
];
// contains the places managing dashboard Links
const placesLinks = [
  {
    title: "Places",
    url: "/dashboard/places",
    Icon: IconMapLocation,
    tooltip: "Places",
  },
  {
    title: "Create",
    url: "/dashboard/place/create",
    Icon: IconMapLocationPlus,
    tooltip: "Create",
  },
];

const DashSidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // BUG: It gets always only /dashboard/ as location
    // To get the current location for the Modal component background
    placesLinks[1].location = location;
  }, []);

  return (
    <div
      className={`${
        open ? "w-72" : "w-26"
      }  pt-8 relative  bg-gradient-to-bl from-indigo-300 via-indigo-300 to-violet-100`}
    >
      <img
        src={chevronRight}
        alt="Control"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-gray-500 bg-gray-500
   border-2 rounded-full transition duration-100 ease-linear ${
     !open && "rotate-180"
   }`}
        onClick={() => setOpen(!open)}
      />

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
        <SidebarMenublock
          sidebarOpenState={open}
          menuTitle="User Menu"
          links={menuLinks}
        />
        {/* TODO: Make this viewable only for providers/Admins */}
        {/* Product handling menu */}
        <SidebarMenublock
          sidebarOpenState={open}
          menuTitle="Tour & Event Offers"
          links={productLinks}
          MenuTitleIcon={OfferingsIcon}
        />
        {/* Event & Tour handling menu */}
        <SidebarMenublock
          sidebarOpenState={open}
          menuTitle="Events & Tours"
          links={eventLinks}
          MenuTitleIcon={EventItemIcon}
        />
        <SidebarMenublock
          sidebarOpenState={open}
          menuTitle="Places Menu"
          links={placesLinks}
          MenuTitleIcon={MapIcon}
        />
      </div>
    </div>
  );
};

export default DashSidebar;
