import React from 'react';

const SearchSortContainer = ({ 
  search, 
  setSearch, 
  sortKey, 
  handleSortChange, 
  setCurrentPage, 
  filteredData, 
  pageHeaderName,
  isAddVisible,
  addLabel
}) => {
  return (
    <div className="max-w-full px-4 py-4 bg-white rounded-lg shadow mb-4">
      {/* Header with total count */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pt-4 pb-6">
        <div className="flex items-baseline">
          <h1 className="text-3xl font-bold text-gray-800">{pageHeaderName}</h1>
          <span className="ml-3 text-gray-500 text-lg">({filteredData.length})</span>
        </div>
      </div>
      
      {/* Search, Sort & Switch - Better aligned horizontal layout */}
      <div className="flex items-center justify-between font-montserrat font-medium text-sm">
        <div className="flex items-center space-x-4 flex-grow">
          {/* Search */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search anything"
              className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-unleash-blue focus:border-unleash-blue"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <div className="absolute left-3 top-1.5 text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Sort - Now the entire section is rounded */}
          <div className="flex items-center bg-gray-100 rounded-full border border-gray-300 px-3 py-2">
            <label htmlFor="sort" className="text-gray-600 mr-2 whitespace-nowrap">Sort by:</label>
            <select
              id="sort"
              className="px-2 bg-transparent border-none focus:outline-none focus:ring-0"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortKey}
            >
              <option value="Date_Purchased">Newest</option>
              <option value="Date_Return">Return Date</option>
              <option value="Shop_Name">Shop Name</option>
              <option value="Status">Status</option>
              <option value="Quantity">Quantity</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              value="" 
              className="sr-only peer" 
              // checked
              readOnly
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-unleash-blue"></div>
          </label>
        </div>
          
          {/* Add Button - Now more visually appealing */}
          {isAddVisible && (
            <button
              type="button"
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-unleash-blue hover:bg-unleash-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unleash-blue"
            >
              {addLabel}
            </button>
          )}
          
      </div>
    </div>
  );
};

export default SearchSortContainer;