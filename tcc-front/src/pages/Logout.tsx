import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const { setLogout } = useAuth();

    useEffect(() => {
        setLogout();
    }, [setLogout]);

    return <Navigate to="/" replace />;
};

export default Logout;
