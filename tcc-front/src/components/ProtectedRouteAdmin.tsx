import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRouteAdmin: React.FC = () => {
    const { loading, loggedIn, admin } = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }

    return loggedIn && admin ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRouteAdmin;
