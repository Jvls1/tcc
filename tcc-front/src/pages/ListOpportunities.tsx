import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface Opportunity {
    id: number;
    name: string;
    description: string;
    voluntariesCount: number;
    eventDate: string;
    open: boolean;
    active: boolean;
}

const ListOpportunities: React.FC = () => {
    const { voluntaryId, loggedIn } = useAuth();
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/opportunities'
                );
                setOpportunities(response.data);
            } catch (err) {
                setError(
                    'Falha ao carregar as campanhas. Por favor, tente novamente mais tarde.'
                );
            }
        };

        fetchOpportunities();
    }, []);

    const handleSubscribe = async (id: number) => {
        try {
            if (!loggedIn) {
                setError(
                    'Você precisa estar logado para se inscrever em uma campanha.'
                );
                return;
            }
            const response = await axios.post(
                `http://localhost:8080/opportunities/${id}/voluntaries/${voluntaryId}`
            );
            setMessage(
                response.data.message ||
                    'Inscrição realizada com sucesso! Obrigado por se inscrever na campanha.'
            );
        } catch (err) {
            setError(
                'Não foi possível concluir a inscrição. Por favor, tente novamente mais tarde.'
            );
        }
    };

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
                Campanhas
            </h2>
            {error && (
                <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}
            {message && (
                <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>
            )}
            {opportunities.length > 0 ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                    }}
                >
                    {opportunities.map((opportunity) => (
                        <div
                            key={opportunity.id}
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
                                <strong>Nome:</strong> {opportunity.name}
                            </p>
                            <p
                                style={{
                                    fontSize: '18px',
                                    lineHeight: '1.6',
                                    marginBottom: '10px',
                                }}
                            >
                                <strong>Confirmados:</strong>{' '}
                                {opportunity.voluntariesCount}
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Link
                                    to={`/opportunities/${opportunity.id}`}
                                    style={{
                                        color: '#007bff',
                                        textDecoration: 'underline',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Ver Detalhes
                                </Link>
                                <button
                                    onClick={() =>
                                        handleSubscribe(opportunity.id)
                                    }
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Inscrever-se
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>
                    Nenhuma campanha encontrada.
                </p>
            )}
        </div>
    );
};

export default ListOpportunities;
