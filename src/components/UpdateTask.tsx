import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Pen } from "lucide-react"
import { taskService } from "@/services/api"
import { toast } from "sonner"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { TaskRequest } from "@/types/task"
import { GroupDropdown } from "@/components/GroupDropdown"

export default function UpdateTask({ task }: { task: TaskRequest }) {
    const [updatingTask, setUpdatingTask] = useState({ ...task })
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const updateMutation = useMutation({
        mutationFn: () => { 
            if (!updatingTask.id) throw new Error('Task ID is required');
            const updatePayload = {
                title: updatingTask.title.trim(),
                description: updatingTask.description?.trim() || '',
                groupId: updatingTask.groupId ? Number(updatingTask.groupId) : undefined
            };
            return taskService.updateTask(updatingTask.id, updatePayload);
        },
        onSuccess: (response) => {
            if (response.data.groupId !== updatingTask.groupId) {
                console.error('GroupId mismatch:', { sent: updatingTask.groupId, received: response.data.groupId });
            }
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            toast.success('Task updated successfully!')
            setOpen(false)
        },
        onError: (error) => {
            console.error('Full error details:', error);
            toast.error('Error updating task')
            console.error('Error updating task:', error)
        }
    })


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!updatingTask.title.trim()) return
        updateMutation.mutate()
    }

    const handleClose = (newOpenState: boolean) => {
        setOpen(newOpenState)
        setUpdatingTask({ ...task })
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogTrigger asChild>
                <Button size={"icon"} className = "hover:bg-green-50 hover:text-green-600 bg-green-400 text-white">
                    <Pen />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Update Task</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to update the task.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-col items-center space-y-4 py-4">
                        <div className="flex gap-2 ">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="title">
                                    Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={updatingTask.title}
                                    onChange={(e) => setUpdatingTask({ ...updatingTask, title: e.target.value })}
                                    placeholder="Enter task title"
                                    required
                                />
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="group">
                                    Group
                                </Label>
                                <GroupDropdown 
                                    value={updatingTask.groupId} 
                                    onChange={(value) => setUpdatingTask({ ...updatingTask, groupId: value })} 
                                />
                            </div>
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="description">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={updatingTask.description}
                                onChange={(e) => setUpdatingTask({ ...updatingTask, description: e.target.value })}
                                placeholder="Enter task description (optional)"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            type="button" 
                            variant="secondary"
                            onClick={() => handleClose(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={
                                !updatingTask.title.trim() || 
                                updateMutation.isPending || 
                                !updatingTask.id || 
                                (updatingTask.title.trim() === task.title && 
                                 updatingTask.description?.trim() === task.description && 
                                 updatingTask.groupId === task.groupId)
                            }
                        >
                            {updateMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}