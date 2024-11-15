import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Campaign {
    id: number;
    name: string;
    description: string;
}

const UserProfile: React.FC = () => {
    const { userId, voluntaryId } = useAuth();
    const [userInfo, setUserInfo] = useState<{
        name: string;
        email: string;
    } | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userResponse = await axios.get(
                    `http://localhost:8080/users/${userId}`
                );
                setUserInfo(userResponse.data);
            } catch (err) {
                setError('Falha ao carregar as informações do usuário.');
            }
        };

        const fetchUserCampaigns = async () => {
            try {
                const campaignsResponse = await axios.get(
                    `http://localhost:8080/opportunities/users/${userId}`
                );
                setCampaigns(campaignsResponse.data);
            } catch (err) {
                setError('Falha ao carregar as campanhas.');
            }
        };

        fetchUserInfo();
        fetchUserCampaigns();
    }, [userId]);
    const handleLeaveCampaign = async (id: number) => {
        try {
            await axios.delete(
                `http://localhost:8080/opportunities/${id}/voluntaries/${voluntaryId}`
            );
            setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
        } catch (err) {
            setError('Falha ao sair da campanha.');
        }
    };

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: '#333',
                color: '#f7f9fc',
                fontFamily: 'Arial, sans-serif',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    color: '#f7f9fc',
                    marginBottom: '20px',
                }}
            >
                Perfil do Usuário
            </h2>
            {error && (
                <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}
            {userInfo && (
                <div
                    style={{
                        backgroundColor: '#444',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <p>
                        <strong>Nome:</strong> {userInfo.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {userInfo.email}
                    </p>
                </div>
            )}
            <h3 style={{ color: '#f7f9fc', marginBottom: '10px' }}>
                Campanhas Inscritas
            </h3>
            {campaigns.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {campaigns.map((campaign) => (
                        <li
                            key={campaign.id}
                            style={{
                                marginBottom: '10px',
                                padding: '15px',
                                backgroundColor: '#444',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                border: '1px solid #555',
                            }}
                        >
                            <p>
                                <strong>Nome:</strong> {campaign.name}
                            </p>
                            <p>
                                <strong>Descrição:</strong>{' '}
                                {campaign.description}
                            </p>
                            <button
                                onClick={() => handleLeaveCampaign(campaign.id)}
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
                                Cancelar
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ textAlign: 'center', color: '#aaa' }}>
                    Você ainda não está inscrito em nenhuma campanha.
                </p>
            )}
        </div>
    );
};

export default UserProfile;
