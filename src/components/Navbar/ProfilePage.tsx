import React from "react";
import { useLocation } from "react-router-dom";

function ProfilePage() {
  const location = useLocation();
  const username = location.state?.username || "Guest"; // Get username from state

  return (
    <div className="max-w-7xl m-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-blue-600">Welcome, {username}</h1>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700">Your Profile</h2>
        <p className="mt-2 text-lg text-gray-600">Username: <span className="font-semibold">{username}</span></p>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Categories</h3>
          <ul className="mt-4 space-y-2">
            <li className="p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-300">Category 1</li>
            <li className="p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-300">Category 2</li>
            <li className="p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-300">Category 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
