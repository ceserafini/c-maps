import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-gray-800 via-gray-700 to-transparent bg-opacity-60 text-white text-xs sm:text-sm p-3 sm:p-4 text-center z-[1000]">
      <p className="opacity-90 tracking-wide">
        C-Maps Project | © 2024 | Developed by{' '}
        <a href="https://github.com/ceserafini/c-maps" className="text-blue-400 hover:text-blue-500 transition-colors duration-200">
          Cecilia Serafini
        </a>
      </p>
    </div>
  );
};

export default Footer;
