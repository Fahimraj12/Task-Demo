import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MenuItem from "../Components/MenuItem";
import Cart from "../Components/Cart";

const Home = () => {
  const [menuData, setMenuData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMenuType, setSelectedMenuType] = useState("Main Menu");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const categoryScrollRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null"
      )
      .then((res) => {
        if (res.data && res.data.data) {
          const parsedData = typeof res.data.data === 'string' 
            ? JSON.parse(res.data.data) 
            : res.data.data;
          
          setMenuData(parsedData);
          
          // Extract categories
          if (parsedData.CategoryList && Array.isArray(parsedData.CategoryList)) {
            setCategories(parsedData.CategoryList);
            // Set first category as default
            if (parsedData.CategoryList.length > 0) {
              setSelectedCategory(parsedData.CategoryList[0].CategryId);
            }
          }
          
          console.log('Menu data loaded successfully');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  // Cart functions
  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, item]);
    }
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, quantity) => {
    if (quantity === 0) {
      handleRemoveFromCart(index);
    } else {
      const newCart = [...cart];
      newCart[index].quantity = quantity;
      setCart(newCart);
    }
  };

  // Get current category data
  const getCurrentCategory = () => {
    if (!selectedCategory || !categories.length) return null;
    return categories.find(cat => cat.CategryId === selectedCategory);
  };

  // Filter items based on search
  const getFilteredItems = () => {
    const currentCat = getCurrentCategory();
    if (!currentCat || !currentCat.ItemListWidget) return [];
    
    if (!searchTerm.trim()) return currentCat.ItemListWidget;
    
    return currentCat.ItemListWidget.filter(item =>
      item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const currentCategory = getCurrentCategory();
  const filteredItems = getFilteredItems();

  const menuTypes = ["Main Menu", "Breakfast", "Drivethru"];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Restaurant Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                FC
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">FoodChow Demo India</h1>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <i className="fas fa-map-marker-alt text-red-500"></i>
                  Surat, Gujarat, India
                </p>
              </div>
            </div>

            {/* Right: Status and Actions */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right mr-4">
                <div className="text-sm font-semibold text-green-600">Restaurant Is Open</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  Timing: Open 24 Hours
                  <i className="fas fa-info-circle"></i>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Choose Service
              </button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
                Book Now
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                <i className="fas fa-globe"></i> en
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-1">
                <i className="fas fa-phone"></i> 701689342
              </button>
            </div>
          </div>
        </div>

        {/* Menu Type Tabs */}
        <div className="border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex gap-6">
              {menuTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedMenuType(type)}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                    selectedMenuType === type
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Category Scroll */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div 
              ref={categoryScrollRef}
              className="flex gap-4 overflow-x-auto py-3 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <button
                  key={category.CategryId}
                  onClick={() => setSelectedCategory(category.CategryId)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                    selectedCategory === category.CategryId
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.CategryName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading delicious menu...</p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search for dishes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Main Content - Product Grid */}
            <div className="flex-1">
              {currentCategory && (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {currentCategory.CategryName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} available
                    </p>
                  </div>

                  {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredItems.map((item) => (
                        <MenuItem 
                          key={item.ItemId} 
                          item={item} 
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                      <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No items found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or browse other categories
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Sidebar - Cart */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <Cart 
                cart={cart}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </aside>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Food Ordering System By <span className="font-bold text-red-500">FOOD CHOW</span></p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
