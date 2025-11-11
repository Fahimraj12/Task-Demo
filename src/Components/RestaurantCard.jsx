import React from "react";

const RestaurantCard = ({ data }) => {
  const { name, image, cuisine, rating, location } = data;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-all p-4 cursor-pointer">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-xl font-semibold mt-3">{name}</h3>
      <p className="text-gray-600 text-sm">{cuisine}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="bg-yellow-400 text-white px-2 py-1 rounded text-sm">
          ⭐ {rating}
        </span>
        <span className="text-gray-500 text-sm">{location}</span>
      </div>
    </div>
  );
};

export default RestaurantCard;
