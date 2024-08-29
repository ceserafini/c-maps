import React from 'react';
import { AiFillEnvironment } from 'react-icons/ai'; // Import the Ant Design icon

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-r-4 border-blue-500 border-opacity-75"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="rounded-full h-12 w-12 bg-blue-500 flex justify-center items-center text-white">
            <AiFillEnvironment className="text-2xl" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading map...</p>
    </div>
  );
};

export default Loader;
