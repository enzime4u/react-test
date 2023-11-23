import React from "react";

const LoadingSkeleton = ({ numRows = 5 }) => {
  const skeletonRows = Array.from({ length: numRows }, (_, index) => (
    <div key={index} className="flex items-center space-x-4 my-4">
      <div className="loader ease-linear border-4 border-t-4 border-gray-200 h-12 w-16"></div>
      <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
    </div>
  ));

  return (
    <div>
      <div className="text-center text-gray-600">Loading...</div>
      {skeletonRows}
    </div>
  );
};

export default LoadingSkeleton;
