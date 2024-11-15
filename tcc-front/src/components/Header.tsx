import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
    const { loggedIn, admin, userId, voluntaryId } = useAuth();
    return (
        <header
            style={{
                backgroundColor: '#007bff',
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <h1
                style={{
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    margin: 0,
                }}
            >
                Causas e Corações
            </h1>
            <nav
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px',
                    backgroundColor: '#007bff',
                    padding: '10px 20px',
                }}
            >
                <Link
                    to="/"
                    style={{
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    Campanhas
                </Link>
                {admin && (
                    <Link
                        to="/organizations"
                        style={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Organizações
                    </Link>
                )}
                {userId && (
                    <Link
                        to="/create-opportunity"
                        style={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Criar Campanha
                    </Link>
                )}
                {admin && (
                    <Link
                        to="/create-organization"
                        style={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Criar Organização
                    </Link>
                )}
                {voluntaryId && !userId && (
                    <Link
                        to="/voluntary-profile"
                        style={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Perfil
                    </Link>
                )}
                {userId && (
                    <Link
                        to="/user-profile"
                        style={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Perfil
                    </Link>
                )}
                {loggedIn ? (
                    <Link
                        to="/logout"
                        style={{
                            color: '#fff',
                            backgroundColor: '#28a745',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Sair
                    </Link>
                ) : (
                    <Link
                        to="/signin"
                        style={{
                            color: '#fff',
                            backgroundColor: '#28a745',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
