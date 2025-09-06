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
import { Plus, Loader2 } from "lucide-react"
import { groupService } from "@/services/api"
import { toast } from "sonner"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function CreateGroup() {
    const [formData, setFormData] = useState({ title: '' })
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: () => groupService.createGroup({ ...formData, createdAt: new Date().toISOString() }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] })
            toast.success('Group created successfully!')
            setOpen(false)
            setFormData({ title: '' })
        },
        onError: (error) => {
            toast.error('Error creating group')
            console.error('Error creating group:', error)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title.trim()) return
        createMutation.mutate()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    Create Group
                    <Plus className="ml-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create a Group</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to create a new group.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-col items-center space-y-4 py-4">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="title">
                                Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter group title"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            type="button" 
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={!formData.title.trim() || createMutation.isPending}
                        >
                            {createMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}