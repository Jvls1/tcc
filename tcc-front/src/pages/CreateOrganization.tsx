import React, { useState } from 'react';
import axios from 'axios';

interface Organization {
    name: string;
    description: string;
    active: boolean;
}

const CreateOrganization: React.FC = () => {
    const [formData, setFormData] = useState<Organization>({
        name: '',
        description: '',
        active: true,
    });

    const [message, setMessage] = useState<string>('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked =
            type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/organizations',
                formData
            );
            // setOrganization()
            console.log(response.data);
            setMessage('Organização criada com sucesso!');
        } catch (error) {
            setMessage('Falha ao criar a organização. Tente novamente.');
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
                    Criar Organização
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
                <div
                    style={{
                        marginBottom: '15px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <label htmlFor="active" style={{ marginRight: '10px' }}>
                        Ativa
                    </label>
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
                        (e.currentTarget.style.backgroundColor = '#0056b3')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = '#007bff')
                    }
                >
                    Criar Organização
                </button>
                {message && (
                    <p
                        style={{
                            textAlign: 'center',
                            marginTop: '15px',
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

export default CreateOrganization;
