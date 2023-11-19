import React from "react";
import "./CrimeTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

type CrimeTableProps = {
  postcode: string;
  selectedCrimeData: any[];
  dataCrimeCategories: string[];
  categorySelected: string;
  setCategorySelected: (category: string) => void;
};

const CrimeTable: React.FC<CrimeTableProps> = ({
  postcode,
  selectedCrimeData,
  dataCrimeCategories,
  categorySelected,
  setCategorySelected,
}) => {
  return (
    <div className="data-view mt-10 flex">
      <h2 className="mb-5 text-2xl font-extrabold">Data View</h2>
      <label htmlFor="category-select">Choose a crime category</label>
      <select
        className="ml-5 rounded-md border-2 border-gray-500 outline-2"
        name="crime-category"
        id="category-select"
        value={categorySelected}
        onChange={(e) => setCategorySelected(e.target.value)}
      >
        {dataCrimeCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {postcode ? (
        <DataGrid
          autoHeight
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          rows={selectedCrimeData.filter(
            (item) => item.category === categorySelected,
          )}
          columns={[
            {
              field: "postcode",
              valueGetter: () => postcode.toUpperCase(),
              headerName: "Postcode",
              width: 120,
            },
            { field: "month", headerName: "Date of Crime", width: 200 },
            {
              field: "location.street.name",
              valueGetter: (params) => params.row.location.street?.name,
              headerName: "Approximate Street Name",
              width: 200,
            },
            {
              field: "outcomeStatus",
              valueGetter: (params) => params.row.outcomeStatus || "On Going",
              headerName: "Outcome Status",
              width: 200,
            },
          ]}
        />
      ) : (
        "No data found"
      )}
    </div>
  );
};

export default CrimeTable;
