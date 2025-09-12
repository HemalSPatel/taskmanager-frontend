export interface GroupRequest {
    id?: number;
    title: string;
}
export interface GroupResponse {
  id: number;
  title: string;
  taskCount: number;
  createdAt: string;
  updatedAt: string;
}