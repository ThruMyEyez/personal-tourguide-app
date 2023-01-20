import React from "react";

const Bio = ({ bio }) => {
  return (
    <div className="items-center  bg-white my-12 pb-6 w-full  justify-center shadow-xl  overflow-hidden rounded-lg  mx-auto  flex-col  md:max-w-screen-md ">
      <div className="w-full flex flex-col ">
        <div className="flex-1 bg-white rounded-lg  p-8">
          <h4 className="text-xl text-gray-900 font-bold">About Me</h4>

          <p className="font-bold text-justify text-gray-400 ">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
