import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center animate-fade-in">
        {user ? (
          <>
            <h1 className="text-3xl font-bold text-blue-700 mb-4 animate-bounce">
              Welcome, {user.firstname} {user.lastname}! 🎉
            </h1>
            <p className="text-gray-700 text-lg">
              📧 <span className="font-medium">{user.email}</span>
            </p>
            <p className="mt-4 text-sm text-gray-500">
              You are successfully logged in 🚀
            </p>
          </>
        ) : (
          <p className="text-xl font-semibold text-red-600 animate-pulse">
            ⚠️ You are not logged in
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
