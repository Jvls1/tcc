// src/pages/CreateOpportunity.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface OpportunityData {
    name: string;
    email: string;
    password: string;
}

const CreateOpportunity: React.FC = () => {
    const [formData, setFormData] = useState<OpportunityData>({
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/opportunities', formData);
            setMessage('Opportunity created successfully!');
        } catch (error) {
            setMessage('Failed to create opportunity. Please try again.');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                }}
            >
                <h2>Create Opportunity</h2>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
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
                    }}
                >
                    Create Opportunity
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default CreateOpportunity;
