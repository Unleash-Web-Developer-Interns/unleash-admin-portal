import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../webpages/styles/UserManagement.scss";

export default function UserManagement() {
    const [users, setUsers] = useState([
        {
            userID: "U001",
            name: "John Doe",
            email: "johndoe@email.com",
            role: "Admin",
            status: "Active",
            dateCreated: "March 1, 2025",
        },
        {
            userID: "U002",
            name: "Jane Smith",
            email: "janesmith@email.com",
            role: "User",
            status: "Inactive",
            dateCreated: "February 15, 2025",
        },
    ]);

    return (
        <div className="user-container">
            <div className="user-header">
                <h1>User Management <span className="user-count">({users.length})</span></h1>
                <div className="search-sort">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Search users" />
                    </div>
                    <select className="sort-dropdown">
                        <option>Sort by: Active</option>
                        <option>Sort by: Inactive</option>
                    </select>
                </div>
            </div>

            <div className="user-table">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Date Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.userID}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className={user.status === "Active" ? "active" : "inactive"}>
                                    {user.status}
                                </td>
                                <td>{user.dateCreated}</td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <p>Showing <span>{users.length}</span> out of 100</p>
                <div className="page-controls">
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <span>...</span>
                    <button className="page-btn">10</button>
                </div>
            </div>
        </div>
    );
}