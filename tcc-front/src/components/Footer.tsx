import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer
            style={{
                backgroundColor: '#333',
                padding: '20px 0',
                textAlign: 'center',
                color: '#ccc',
                fontSize: '14px',
                marginTop: '20px',
            }}
        >
            <p style={{ margin: 0 }}>
                &copy; {new Date().getFullYear()}{' '}
                <strong style={{ color: '#00bfff' }}>Causas e Corações</strong>.
                Todos os direitos reservados.
            </p>
        </footer>
    );
};

export default Footer;
