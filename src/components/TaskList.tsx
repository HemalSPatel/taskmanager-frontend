import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/api'
import type { Task } from '@/types/task'
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export default function TaskList() {
    const queryClient = useQueryClient();

    const { data: tasks = [], isLoading, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await taskService.getAllTasks();
            return response.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => taskService.deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task deleted successfully');
        },
        onError: () => {
            toast.error('Error deleting task');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (task: Task) => {
            if (!task.id) throw new Error('Task ID is required');
            return taskService.updateTask(task.id, { ...task, completed: !task.completed });
        },
        onMutate: async (task) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });
            
            const previousTasks = queryClient.getQueryData(['tasks']);
            
            queryClient.setQueryData(['tasks'], (old: Task[] = []) =>
                old.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t)
            );
            
            return { previousTasks };
        },
        onError: (_err, _task, context) => {
            queryClient.setQueryData(['tasks'], context?.previousTasks);
            toast.error('Error updating task');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="text-center py-8">
                    <p className="text-red-500">Error loading tasks. Please try again.</p>
                </CardContent>
            </Card>
        );
    }

    if (tasks.length === 0) {
        return (
            <Card>
                <CardContent className="text-center py-8">
                    <p className="text-gray-500">No tasks yet. Create your first task!</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map(task => (
                <Card key={task.id} className={`transition-opacity ${task.completed ? 'opacity-60' : ''}`}>
                    <CardContent className="flex items-start gap-4 p-4">
                        <Checkbox 
                            checked={task.completed}
                            onCheckedChange={() => updateMutation.mutate(task)}
                            disabled={updateMutation.isPending}
                            className="mt-1"
                        />
                        
                        <div className="flex-1 space-y-1">
                            <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className="text-sm text-gray-600">{task.description}</p>
                            )}
                        </div>
                        
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => task.id && deleteMutation.mutate(task.id)}
                            disabled={deleteMutation.isPending}
                            className="hover:bg-red-50 hover:text-red-600"
                        >
                            {deleteMutation.isPending && deleteMutation.variables === task.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Trash2 className="h-4 w-4" />
                            )}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}