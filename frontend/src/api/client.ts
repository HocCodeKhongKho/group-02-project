import axios from 'axios';

const API_URL = 'https://ai-helpdesk-backend-zq05.onrender.com/api';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const uploadClient = axios.create({
    baseURL: API_URL,
});
