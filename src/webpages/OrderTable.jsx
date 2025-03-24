import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../webpages/styles/ProductOrder.scss";

export default function OrderTable() {
    const [orders, setOrders] = useState([
        {
            shopProfile: "Pedigree",
            transactionID: "111234",
            orderID: "00001",
            shopName: "Pedigree",
            category: "Products",
            customerName: "Winter Dela Rosa",
            datePurchased: "March 25, 2025",
            orderQuantity: 1,
            totalPrice: "₱1,500",
            paymentStatus: "PENDING",
            paymentMethod: "COD",
            deliveryFee: "₱100",
            status: "Confirmed",
        },
    ]);

    return (
        <div className="order-container">
            <div className="order-header">
                <h1>Order Management <span className="order-count">(189)</span></h1>
                <div className="search-sort">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Search anything" />
                    </div>
                    <select className="sort-dropdown">
                        <option>Sort by: Confirmed</option>
                    </select>
                </div>
            </div>

            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Shop Profile</th>
                            <th>Transaction ID</th>
                            <th>Order ID</th>
                            <th>Shop Name</th>
                            <th>Category</th>
                            <th>Customer Name</th>
                            <th>Date Purchased</th>
                            <th>Order Quantity</th>
                            <th>Total Price</th>
                            <th>Payment Status</th>
                            <th>Payment Method</th>
                            <th>Delivery Fee</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td><img src="/path-to-image.png" alt="Shop Profile" className="shop-logo" /></td>
                                <td>{order.transactionID}</td>
                                <td>{order.orderID}</td>
                                <td>{order.shopName}</td>
                                <td>{order.category}</td>
                                <td>{order.customerName}</td>
                                <td>{order.datePurchased}</td>
                                <td>{order.orderQuantity}</td>
                                <td>{order.totalPrice}</td>
                                <td className={order.paymentStatus === "PENDING" ? "pending" : "completed"}>
                                    {order.paymentStatus}
                                </td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.deliveryFee}</td>
                                <td className="status confirmed">{order.status}</td>
                                <td>
                                    <button className="view-btn">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <p>Showing <span>12</span> out of 512</p>
                <div className="page-controls">
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <span>...</span>
                    <button className="page-btn">16</button>
                </div>
            </div>
        </div>
    );
}
