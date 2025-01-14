import React from 'react';
import { useDispatch } from 'react-redux';
import { Trash2, CheckCircle, Circle, CloudSun } from 'lucide-react';
import { removeTask, toggleTask } from '../store/slices/taskSlice';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`p-4 rounded-lg border ${task.completed ? 'bg-gray-50' : 'bg-white'} shadow-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleTask(task.id))}
            className="text-gray-500 hover:text-blue-600"
          >
            {task.completed ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>
          <div>
            <h3 className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              {task.weather && (
                <span className="flex items-center gap-1 text-sm text-gray-600 bg-blue-50 px-2 py-1 rounded-full">
                  <CloudSun className="w-4 h-4" />
                  {task.weather.temp}°C - {task.weather.condition}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => dispatch(removeTask(task.id))}
          className="text-gray-400 hover:text-red-600"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;