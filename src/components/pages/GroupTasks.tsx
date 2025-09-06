import CreateTask from "@/components/CreateTask";
import TaskList from "@/components/TaskList";
import { groupService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

export default function GroupTasks() {
    const { groupId } = useParams();

    const { data: group, isLoading, error } = useQuery({
        queryKey: ['group', groupId],
        queryFn: async () => {
            const response = await groupService.getGroupById(parseInt(groupId!));
            return response.data;
        }
    });

    if (isLoading) {
        return <Loader2 className="h-4 w-4 animate-spin" />;
    }

    if (error) {
        return <p>Error loading group</p>;
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">{group?.title ?? "Unnamed Group"}</h1>
            <div className='space-y-4'>
                <CreateTask />
                <TaskList groupId={group?.id} />
            </div>
        </div>
    )
}
