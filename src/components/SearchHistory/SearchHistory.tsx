import React, { useCallback } from "react";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

const SearchHistory = ({
  removeSearchHistory,
  searchHistory,
}: {
  removeSearchHistory: (postcode: string) => void;
  searchHistory: string[];
}) => {
  const navigate = useNavigate();

  const onClick = useCallback(
    (postcode: string) => {
      if (postcode) {
        navigate("/data?postcode=" + postcode, { replace: true });
      }
    },
    [navigate]
  );

  return (
    <div className="historic-search mt-5">
      <h2>Search History</h2>
      <ul className="border">
        {searchHistory?.map((postcode: string, i: number) => (
          <li className="border p-2" key={i}>
            <Chip
              label={postcode}
              variant="outlined"
              onDelete={() => removeSearchHistory(postcode)}
              onClick={() => onClick(postcode)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
