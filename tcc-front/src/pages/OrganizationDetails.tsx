import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Organization {
    id: number;
    name: string;
    description: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

const OrganizationDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [organizationUsers, setOrganizationUsers] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrganization = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/organizations/${id}`
                );
                setOrganization(response.data);
            } catch (err) {
                setError('Falha ao carregar organização.');
            }
        };

        const fetchOrganizationUsers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/organizations/${id}/users`
                );
                setOrganizationUsers(response.data);
            } catch (err) {
                setError('Falha ao carregar usuários.');
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users`);
                setUsers(response.data);
            } catch (err) {
                setError('Falha ao carregar usuários.');
            }
        };

        fetchOrganization();
        fetchOrganizationUsers();
        fetchUsers();
    }, [id]);

    const handleAddUser = async (userId: number) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/organizations/${id}/users/${userId}`
            );
            setMessage(response.data.message);
            // Atualiza a lista localmente após adicionar
            const addedUser = users.find((user) => user.id === userId);
            if (addedUser) {
                setOrganizationUsers((prev) => [...prev, addedUser]);
                setUsers((prev) => prev.filter((user) => user.id !== userId));
            }
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            setError('Falha ao adicionar voluntário.');
        }
    };

    const handleRemoveUser = async (userId: number) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/organizations/${id}/users/${userId}`
            );
            setMessage(response.data.message);
            // Atualiza a lista localmente após remover
            const removedUser = organizationUsers.find(
                (user) => user.id === userId
            );
            if (removedUser) {
                setUsers((prev) => [...prev, removedUser]);
                setOrganizationUsers((prev) =>
                    prev.filter((user) => user.id !== userId)
                );
            }
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            setError('Falha ao remover voluntário.');
        }
    };

    const handleBack = () => {
        navigate('/organizations');
    };

    return (
        <div
            style={{
                maxWidth: '700px',
                margin: '20px auto',
                padding: '20px',
                backgroundColor: '#222',
                color: '#f7f9fc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: '#00bfff',
                }}
            >
                Detalhes da Organização
            </h2>
            {error && (
                <p
                    style={{
                        color: 'red',
                        textAlign: 'center',
                        marginBottom: '15px',
                    }}
                >
                    {error}
                </p>
            )}
            {message && (
                <p
                    style={{
                        color: 'green',
                        textAlign: 'center',
                        marginBottom: '15px',
                    }}
                >
                    {message}
                </p>
            )}
            {organization ? (
                <div>
                    <p
                        style={{
                            fontSize: '18px',
                            lineHeight: '1.6',
                            marginBottom: '15px',
                        }}
                    >
                        <strong>Nome:</strong> {organization.name}
                    </p>
                    <p
                        style={{
                            fontSize: '18px',
                            lineHeight: '1.6',
                            marginBottom: '20px',
                        }}
                    >
                        <strong>Descrição:</strong> {organization.description}
                    </p>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ color: '#00bfff', marginBottom: '10px' }}>
                            Usuários Responsáveis
                        </h3>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px',
                            }}
                        >
                            {organizationUsers.map((user) => (
                                <div
                                    key={`org-user-${user.id}`}
                                    style={{
                                        padding: '15px',
                                        backgroundColor: '#333',
                                        borderRadius: '8px',
                                        border: '1px solid #444',
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: '18px',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <strong>Nome:</strong> {user.name}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: '18px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <button
                                        onClick={() =>
                                            handleRemoveUser(user.id)
                                        }
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s',
                                        }}
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ color: '#00bfff', marginBottom: '10px' }}>
                            Usuários Disponíveis
                        </h3>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px',
                            }}
                        >
                            {users.map((user) => (
                                <div
                                    key={`available-user-${user.id}`}
                                    style={{
                                        padding: '15px',
                                        backgroundColor: '#333',
                                        borderRadius: '8px',
                                        border: '1px solid #444',
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: '18px',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <strong>Nome:</strong> {user.name}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: '18px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <button
                                        onClick={() => handleAddUser(user.id)}
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s',
                                        }}
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={handleBack}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#6c757d',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: 'center', color: '#aaa' }}>
                    Carregando...
                </p>
            )}
        </div>
    );
};

export default OrganizationDetails;
