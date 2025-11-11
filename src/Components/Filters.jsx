import React from "react";

const Filters = ({
  search,
  setSearch,
  cuisine,
  setCuisine,
  location,
  setLocation,
  allCuisines,
  allLocations,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-6 py-5 bg-white shadow rounded-xl mx-auto mt-[-30px] w-[90%] relative z-10">
      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Search restaurant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {/* Cuisine Dropdown */}
      <select
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-red-500"
      >
        <option value="">All Cuisines</option>
        {allCuisines.map((c, idx) => (
          <option key={idx} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Location Dropdown */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-red-500"
      >
        <option value="">All Locations</option>
        {allLocations.map((l, idx) => (
          <option key={idx} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
