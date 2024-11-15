import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Opportunity {
    name: string;
    description: string;
    voluntariesCount: number;
    eventDate: string;
    active: boolean;
    open: boolean;
    organizationId: number | null;
}

const CreateOpportunity: React.FC = () => {
    const { organizations } = useAuth();
    const [formData, setFormData] = useState<Opportunity>({
        name: '',
        description: '',
        voluntariesCount: 0,
        eventDate: '',
        active: true,
        open: true,
        organizationId:
            organizations.length > 0 ? organizations[0].organizationId : null,
    });

    const [message, setMessage] = useState<string>('');

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;
        const checked =
            type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? checked
                    : type === 'number'
                    ? parseInt(value, 10)
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/opportunities', formData);
            setMessage('Campanha criada com sucesso!');
        } catch (error) {
            setMessage('Falha ao criar a Campanha. Tente novamente.');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '',
                color: '#fff',
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    padding: '20px',
                    backgroundColor: '#333',
                    borderRadius: '8px',
                    border: '1px solid #444',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        color: '#00bfff',
                    }}
                >
                    Criar Campanha
                </h2>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#444',
                            border: '1px solid #555',
                            borderRadius: '4px',
                            color: '#fff',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#444',
                            border: '1px solid #555',
                            borderRadius: '4px',
                            color: '#fff',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="eventDate">Data da campanha</label>
                    <input
                        type="datetime-local"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #555',
                            backgroundColor: '#444',
                            color: '#f7f9fc',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="active">Ativa</label>
                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                        style={{
                            transform: 'scale(1.2)',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="open">Aberta</label>
                    <input
                        type="checkbox"
                        id="open"
                        name="open"
                        checked={formData.open}
                        onChange={handleChange}
                        style={{
                            transform: 'scale(1.2)',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="organizationId">Organização</label>
                    <select
                        id="organizationId"
                        name="organizationId"
                        value={formData.organizationId ?? ''}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #555',
                            backgroundColor: '#444',
                            color: '#f7f9fc',
                        }}
                    >
                        <option value="" disabled>
                            Selecione uma organização
                        </option>
                        {organizations.map((org) => (
                            <option
                                key={org.organizationId}
                                value={org.organizationId}
                            >
                                {org.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = '#666')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = '#555')
                    }
                >
                    Criar Campanha
                </button>

                {message && (
                    <p
                        style={{
                            textAlign: 'center',
                            marginTop: '10px',
                            color: message.includes('sucesso')
                                ? 'green'
                                : 'red',
                        }}
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default CreateOpportunity;
