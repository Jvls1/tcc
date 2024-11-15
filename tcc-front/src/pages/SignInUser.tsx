import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignIn: React.FC = () => {
    const { setLoginUser } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/users/signIn',
                formData
            );
            const { organizations, admin, userId, voluntaryId } = response.data;
            setLoginUser(organizations, admin, userId, voluntaryId);
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            setError(
                'Falha no login. Verifique suas credenciais e tente novamente.'
            );
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
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
                    backgroundColor: '#1f1f1f',
                    color: '#fff',
                }}
            >
                <h2 style={{ textAlign: 'center', color: '#00bfff' }}>
                    Login Do Usuário
                </h2>
                {error && (
                    <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
                )}
                <div style={{ marginBottom: '15px' }}>
                    <label
                        htmlFor="email"
                        style={{ display: 'block', marginBottom: '5px' }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label
                        htmlFor="password"
                        style={{ display: 'block', marginBottom: '5px' }}
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
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
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default SignIn;
