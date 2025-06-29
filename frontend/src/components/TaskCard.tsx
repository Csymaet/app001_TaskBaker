import React from 'react'
import { Task } from '@shared/types'
import { 
  getPriorityLabel, 
  getPriorityColor, 
  getStatusLabel, 
  formatDuration,
  canStartTask,
  canCompleteTask 
} from '@shared/utils/task'
import { useTask } from '../store/TaskContext'
import './TaskCard.css'

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const { startTask, completeTask, deleteTask } = useTask()

  const handleStart = () => {
    if (canStartTask(task)) {
      startTask(task.id)
    }
  }

  const handleComplete = () => {
    if (canCompleteTask(task)) {
      completeTask(task.id)
    }
  }

  const handleDelete = () => {
    if (confirm('确定要删除这个任务吗？')) {
      deleteTask(task.id)
    }
  }

  return (
    <div className={`task-card task-card--${task.status}`}>
      <div className="task-card__header">
        <div 
          className="task-card__priority"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {getPriorityLabel(task.priority)}
        </div>
        <div className="task-card__status">
          {getStatusLabel(task.status)}
        </div>
      </div>

      <div className="task-card__content">
        <h3 className="task-card__title">{task.title}</h3>
        {task.description && (
          <p className="task-card__description">{task.description}</p>
        )}
      </div>

      <div className="task-card__meta">
        {task.estimatedDuration && (
          <span className="task-card__duration">
            预估: {formatDuration(task.estimatedDuration)}
          </span>
        )}
        {task.actualDuration && (
          <span className="task-card__duration">
            实际: {formatDuration(task.actualDuration)}
          </span>
        )}
        <span className="task-card__time">
          创建于 {task.createdAt.toLocaleDateString()}
        </span>
      </div>

      <div className="task-card__actions">
        {canStartTask(task) && (
          <button 
            className="btn btn--primary"
            onClick={handleStart}
          >
            开始任务
          </button>
        )}
        
        {canCompleteTask(task) && (
          <button 
            className="btn btn--success"
            onClick={handleComplete}
          >
            完成任务
          </button>
        )}

        <button 
          className="btn btn--danger"
          onClick={handleDelete}
        >
          删除
        </button>
      </div>
    </div>
  )
}