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
};
