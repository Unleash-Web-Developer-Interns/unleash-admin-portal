import { useState } from "react";
import default_user_icon from "../assets/default_user_icon.png";
import UserTable from "./usertable"; // Corrected import path for UserTable
import "./styles/UserManagement.scss"; // Import styles for User Management

export default function UserManagement() {
    const [username, setUsername] = useState("Super Admin");

    return (
        <div className="user-management-container">
            <div className="header">
                <div className="user-info">
                    <p className="greeting">Welcome back!</p>
                    <p className="welcome">Welcome, {username}! 👋🏼</p>
                </div>
                <div className="profile">
                    <img
                        src={default_user_icon}
                        className="user-icon"
                        alt="User Icon"
                    />
                    <p className="username">{username}</p>
                </div>
            </div>
            <UserTable /> {/* Render the UserTable component */}
        </div>
    );
}