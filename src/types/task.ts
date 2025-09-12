export interface TaskRequest {
    id?: number;
    title: string;
    description?: string;
    completed?: boolean;
    groupId?: number;
}

export interface TaskResponse {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    groupId?: number;
    groupTitle?: string; 
    createdAt: string;
    updatedAt: string;
}