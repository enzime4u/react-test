import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchHistory from "../SearchHistory/SearchHistory";

export const SearchView = ({
    addSearchHistory,
    removeSearchHistory,
    searchHistory,
}: {
    addSearchHistory: (postcode: string) => void;
    removeSearchHistory: (postcode: string) => void;
    searchHistory: string[];
}) => {
    return (
        <>
            <SearchBar addSearchHistory={addSearchHistory} />
            <div className="row align-center flex justify-around gap-20 p-20">
                <SearchHistory
                    removeSearchHistory={removeSearchHistory}
                    searchHistory={searchHistory}
                />
            </div>
        </>
    );
};
