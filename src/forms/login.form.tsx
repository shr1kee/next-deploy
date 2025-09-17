"use client";

import {Button, Form, Input} from "@heroui/react";
import {useState} from "react";
import {signInWithCredentials} from "@/actions/sign-in";

interface IProps {
    onClose: () => void;
}

const LoginForm = ({onClose} : IProps) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleSubmit = async  (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        await signInWithCredentials(formData.email, formData.password);
        window.location.reload();
        onClose();
    }
    return (
        <Form className="w-full" onSubmit={handleSubmit}>
            <Input
                aria-label="Email"
                isRequired
                name="email"
                placeholder="Введите email"
                type="email"
                value={formData.email}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none"
                }}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                validate={(value) => {
                    if (!value) return "Почта обязательна";
                    return null;
                }}
            >
            </Input>
            <Input
                isRequired
                name="password"
                placeholder="Введите пароль"
                type="password"
                value={formData.password}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none"
                }}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                validate={(value) => {
                    if (!value) return "Пароль обязателен";
                    return null;
                }}
            >
            </Input>
            <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
                <Button variant="light" onPress={onClose}>
                    Отмена
                </Button>
                <Button color="primary" type="submit">
                    Логин
                </Button>
            </div>
        </Form>
    )
}

export default LoginForm;