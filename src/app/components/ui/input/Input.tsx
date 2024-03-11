import React from 'react';

interface InputProps {
    className?: string | string[];
    type?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // добавляем onChange
}

const Input: React.FC<InputProps> = ({ className = '', type = 'text', placeholder, onChange }) => {
    const classNames = Array.isArray(className) ? className.join(' ') : className;

    return (
        <input className={classNames} type={type} placeholder={placeholder} onChange={onChange} />
    );
};

export default Input;
