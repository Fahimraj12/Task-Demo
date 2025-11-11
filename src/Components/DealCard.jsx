import React from 'react';

const DealCard = ({ deal }) => {
  const getImageUrl = () => {
    if (!deal.DealImage || deal.DealImage.trim() === '') return null;
    // Try shop-specific deal image path
    return `https://www.foodchow.com/images/shop/3161/deal/${deal.DealImage}`;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-orange-200">
      <div className="relative">
        {/* Deal Badge */}
        <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
          🎉 Special Deal
        </div>

        {/* Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={deal.DealName}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=🎉+${encodeURIComponent(deal.DealName)}&size=400&background=dc2626&color=fff&bold=true`;
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
            <span className="text-white text-6xl">🍔</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Deal Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {deal.DealName}
        </h3>

        {/* Deal Description */}
        {deal.DealDesc && (
          <p className="text-sm text-gray-600 mb-3">
            {deal.DealDesc}
          </p>
        )}

        {/* Price Section */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-red-600">
              ₹{deal.DealPrice}
            </span>
            {deal.DealMRP > deal.DealPrice && (
              <span className="ml-2 text-gray-500 line-through text-sm">
                ₹{deal.DealMRP}
              </span>
            )}
          </div>
          {deal.DealMRP > deal.DealPrice && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              SAVE ₹{deal.DealMRP - deal.DealPrice}
            </span>
          )}
        </div>

        {/* Order Method */}
        <div className="flex flex-wrap gap-2 mb-3">
          {deal.OrderMethod && deal.OrderMethod.includes('1') && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              🛵 Delivery
            </span>
          )}
          {deal.OrderMethod && deal.OrderMethod.includes('2') && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              🛍️ Takeaway
            </span>
          )}
          {deal.OrderMethod && deal.OrderMethod.includes('5') && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
              🍽️ Dine-in
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-bold transition-colors duration-200">
          Add Deal to Cart
        </button>

        {/* Min Order Info */}
        {deal.DealMinOrder > 0 && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Minimum {deal.DealMinOrder} order(s) required
          </p>
        )}
      </div>
    </div>
  );
};

export default DealCard;
