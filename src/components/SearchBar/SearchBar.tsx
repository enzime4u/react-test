import React, { useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";


const SearchBar = ({
  addSearchHistory,
}: {
  addSearchHistory: (postcode: string) => void;
}) => {
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { postcode } = useParams();

  const handleClick = useCallback(() => {
    if (input.current) {
      addSearchHistory(input.current.value);
      navigate("/data?postcode=" + input.current.value, { replace: true });
    }
  }, [addSearchHistory, navigate]);

  return (
    <div className="search-bar mt-10 flex justify-center">
      <input
        ref={input}
        type="text"
        defaultValue={postcode}
        placeholder="Enter postcode"
        className="h-10 w-64 rounded-lg border-2 border-gray-300 bg-white px-5 text-sm focus:outline-none"
      />
      <button
        className="ml-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
