import { useState, useEffect } from 'react'
import { taskService } from '@/services/api'
import type { Task } from '@/types/task'
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';

export default function TaskList() {
    
    const [tasks, setTasks] = useState<Task[]>();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const taskList = await taskService.getAllTasks();
                setTasks(taskList.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, [])

    

    return (
        <Card className='p-3 flex-col'>
            {tasks?.map(task => (
                <div key={task.id} className='flex justify-between items-center'>
                    <div className='flex font-bold items-center'>
                        <Button className='mr-3 bg-red-400'>
                            <Trash2 className='text-white'/>
                        </Button>
                        {task.title}
                    </div>
                    <div>
                        {task.description}
                    </div>
                    <Checkbox checked={task.completed} onChange={() => {}}/>
                </div>
            ))}
        </Card>
    )
}
