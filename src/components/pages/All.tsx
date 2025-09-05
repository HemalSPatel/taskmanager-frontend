import CreateTask from "@/components/CreateTask";
import TaskList from "@/components/TaskList";

export default function All() {
  return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">All Tasks</h1>
            <div className='space-y-4'>
                <CreateTask />
                <TaskList />
            </div>
        </div>
  )
}
