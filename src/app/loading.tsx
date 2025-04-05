import React from "react";

export default function Skeleton() {
  return (
    <div className=" min-h-screen space-y-6 p-6 animate-pulse">
      {/* Hero Section */}
      <div className="h-64 w-full bg-gray-300 rounded-md"></div>
      
      {/* Intro Section */}
      <div className="h-12 w-3/4 bg-gray-300 rounded-md"></div>
      <div className="h-6 w-1/2 bg-gray-300 rounded-md"></div>
      
      {/* Features Section */}
      <div className="grid grid-cols-3 gap-4">
        <div className="h-40 bg-gray-300 rounded-md"></div>
        <div className="h-40 bg-gray-300 rounded-md"></div>
        <div className="h-40 bg-gray-300 rounded-md"></div>
      </div>
      
      {/* Testimonials Section */}
      <div className="h-12 w-3/4 bg-gray-300 rounded-md"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-24 bg-gray-300 rounded-md"></div>
        <div className="h-24 bg-gray-300 rounded-md"></div>
        <div className="h-24 bg-gray-300 rounded-md"></div>
      </div>
      
      {/* Community Section */}
      <div className="h-12 w-3/4 bg-gray-300 rounded-md"></div>
      <div className="grid grid-cols-4 gap-4">
        <div className="h-32 bg-gray-300 rounded-md"></div>
        <div className="h-32 bg-gray-300 rounded-md"></div>
        <div className="h-32 bg-gray-300 rounded-md"></div>
        <div className="h-32 bg-gray-300 rounded-md"></div>
      </div>
      
      {/* Events Section */}
      <div className="h-12 w-3/4 bg-gray-300 rounded-md"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-40 bg-gray-300 rounded-md"></div>
        <div className="h-40 bg-gray-300 rounded-md"></div>
        <div className="h-40 bg-gray-300 rounded-md"></div>
      </div>
      
      {/* CTA Section */}
      <div className="h-20 w-full bg-gray-300 rounded-md"></div>
    </div>
  );
};
