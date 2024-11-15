// src/pages/ManageOpportunities.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Opportunity {
    id: number;
    name: string;
    description: string;
}

const ManageOpportunities: React.FC = () => {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/opportunities'
                );
                setOpportunities(response.data);
            } catch (err) {
                setError('Falha ao carregar as ações sociais.');
            }
        };

        fetchOpportunities();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/opportunities/${id}`);
            setOpportunities(
                opportunities.filter((opportunity) => opportunity.id !== id)
            );
        } catch (err) {
            setError('Falha ao excluir a ação social.');
        }
    };

    const handleEdit = (id: number) => {
        navigate(`/opportunities/edit/${id}`);
    };

    return (
        //TODO : JOGAR ISSO PRA TELA DO USUARIO PARA ELE PODER SE ORGANIZAR LA
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Gerenciar Ações Sociais</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {opportunities.map((opportunity) => (
                    <li
                        key={opportunity.id}
                        style={{
                            marginBottom: '10px',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                        }}
                    >
                        <p>
                            <strong>Nome:</strong> {opportunity.name}
                        </p>
                        <p>
                            <strong>Descrição:</strong>{' '}
                            {opportunity.description}
                        </p>
                        <button
                            onClick={() => handleEdit(opportunity.id)}
                            style={{
                                marginRight: '10px',
                                padding: '5px 10px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDelete(opportunity.id)}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageOpportunities;
