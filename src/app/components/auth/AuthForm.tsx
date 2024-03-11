import React, { useState } from 'react';
import './AuthForm.css';
import Button from "@/app/components/ui/button/Button";
import Container from "@/app/components/ui/div/Container";
import Form from "@/app/components/ui/form/Form";
import Title from "@/app/components/ui/title/Title";
import Label from "@/app/components/ui/label/Label";
import Span from "@/app/components/ui/span/Span";
import Input from "@/app/components/ui/input/Input";
import { useRouter } from 'next/router';
import SessionManager from "@/app/util/SessionManager";


interface FormFieldProps {
    title: string;
    type: string;
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // добавляем onChange
}

const FormField: React.FC<FormFieldProps> = ({ title, type, placeholder, onChange }) => {
    return (
        <Label className={"form__field"}>
            <Span className={"form__field-title"}>{title}</Span>
            <Input className={"form__field-input"} type={type} placeholder={placeholder} onChange={onChange} />
        </Label>
    );
};

const AuthForm: React.FC = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Обработчик изменения поля ввода
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Обработчик события отправки формы
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Здесь ваша логика проверки авторизации
        const { email, password } = formData;
        const isValid = await checkCredentials(email, password); // Функция проверки авторизации
        if (!isValid) {
            //todo showErrorMessage
        }
    };

    // Функция проверки авторизации
    const checkCredentials = async (email: string, password: string) => {
        const data: Record<string, any> = {
            userId: "",
            email: email,
        };

        const result = <SessionManager redirectUrl={"/"} sessionData={data} />

        return true;
    };

    return (
        <Form className={"form"} onSubmit={handleSubmit}>
            <Title className={"form__title"} level={2}>Авторизация</Title>
            <Container className={"form__fields"}>
                <>
                    <FormField title="Email" type="email" placeholder="hello@world.com" onChange={handleInputChange} />
                    <FormField title="Пароль" type="password" placeholder="***********" onChange={handleInputChange} />
                </>
            </Container>

            <Container className={"form__actions"}>
                <Button className={"form__reset"} type={"reset"} resetDefaultCSS={true}>Очистить</Button>
                <Button className={"form__submit"} type={"submit"} resetDefaultCSS={true}>Войти</Button>
            </Container>
        </Form>
    );
};

export default AuthForm;
