import React, { createContext, useContext, useState, useEffect } from 'react';

interface Organization {
    organizationId: number;
    name: string;
}

interface AuthContextType {
    organizations: Organization[];
    admin: boolean;
    loading: boolean;
    loggedIn: boolean;
    userId: number | null;
    voluntaryId: number | null;
    setLoginUser: any;
    setLoginVoluntary: any;
    setLogout: any;
    setOrganization: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [admin, setAdminState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [voluntaryId, setVoluntaryId] = useState<number | null>(null);

    useEffect(() => {
        const storedOrganizations = localStorage.getItem('organizations');
        const storedAdmin = localStorage.getItem('admin');
        const storedLoggedIn = localStorage.getItem('loggedIn');
        const storedUserId = localStorage.getItem('userId');
        const storedVoluntaryId = localStorage.getItem('voluntaryId');

        if (storedOrganizations) {
            setOrganizations(JSON.parse(storedOrganizations));
        }
        if (storedAdmin) {
            setAdminState(storedAdmin === 'true');
        }
        if (storedLoggedIn) {
            setLoggedIn(storedLoggedIn === 'true');
        }
        if (storedUserId) {
            setUserId(parseInt(storedUserId, 10));
        }
        if (storedVoluntaryId) {
            setVoluntaryId(parseInt(storedVoluntaryId, 10));
        }

        setLoading(false);
    }, []);

    const setOrganization = (organization: any) => {
        organizations.push(organization);
        setOrganizations(organizations);
    };
    const setLoginUser = (
        orgs: Organization[],
        isAdmin: boolean,
        userId: number,
        voluntaryId: number
    ) => {
        setOrganizations(orgs);
        setAdminState(isAdmin);
        setUserId(userId);
        setVoluntaryId(voluntaryId);
        setLoggedIn(true);

        localStorage.setItem('organizations', JSON.stringify(orgs));
        localStorage.setItem('admin', JSON.stringify(isAdmin));
        localStorage.setItem('loggedIn', JSON.stringify(true));
        localStorage.setItem('userId', userId.toString());
        localStorage.setItem('voluntaryId', voluntaryId.toString());
    };

    const setLoginVoluntary = (voluntaryId: number) => {
        setVoluntaryId(voluntaryId);
        setLoggedIn(true);
        localStorage.setItem('loggedIn', JSON.stringify(true));
        localStorage.setItem('voluntaryId', voluntaryId.toString());
    };

    const setLogout = () => {
        setOrganizations([]);
        localStorage.removeItem('organizations');
        localStorage.removeItem('admin');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('voluntaryId');
        setAdminState(false);
        setLoggedIn(false);
        setUserId(null);
        setVoluntaryId(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider
            value={{
                organizations,
                admin,
                loading,
                loggedIn,
                userId,
                voluntaryId,
                setLoginUser: setLoginUser,
                setLoginVoluntary,
                setLogout,
                setOrganization,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
