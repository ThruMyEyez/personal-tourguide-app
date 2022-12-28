const OnSuccessAlert = ({ msg }) => {
  return (
    <div
      className="flex items-center px-3 py-2 mb-2 text-sm text-green-900 bg-green-100 border border-green-200 rounded-md"
      role="alert"
    >
      <div className="w-4 mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
      </div>
      <span>{msg}</span>
    </div>
  );
};

const OnErrorAlert = ({ msg }) => {
  return (
    <div
      className="flex items-center px-3 py-2 mb-2 text-sm text-red-900 bg-red-100 border border-red-200 rounded-md"
      role="alert"
    >
      <div className="w-4 mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
          />
        </svg>
      </div>
      <span>{msg}</span>
    </div>
  );
};

const OnWarningAlert = ({ msg }) => {
  return (
    <div
      className="flex items-center px-3 py-2 mb-2 text-sm text-yellow-900 bg-yellow-100 border border-yellow-200 rounded-md"
      role="alert"
    >
      <div className="w-4 mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <span>{msg}</span>
    </div>
  );
};

export { OnSuccessAlert, OnErrorAlert, OnWarningAlert };
