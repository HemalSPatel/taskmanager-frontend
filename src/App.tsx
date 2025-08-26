import TaskList from '@/components/TaskList';
import CreateTask from './components/CreateTask';

function App() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
      <div className='space-y-4'>
        <CreateTask />
        <TaskList />
      </div>
    </div>
  );
}

export default App;