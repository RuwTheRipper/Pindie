import React from 'react';

interface FormProps {
    className?: string | string[];
    children?: React.ReactNode;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void; // добавляем тип для обработчика onSubmit
}

const Form: React.FC<FormProps> = ({ className = '', children, onSubmit }) => {
    const classNames = Array.isArray(className) ? className.join(' ') : className;

    return (
        <form className={classNames} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;
