import axios from 'axios';
import type { Task } from '@/types/task';
import type { Group } from '@/types/group';

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
  getTasksByGroupId: (groupId: number) => api.get<Task[]>(`/groups/${groupId}/tasks`),
  getUngroupedTasks: () => api.get<Task[]>('/tasks/ungrouped'),
  assignTaskToGroup: (taskId: number, groupId: number) => api.post(`/tasks/${taskId}/group/${groupId}`),
  removeTaskFromGroup: (taskId: number) => api.delete(`/tasks/${taskId}/remove-group`),
};

export const groupService = {
  getAllGroups: () => api.get<Group[]>('/groups'),
  getGroupById: (id: number) => api.get<Group>(`/groups/${id}`),
  createGroup: (group: Omit<Group, 'id'>) => api.post<Group>('/groups', group),
  updateGroup: (id: number, group: Group) => api.put<Group>(`/groups/${id}`, group),
  deleteGroup: (id: number) => api.delete(`/groups/${id}`),
  getTasksByGroupId: (id: number) => api.get<Task[]>(`/groups/${id}/tasks`),
}