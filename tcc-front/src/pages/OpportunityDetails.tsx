import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Opportunity {
    id: number;
    name: string;
    description: string;
    voluntariesCount: number;
    eventDate: string;
    organizationName: string;
}

interface Voluntary {
    id: number;
    name: string;
}

const OpportunityDetails: React.FC = () => {
    const { userId, admin, voluntaryId } = useAuth();
    const { id } = useParams<{ id: string }>();
    const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
    const [voluntaries, setVoluntaries] = useState<Voluntary[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOpportunity = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/opportunities/${id}`
                );
                setOpportunity(response.data);
            } catch (err) {
                setError('Falha ao carregar detalhes da ação social.');
            }
        };
        const fetchVoluntaries = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/opportunities/${id}/users`
                );
                setVoluntaries(response.data);
            } catch (err) {
                setError('Falha ao carregar voluntários.');
            }
        };
        fetchOpportunity();
        if (admin || userId) {
            fetchVoluntaries();
        }
    }, [id]);

    const handleSubscribe = async (opportunityId: number) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/opportunities/${opportunityId}/voluntaries/${voluntaryId}`
            );
            setMessage(
                response.data.message || 'Inscrição realizada com sucesso!'
            );
        } catch (err) {
            console.log(err);
            setError('Falha ao se inscrever. Tente novamente.');
        }
    };

    const handleBack = () => {
        navigate('/opportunities');
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
                Detalhes da Ação Social
            </h2>
            {error && (
                <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}
            {message && (
                <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>
            )}
            {opportunity ? (
                <div>
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
                        <strong>Descrição:</strong> {opportunity.description}
                    </p>
                    <p
                        style={{
                            fontSize: '18px',
                            lineHeight: '1.6',
                            marginBottom: '10px',
                        }}
                    >
                        <strong>Data:</strong>{' '}
                        {new Date(opportunity.eventDate).toLocaleDateString()}{' '}
                        às{' '}
                        {new Date(opportunity.eventDate).toLocaleTimeString()}
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
                    <p
                        style={{
                            fontSize: '18px',
                            lineHeight: '1.6',
                            marginBottom: '20px',
                        }}
                    >
                        <strong>Organização:</strong>{' '}
                        {opportunity.organizationName}
                    </p>
                    {voluntaries ? (
                        <div>
                            <p
                                style={{
                                    fontSize: '18px',
                                    lineHeight: '1.6',
                                    marginBottom: '20px',
                                }}
                            >
                                <strong>Voluntarios inscritos:</strong>
                            </p>
                            <div
                                style={{
                                    padding: '10px',
                                    backgroundColor: '#333',
                                    borderRadius: '8px',
                                    border: '1px solid #444',
                                }}
                            >
                                {voluntaries.map((voluntary) => (
                                    <p
                                        key={voluntary.id}
                                        style={{
                                            fontSize: '18px',
                                            lineHeight: '1.6',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <strong>Nome:</strong> {voluntary.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '15px',
                        }}
                    >
                        <button
                            onClick={() => handleSubscribe(opportunity.id)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            Inscrever-se
                        </button>
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
                            }}
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>Carregando...</p>
            )}
        </div>
    );
};

export default OpportunityDetails;
