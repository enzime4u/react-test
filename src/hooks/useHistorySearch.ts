import { useState, useEffect } from "react";



const useHistoricSearch = () => {
  const [searchHistory, setSearchHistory] =
    useState<string[]>([]);



  useEffect(() => {
    // Load search history from localStorage on component mount
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    // Save search history to localStorage whenever it changes
    if (searchHistory.length > 0) {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
  }, [searchHistory]);


  const addSearchHistory = (postcode: string) => {
    if (searchHistory.includes(postcode)) {
      return;
    }
    setSearchHistory((prevHistory) => [...prevHistory, postcode.toUpperCase()]);
  };


  const removeSearchHistory = (postcode: string) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((code) => code !== postcode),
    );
  };

  return { searchHistory, addSearchHistory, removeSearchHistory };
};

export default useHistoricSearch;
