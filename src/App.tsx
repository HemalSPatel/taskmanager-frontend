import TaskList from '@/components/TaskList';

function App() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
      <TaskList />
    </div>
  );
}

export default App;