import React from "react";

const Bio = ({ bio }) => {
  return (
    <div>
      <h1 className="text-lg text-center font-semibold">About Me</h1>
      <p className="text-sm text-gray-600 text-center">{bio}</p>
    </div>
  );
};

export default Bio;
