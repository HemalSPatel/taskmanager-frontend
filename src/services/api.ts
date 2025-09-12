import axios from 'axios';
import type { TaskRequest, TaskResponse } from '@/types/task';
import type { GroupRequest, GroupResponse } from '@/types/group';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  getAllTasks: () => api.get<TaskResponse[]>('/tasks'),
  getTaskById: (id: number) => api.get<TaskResponse>(`/tasks/${id}`),
  createTask: (task: Omit<TaskRequest, 'id'>) => api.post<TaskResponse>('/tasks', task),
  updateTask: (id: number, task: TaskRequest) => api.put<TaskResponse>(`/tasks/${id}`, task),
  deleteTask: (id: number) => api.delete(`/tasks/${id}`),
  getTasksByGroupId: (groupId: number) => api.get<TaskResponse[]>(`/groups/${groupId}/tasks`),
  getUngroupedTasks: () => api.get<TaskResponse[]>('/tasks/ungrouped'),
  assignTaskToGroup: (taskId: number, groupId: number) => api.post(`/tasks/${taskId}/group/${groupId}`),
  removeTaskFromGroup: (taskId: number) => api.delete(`/tasks/${taskId}/remove-group`),
};

export const groupService = {
  getAllGroups: () => api.get<GroupResponse[]>('/groups'),
  getGroupById: (id: number) => api.get<GroupResponse>(`/groups/${id}`),
  createGroup: (group: Omit<GroupRequest, 'id'>) => api.post<GroupResponse>('/groups', group),
  updateGroup: (id: number, group: GroupRequest) => api.put<GroupResponse>(`/groups/${id}`, group),
  deleteGroup: (id: number) => api.delete(`/groups/${id}`),
  getTasksByGroupId: (id: number) => api.get<TaskResponse[]>(`/groups/${id}/tasks`),
};