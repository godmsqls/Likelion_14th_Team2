import React from 'react';
import btnImg from '../assets/Button.png'; 

export function Btn({ text }) {
    return (
        <button
            style={{
                backgroundImage: `url(${btnImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',

                height: '80px',
                gap: '10px',
                padding: '10px 40px',
                border: 'none',
                borderRadius: '20px',
                overflow: 'hidden', 

                color: '#ffffff',
                fontSize: '24px',
                fontWeight: '600',
                textAlign: 'center',
                lineHeight: '1.4',

                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.1s ease',
            }}
        >
            {text}
        </button>
    );
}