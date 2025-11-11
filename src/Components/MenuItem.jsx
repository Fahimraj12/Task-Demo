import React from "react";

const MenuItem = ({ item, onAddToCart }) => {
  // Get the price - handle both single price and size-based pricing
  const getPrice = () => {
    if (item.Price) return item.Price;
    if (item.SizeListWidget && item.SizeListWidget.length > 0) {
      const prices = item.SizeListWidget.map((s) => s.Price);
      return Math.min(...prices);
    }
    return 0;
  };

  // Get image URL
  const getImageUrl = () => {
    if (!item.ItemImage || item.ItemImage.trim() === "") return null;
    return `https://www.foodchow.com/images/shop/3161/${item.ItemImage}`;
  };

  // Generate a food-themed placeholder based on item name
  const getPlaceholder = () => {
    const foodEmojis = ["", "", "", "", "", "", "", "", "", ""];
    const hash = item.ItemName.split("").reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const emoji = foodEmojis[hash % foodEmojis.length];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      emoji
    )}&size=300&background=f87171&color=fff&bold=true&font-size=0.6`;
  };

  const imageUrl = getImageUrl();
  const price = getPrice();

  const handleAddToCart = () => {
    onAddToCart({
      name: item.ItemName,
      price: price,
      quantity: 1,
      image: imageUrl,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl || getPlaceholder()}
          alt={item.ItemName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getPlaceholder();
          }}
        />
        {item.mark_sold_out === 1 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Item Name */}
        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
          {item.ItemName}
        </h3>

        {/* Description */}
        {item.Description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {item.Description}
          </p>
        )}

        <div className="mt-auto">
          {/* Price and Add Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-800">
                Rs.{price.toFixed(2)}
              </span>
              {item.IsSizeAvailable === 1 && (
                <span className="text-xs text-gray-500 block">
                  Multiple sizes
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={item.mark_sold_out === 1}
              className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-1.5 rounded-full font-semibold transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + ADD
            </button>
          </div>
        </div>

        {/* Tags */}
        {item.IsVeg !== undefined && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            {item.IsVeg === 1 ? (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                </div>
                <span>Vegetarian</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs text-red-600">
                <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                </div>
                <span>Non-Vegetarian</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
