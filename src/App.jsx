import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './webpages/Dashboard'; // Import Dashboard
import UserManagement from './webpages/User Management'; // Import UserManagement

function App() {
    return (
        <Router>
            <Sidebar>
                <Routes>
                    {/* Route for Dashboard */}
                    <Route path="/" element={<Dashboard />} />
                    
                    {/* Route for User Management */}
                    <Route path="/management/user" element={<UserManagement />} />
                    
                    {/* Add other routes as needed */}
                </Routes>
            </Sidebar>
        </Router>
    );
}

export default App;
