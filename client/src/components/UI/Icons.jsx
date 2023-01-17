import {
  MapTrifold,
  LineSegments,
  Storefront,
  IdentificationBadge,
  Ticket,
  Tag,
  Mountains,
  Money,
} from "phosphor-react";

const IconUndo = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
    </svg>
  );
};

const IconRedo = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path d="M18.4 10.6C16.55 9 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 017.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
    </svg>
  );
};

function IconBxBold(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path d="M17.061 11.22A4.46 4.46 0 0018 8.5C18 6.019 15.981 4 13.5 4H6v15h8c2.481 0 4.5-2.019 4.5-4.5a4.48 4.48 0 00-1.439-3.28zM13.5 7c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5H9V7h4.5zm.5 9H9v-3h5c.827 0 1.5.673 1.5 1.5S14.827 16 14 16z" />
    </svg>
  );
}

function IconFormatItalic(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.49 5.458h6l-.711 1.87h-2l-3.558 9.345h2l-.711 1.87h-6l.711-1.87h2l3.558-9.346h-2l.711-1.869z"
      />
    </svg>
  );
}

const IconBxStrikethrough = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path d="M20 11h-8c-4 0-4-1.816-4-2.5C8 7.882 8 6 12 6c2.8 0 2.99 1.678 3 2.014L16 8h1c0-1.384-1.045-4-5-4-5.416 0-6 3.147-6 4.5 0 .728.148 1.667.736 2.5H4v2h16v-2zm-8 7c-3.793 0-3.99-1.815-4-2H6c0 .04.069 4 6 4 5.221 0 6-2.819 6-4.5 0-.146-.009-.317-.028-.5h-2.006c.032.2.034.376.034.5 0 .684 0 2.5-4 2.5z" />
    </svg>
  );
};

const IconBxUnderline = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path d="M5 18h14v2H5zM6 4v6c0 3.309 2.691 6 6 6s6-2.691 6-6V4h-2v6c0 2.206-1.794 4-4 4s-4-1.794-4-4V4H6z" />
    </svg>
  );
};

const IconTextCenter = (props) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"
      />
    </svg>
  );
};

const IconTextRight = (props) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M6 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm4-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"
      />
    </svg>
  );
};

const IconTextLeft = (props) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M2 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"
      />
    </svg>
  );
};

const IconOrderedList = (props) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path d="M920 760H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-568H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM216 712H100c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h72.4v20.5h-35.7c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h35.7V838H100c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h116c2.2 0 4-1.8 4-4V716c0-2.2-1.8-4-4-4zM100 188h38v120c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V152c0-4.4-3.6-8-8-8h-78c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4zm116 240H100c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4h68.4l-70.3 77.7a8.3 8.3 0 00-2.1 5.4V592c0 2.2 1.8 4 4 4h116c2.2 0 4-1.8 4-4v-36c0-2.2-1.8-4-4-4h-68.4l70.3-77.7a8.3 8.3 0 002.1-5.4V432c0-2.2-1.8-4-4-4z" />
    </svg>
  );
};

function IconList(props) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height={props.height || "1em"}
      width={props.width || "1em"}
      {...props}
    >
      <path d="M40 48c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zm152 16c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zm24 136c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24H40z" />
    </svg>
  );
}

// Map and Location related icons
const IconMapLocationDot = (props) => {
  return (
    <svg viewBox="0 0 576 512" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M408 120c0 54.6-73.1 151.9-105.2 192-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120 168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6.5-1.2 1-2.5 1.5-3.7l116-46.4c15.8-6.3 32.9 5.3 32.9 22.3v270.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zm-278.4-62.1c2.4 14.1 7.2 28.3 12.8 41.5 2.9 6.8 6.1 13.7 9.6 20.6v251.4L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77v249.3l-192-54.9V255c20.5 31.3 42.3 59.6 56.2 77 20.5 25.6 59.1 25.6 79.6 0zM288 152c22.1 0 40-17.9 40-40s-17.9-40-40-40-40 17.9-40 40 17.9 40 40 40z" />
    </svg>
  );
};

const IconMapLocationPlus = (props) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M12 22s8.029-5.56 8-12c0-4.411-3.589-8-8-8S4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22zM8 9h3V6h2v3h3v2h-3v3h-2v-3H8V9z" />
    </svg>
  );
};

const IconMapEditLocation = (props) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zM9.799 14.987H8v-1.799l4.977-4.97 1.799 1.799-4.977 4.97zm5.824-5.817l-1.799-1.799L15.196 6l1.799 1.799-1.372 1.371z" />
    </svg>
  );
};

const IconMapLocation = (props) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M10 20S3 10.87 3 7a7 7 0 1114 0c0 3.87-7 13-7 13zm0-11a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  );
};

const MapIcon = () => {
  return (
    <>
      <MapTrifold size={24} weight="duotone" />
    </>
  );
};

const EventItemIcon = () => {
  return (
    <>
      <LineSegments size={24} weight="duotone" />
    </>
  );
};

const OfferingsIcon = () => {
  return (
    <>
      <Storefront size={24} weight="duotone" />
    </>
  );
};

const ProviderUserIcon = () => {
  return (
    <>
      <IdentificationBadge size={24} weight="duotone" />
    </>
  );
};

const ProviderOffersIcon = () => {
  return (
    <>
      <Ticket size={24} weight="duotone" />
    </>
  );
};

const OfferTagIcon = () => {
  return (
    <>
      <Tag size={24} weight="duotone" />
    </>
  );
};

const TourEventIcon = () => {
  return (
    <>
      <Mountains size={24} weight="duotone" />
    </>
  );
};

const MoneyIcon = () => {
  return (
    <>
      <Money size={24} weight="duotone" />
    </>
  );
};

// <Fire size={24} />
export {
  IconUndo,
  IconRedo,
  IconBxBold,
  IconFormatItalic,
  IconBxStrikethrough,
  IconBxUnderline,
  IconTextRight,
  IconTextCenter,
  IconTextLeft,
  IconOrderedList,
  IconList,
  IconMapLocationDot,
  IconMapLocationPlus,
  IconMapEditLocation,
  IconMapLocation,
  //phosphor-react from here
  MapIcon,
  EventItemIcon,
  OfferingsIcon,
  ProviderUserIcon,
  ProviderOffersIcon,
  OfferTagIcon,
  TourEventIcon,
  MoneyIcon,
};
