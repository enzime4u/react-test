import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import DisplayResultsView from "../components/DisplayResults/DisplayResults";
import useHistoricSearch from "../hooks/useHistorySearch";

import { SearchView } from "../components/SearchView/SearchView";

const AppRouter: React.FC = () => {
  const { searchHistory, addSearchHistory, removeSearchHistory } =
    useHistoricSearch();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SearchView
              searchHistory={searchHistory}
              addSearchHistory={addSearchHistory}
              removeSearchHistory={removeSearchHistory}
            />
          }
        />
        <Route path="/data" element={<DisplayResultsView removeSearchHistory={removeSearchHistory} />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
