import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import CreateOrganization from './pages/CreateOrganization';
import CreateOpportunity from './pages/CreateOpportunity';
import { AuthProvider } from './context/AuthContext';
import SignInVoluntary from './pages/SignInVoluntary';
import ProtectedRouteUser from './components/ProtectedRouteUser';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import CreateVoluntary from './pages/CreateVoluntary';
import ListOpportunities from './pages/ListOpportunities';
import Layout from './components/Layout';
import UserProfile from './pages/UserProfile';
import ListOrganizations from './pages/ListOrganizations';
import OpportunityDetails from './pages/OpportunityDetails';
import Logout from './pages/Logout';
import SignInUser from './pages/SignInUser';
import SignUpUser from './pages/SignUpUser';
import SignUpVoluntary from './pages/SignUpVoluntary';
import VoluntaryProfile from './pages/VoluntaryProfile';
import ProtectedRoute from './components/ProtectedRoute';
import OrganizationDetails from './pages/OrganizationDetails';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/signup" element={<SignUpVoluntary />} />
                        <Route path="/user/signup" element={<SignUpUser />} />
                        <Route path="/signin" element={<SignInVoluntary />} />
                        <Route path="/user/signin" element={<SignInUser />} />
                        <Route
                            path="/create-voluntary"
                            element={<CreateVoluntary />}
                        />
                        <Route path="/" element={<ListOpportunities />} />
                        <Route
                            path="/opportunities"
                            element={<ListOpportunities />}
                        />
                        <Route
                            path="/opportunities/:id"
                            element={<OpportunityDetails />}
                        />
                        <Route element={<ProtectedRouteUser />}>
                            <Route
                                path="/create-opportunity"
                                element={<CreateOpportunity />}
                            />
                            <Route
                                path="/user-profile"
                                element={<UserProfile />}
                            />
                        </Route>
                        <Route element={<ProtectedRoute />}>
                            <Route
                                path="/voluntary-profile"
                                element={<VoluntaryProfile />}
                            />
                        </Route>
                        <Route element={<ProtectedRouteAdmin />}>
                            <Route
                                path="/organizations"
                                element={<ListOrganizations />}
                            />
                            <Route
                                path="/create-organization"
                                element={<CreateOrganization />}
                            />
                            <Route
                                path="/organizations/:id"
                                element={<OrganizationDetails />}
                            />
                        </Route>
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
};

export default App;
