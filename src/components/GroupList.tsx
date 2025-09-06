import { groupService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function GroupList() {
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
                <a href={`/groups/${group.id}`} className="flex-1 p-2" key={group.id}>
                    <Card>
                        <CardContent className="flex items-start gap-4 p-4">
                            <h3 className={`font-semibold`}>
                                {group.title}
                            </h3>
                        </CardContent>
                    </Card>
                </a>
            ))}
        </div>
  )
}
