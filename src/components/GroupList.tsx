import { groupService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom";
import formatDate from "@/lib/utils";
import UpdateGroup from "./UpdateGroup";

export default function GroupList() {
    const navigate = useNavigate();

    const { data: groups = [], isLoading, error } = useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const response = await groupService.getAllGroups();
            return response.data;
        }
    });

    if (isLoading) {
        return <Loader2 className="h-4 w-4 animate-spin" />;
    }

    if (error) {
        return <p>Error loading groups</p>;
    }

    return (
        <div className="">
            {groups.map(group => (
                <div className="flex-1 p-2" key={group.id}>
                    <div className="flex flex-col gap-2">
                        <div className="self-end">
                            <UpdateGroup group={group} />
                        </div>
                        <Card 
                            className="cursor-pointer hover:bg-accent/50 transition-all" 
                            onClick={() => navigate(`/groups/${group.id}`)}
                        >
                            <CardContent className="flex items-center justify-between">
                                <h2 className={`font-semibold w-1/4`}>
                                    {group.title}
                                </h2>
                                <p className="text-sm text-muted-foreground w-2/12">
                                    {group.taskCount} Tasks
                                </p>
                                <p className="text-sm text-muted-foreground w-1/3">
                                    Updated At: {formatDate(group.updatedAt)}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ))}
        </div>
  )
}
