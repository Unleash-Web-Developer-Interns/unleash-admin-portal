import { useEffect, useState } from "react";
import SearchSortContainer from "../components/SearchSortContainer";
import DataTable from "../components/DataTable";
import ProductModal from "../components/ProductModal";
import StatusModal from "../components/StatusModal";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("Date_Purchased");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isProductExpanded, setIsProductExpanded] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageHeaderName, setPageHeaderName] = useState("Order Management");

  // Define table columns configuration
  const tableColumns = [
    { label: "Shop Profile", key: "Shop_Profile", type: "image" },
    { label: "Transaction ID", key: "Transaction_ID", type: "text" },
    { label: "Order ID", key: "Order_ID", type: "text" },
    { label: "Shop Name", key: "Shop_Name", type: "text" },
    { label: "Category", key: "Category", type: "text" },
    { label: "Customer Name", key: "Customer_Name", type: "text" },
    { label: "Date Purchase", key: "Date_Purchase", type: "date" },
    { label: "Order Quantity", key: "Quantity", type: "number" },
    { label: "Total Price", key: "Total_Price", type: "number" },
    { label: "Payment Status", key: "Payment_Status", type: "text" },
    { label: "Payment Method", key: "Payment_Method", type: "text" },
    { label: "Delivery Fee", key: "Delivery Fee", type: "text" },
    { label: "Status", key: "Status", type: "status" },
    { label: "Details", key: null, type: "button", buttonText: "View", onClick: openDetailsModal },
    { label: "Actions", key: null, type: "action", onClick: openStatusModal }
  ];

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://retoolapi.dev/R4B86S/product-order");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const apiData = await response.json();
        setData(apiData);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Status tracking for timeline in details modal
  const statusItems = [
    { status: "Cancelled", time: " ", active: selectedItem?.Status === "Denied", highlight: false },
    { status: "Completed", time: "Mar 18, 10:30 AM", active: selectedItem?.Status === "Approved", highlight: false },
    { status: "Delivered", time: "Mar 18, 10:30 AM", active: selectedItem?.Status === "Delivered", highlight: true },
    { status: "For Delivery", time: "Mar 18, 10:30 AM", active: selectedItem?.Status === "For Delivery", highlight: false },
    { status: "Ready for Pick up", time: "Mar 18, 10:30 AM", active: selectedItem?.Status === "Ready for Pick up", highlight: false },
    { status: "Confirmed", time: "20/01/2024", active: selectedItem?.Status === "Confirmed", highlight: false },
    { status: "Pending", time: "20/01/2024", active: selectedItem?.Status === "Pending", highlight: false },


  ];

  // Handle sort change
  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!search.trim()) return true;
    
    const searchTerm = search.toLowerCase();
    return (
      (item.Transaction_ID && item.Transaction_ID.toString().toLowerCase().includes(searchTerm)) ||
      (item.Order_ID && item.Order_ID.toString().toLowerCase().includes(searchTerm)) ||
      (item.Shop_Name && item.Shop_Name.toLowerCase().includes(searchTerm)) ||
      (item.Customer_Name && item.Customer_Name.toLowerCase().includes(searchTerm)) ||
      (item.Status && item.Status.toLowerCase().includes(searchTerm))
    );
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    // Handle cases where the key might not exist
    if (!a[sortKey] || !b[sortKey]) {
      // If one item is missing the sort key, push it to the end
      if (!a[sortKey]) return 1;
      if (!b[sortKey]) return -1;
      return 0;
    }
    
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    
    // Special handling for date columns
    if (sortKey === "Date_Purchased" || sortKey === "Date_Return") {
      const dateA = new Date(valueA);
      const dateB = new Date(valueB);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }
    
    // Special handling for numeric columns
    if (sortKey === "Quantity") {
      return sortDirection === "asc" 
        ? Number(valueA) - Number(valueB) 
        : Number(valueB) - Number(valueA);
    }
    
    // Default string comparison for other columns
    const stringA = String(valueA).toLowerCase();
    const stringB = String(valueB).toLowerCase();
    
    return sortDirection === "asc" 
      ? stringA.localeCompare(stringB) 
      : stringB.localeCompare(stringA);
  });

  // Paginate sorted data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Modal functions
  function openDetailsModal(item) {
    setSelectedItem(item);
    setModalType("details");
    setShowModal(true);
  }

  function openStatusModal(item) {
    setSelectedItem(item);
    setModalType("status");
    setShowModal(true);
  }

  // Update status function
  const updateStatus = async (item) => {
    try {
      const response = await fetch(`https://retoolapi.dev/R4B86S/product-order/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Status: item.Status }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const updatedItem = await response.json();
      
      // Update local state
      setData(data.map(dataItem => 
        dataItem.id === updatedItem.id ? updatedItem : dataItem
      ));
      
      setShowModal(false);
    } catch (err) {
      setError(`Failed to update status: ${err.message}`);
      console.error("Error updating status:", err);
    }
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 bg-opacity-10 text-green-400";
      case "Pending":
        return "bg-amber-50 bg-opacity-10 text-yellow-400";
      case "Cancelled":
        return "bg-red-50 bg-opacity-10 text-red-400";
        case "Janke": 
        return "bg-red-50 bg-opacity-10 text-red-400";
        case "Fred": 
        return "bg-red-50 bg-opacity-10 text-red-400";
      default:
        return "bg-blue-50 bg-opacity-10 text-blue-400";
    }
  };

  return (
    <div className="container px-6 bg-webpage-bg">
      {/* Search and Sort Component */}
      <SearchSortContainer
        search={search}
        setSearch={setSearch}
        sortKey={sortKey}
        handleSortChange={handleSortChange}
        setCurrentPage={setCurrentPage}
        filteredData={filteredData}
        pageHeaderName={pageHeaderName}
      />

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Data Table Component */}
      {!loading && !error && (
        <DataTable
          columns={tableColumns}
          paginatedData={paginatedData}
          filteredData={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          startIndex={startIndex}
          getStatusClass={getStatusClass}
        />
      )}

      {/* Modals Component */}
      <ProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        isProductExpanded={isProductExpanded}
        setIsProductExpanded={setIsProductExpanded}
        updateStatus={updateStatus}
        statusItems={statusItems}
      />
    </div>
  );
};

export default Product;