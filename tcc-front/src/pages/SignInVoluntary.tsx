import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignInVoluntary: React.FC = () => {
    const { setLoginVoluntary } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);

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
                'http://localhost:8080/signIn',
                formData
            );
            const { voluntaryId } = response.data;
            if (response.status === 200) {
                setLoginVoluntary(voluntaryId);
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
                <h2 style={{ textAlign: 'center', color: '#00bfff' }}>Login</h2>
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
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <span>Não possui cadastro? </span>
                    <Link
                        to="/signup"
                        style={{
                            color: '#28a745',
                            textDecoration: 'underline',
                        }}
                    >
                        Cadastre-se
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignInVoluntary;
