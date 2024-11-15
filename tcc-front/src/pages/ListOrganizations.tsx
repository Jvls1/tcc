import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Organization {
    id: number;
    name: string;
    description: string;
}

const ListOrganizations: React.FC = () => {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/organizations'
                );
                setOrganizations(response.data);
            } catch (err) {
                setError(
                    'Falha ao carregar as organizações. Tente novamente mais tarde.'
                );
            }
        };

        fetchOrganizations();
    }, []);

    return (
        <div
            style={{
                maxWidth: '700px',
                margin: '20px auto',
                padding: '20px',
                backgroundColor: '#222',
                color: '#fff',
                borderRadius: '8px',
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: '#00bfff',
                }}
            >
                Organizações
            </h2>
            {error && (
                <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}
            {organizations.length > 0 ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                    }}
                >
                    {organizations.map((org) => (
                        <div
                            key={org.id}
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
                                    lineHeight: '1.6',
                                    marginBottom: '10px',
                                }}
                            >
                                <strong>Nome:</strong> {org.name}
                            </p>
                            <p
                                style={{
                                    fontSize: '18px',
                                    lineHeight: '1.6',
                                    marginBottom: '10px',
                                }}
                            >
                                <strong>Descrição:</strong> {org.description}
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Link
                                    to={`/organizations/${org.id}`}
                                    style={{
                                        color: '#007bff',
                                        textDecoration: 'underline',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Ver Detalhes
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhuma organização encontrada.</p>
            )}
        </div>
    );
};

export default ListOrganizations;
