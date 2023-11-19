import React, { useState, useEffect, useCallback, useMemo } from "react";
import CrimeTable from "../CrimeTable/CrimeTable";
import Map from "../Map/Map";
import { fetchCrimeData } from "../../api/crimeDataApi";
import { fetchPostcodeData } from "../../api/postCodeApi";
import { useSearchParams, Link } from "react-router-dom";

const DisplayResultsView = ({ removeSearchHistory }: { removeSearchHistory: (postcode: string) => void }) => {
  const [params] = useSearchParams();
  const postcode = params.get("postcode") || "";
  const [selectedCrimeData, setSelectedCrimeData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  // we memoize the value of the categories so that we don't have to recalculate it every time
  const dataCrimeCategories = useMemo(
    // we use a set to remove duplicates
    () => [...new Set(selectedCrimeData.map((crime) => crime.category))],
    [selectedCrimeData],
  );

  const [categorySelected, setCategorySelected] = useState<string>(
    dataCrimeCategories[0],
  );

  // when selectedCrimeData changes, we want to reset the categorySelected to the first category
  useEffect(
    () => setCategorySelected(dataCrimeCategories[0]),
    [selectedCrimeData, dataCrimeCategories],
  );

  const handleSearch = useCallback(async (postcode: string): Promise<void> => {
    try {
      const postcodeData = await fetchPostcodeData(postcode);
      const { latitude, longitude } = postcodeData.data;
      const crimeData = await fetchCrimeData(latitude, longitude);
      setSelectedCrimeData(crimeData);
    } catch (error) {
      console.error("Error handling postcode data:", error);
      removeSearchHistory(postcode);
      setError("Failed to fetch postcode data");
    }
  }, []);

  useEffect(() => {
    if (postcode) {
      handleSearch(postcode);
    }
  }, [postcode, handleSearch]);

  if (!selectedCrimeData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link className="link ml-20 self-start text-pink-500 underline mt-10" to="/">
        Go back home
      </Link>
      {
        error ? (
          <div className="error text-red text-center mt-10">{error}</div>
        ) : (
          <div className="flex flex-col items-center">
            <CrimeTable
              postcode={postcode}
              selectedCrimeData={selectedCrimeData}
              categorySelected={categorySelected}
              dataCrimeCategories={dataCrimeCategories}
              setCategorySelected={setCategorySelected}
            />
            <Map postcode={postcode} categorySelected={categorySelected} selectedCrimeData={selectedCrimeData} />
          </div>
        )
      }
    </div>
  );
}

export default DisplayResultsView;
