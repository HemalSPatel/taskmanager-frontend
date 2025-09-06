export interface Task {
    id?: number;
    title: string;
    description: string;
    group?: BigInteger;
    completed: boolean;
    createdAt?: string;
    updatedAt?: string;
}