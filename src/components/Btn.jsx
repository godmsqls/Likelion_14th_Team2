import React, { useState } from 'react';

export function Btn({ text, num, onClick }) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <button
            style={{
                width: '100%',
                height: '80px',
                padding: '10px 40px',
                border: 'none',
                borderRadius: '20px',
                overflow: 'hidden', 

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                backgroundColor: 
                    num == 2 ? ( isHovered ? 'rgba(235, 231, 224, 0.8)' : 'rgba(235, 231, 224, 1)') 
                    : num == 3 ? ( isHovered ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.05)' ) 
                    : ( isHovered ? 'rgba(137, 11, 0, 0.8)' : 'rgba(137, 11, 0, 1)' ),
                color: num == 2 ? '#890B00' : num == 3 ? 'rgba(0, 0, 0, 0.5)' :'#ffffff',

                fontSize: '24px',
                fontWeight: '600',
                textAlign: 'center',
                lineHeight: '1.4',
                whiteSpace: 'nowrap',

                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.1s ease',
            }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {text}
        </button>
    );
}