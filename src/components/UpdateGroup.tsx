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
import { groupService } from "@/services/api"
import { toast } from "sonner"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { GroupRequest } from "@/types/group"

export default function UpdateGroup({ group }: { group: GroupRequest }) {
    const [updatingGroup, setUpdatingGroup] = useState({ ...group })
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const updateMutation = useMutation({
        mutationFn: () => {
            if (!updatingGroup.id) throw new Error('Group ID is required');
            return groupService.updateGroup(updatingGroup.id, { ...updatingGroup })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] })
            toast.success('Group updated successfully!')
            setOpen(false)
        },
        onError: (error) => {
            toast.error('Error updating group')
            console.error('Error updating group:', error)
        }
    })


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!updatingGroup.title.trim()) return
        updateMutation.mutate()
    }

    const handleClose = (newOpenState: boolean) => {
        setOpen(newOpenState)
        setUpdatingGroup({ ...group })
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
                        <DialogTitle>Update Group</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to update the group.
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
                                    value={updatingGroup.title}
                                    onChange={(e) => setUpdatingGroup({ ...updatingGroup, title: e.target.value })}
                                    placeholder="Enter group title"
                                    required
                                />
                            </div>
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
                            disabled={!updatingGroup.title.trim() || updateMutation.isPending || !updatingGroup.id || (updatingGroup.title.trim() === group.title)}
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