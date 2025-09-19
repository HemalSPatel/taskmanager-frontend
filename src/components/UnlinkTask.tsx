import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2, Unlink } from 'lucide-react';

export default function UnlinkTask({ taskId } : { taskId: number }) {
    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: () => {
            if (!taskId) throw new Error('Task ID is required');
            return taskService.removeTaskFromGroup(taskId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            toast.success('Task unlinked successfully');
        },
        onError: () => {
            toast.error('Error unlinking task');
        }
    });

    return (
        <>
            <Button
                size="icon"
                onClick={() => taskId && updateMutation.mutate()}
                disabled={updateMutation.isPending}
                className="hover:bg-blue-50 hover:text-blue-500 bg-blue-300 text-white"
            >
                {updateMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Unlink className="h-4 w-4" />
                )}
            </Button>
        </>
    )
}
