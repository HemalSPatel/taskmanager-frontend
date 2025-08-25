import axios from 'axios';
import type { Task } from '@/types/task';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  getAllTasks: () => api.get<Task[]>('/tasks'),
  getTaskById: (id: number) => api.get<Task>(`/tasks/${id}`),
  createTask: (task: Omit<Task, 'id'>) => api.post<Task>('/tasks', task),
  updateTask: (id: number, task: Task) => api.put<Task>(`/tasks/${id}`, task),
  deleteTask: (id: number) => api.delete(`/tasks/${id}`),
};