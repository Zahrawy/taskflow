/**
 * API Client
 * Centralized API calls with axios
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Custom fetch wrapper with credentials
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;

    const config: RequestInit = {
        ...options,
        credentials: 'include', // Include cookies
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

// Auth API
export const authAPI = {
    register: (userData: { name: string; email: string; password: string }) =>
        fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),

    login: (credentials: { email: string; password: string }) =>
        fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        }),

    logout: () =>
        fetchAPI('/auth/logout', {
            method: 'POST',
        }),

    getMe: () =>
        fetchAPI('/auth/me'),
};

// Task types
export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    user: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskData {
    title: string;
    description?: string;
    status?: 'todo' | 'in-progress' | 'done';
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
}

// Task API
export const taskAPI = {
    getTasks: (filters?: { status?: string; priority?: string; sortBy?: string; order?: string }) => {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
        }
        const query = params.toString() ? `?${params.toString()}` : '';
        return fetchAPI(`/tasks${query}`);
    },

    getTask: (id: string) =>
        fetchAPI(`/tasks/${id}`),

    createTask: (taskData: CreateTaskData) =>
        fetchAPI('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData),
        }),

    updateTask: (id: string, taskData: Partial<CreateTaskData>) =>
        fetchAPI(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(taskData),
        }),

    deleteTask: (id: string) =>
        fetchAPI(`/tasks/${id}`, {
            method: 'DELETE',
        }),
};

export default fetchAPI;
