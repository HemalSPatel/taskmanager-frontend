import CreateGroup from "@/components/CreateGroup";
import GroupList from "@/components/GroupList";

export default function Groups() {
  return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Groups</h1>
            <div className='space-y-4'>
                <CreateGroup />
                <GroupList />
            </div>
        </div>
  )
}
