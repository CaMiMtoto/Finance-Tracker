"use client";
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {z} from 'zod';
import {registerUser} from '@/services/authService';
import TextInput from '@/components/TextInput';
import Link from "next/link";

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const router = useRouter();

    // Define the Zod schema
    const schema = z
        .object({
            name: z.string().min(1, 'Name is required'),
            email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
            password: z.string().min(6, 'Password must be at least 6 characters long'),
            confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'], // Set the path to confirmPassword
            message: 'Passwords do not match',
        });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const validateForm = () => {
        try {
            schema.parse(formData);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: { [key: string]: string } = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        newErrors[err.path[0]] = err.message;
                    }
                });
                setErrors(newErrors as typeof errors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await registerUser(formData.name, formData.email, formData.password);
            setMessage(response?.message ?? 'User registered successfully');
            setFormData({name: '', email: '', password: '', confirmPassword: ''});
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error) {
            setMessage('Error registering user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white lg:rounded-lg lg:shadow-lg">
                <h1 className="text-2xl font-bold mb-3 text-gray-900">Register</h1>
                <p className="mb-3 text-sm text-gray-400">
                    Please fill in the form below to create an account.
                </p>
                <form onSubmit={handleSubmit} aria-live="polite">
                    <TextInput
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    <TextInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500" aria-live="assertive">{message}</p>}

                <p className="mt-3">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
