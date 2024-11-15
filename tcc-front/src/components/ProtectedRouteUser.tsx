import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRouteUser: React.FC = () => {
    const { loading, loggedIn } = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }

    return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRouteUser;
