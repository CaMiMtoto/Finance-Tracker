// services/authService.ts
import axiosInstance from '../lib/axios';
import {RegisterResponse, LoginResponse} from '@/types/api';

export const registerUser = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    try {
        const response = await axiosInstance
            .post('/auth/register',
                {name, email, password}
            );
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post('/auth/login', {email, password});
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
