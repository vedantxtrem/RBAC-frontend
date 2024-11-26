import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-50 to-yellow-100 text-gray-700">
      <div className="w-full flex flex-col justify-center items-center p-10">
      <img className='w-full md:w-[300px] border-4 border-amber-400 mb-10' src="/assets/not.gif" alt="" />

        {/* <h1 className="text-6xl font-extrabold">404</h1> */}
        <p className="mt-2 text-lg text-center">Oops! The page you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
