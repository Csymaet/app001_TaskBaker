import React, { useState } from 'react'
import { CreateTaskInput, TaskPriority } from '@shared/types'
import { getPriorityLabel } from '@shared/utils/task'
import { useTask } from '../store/TaskContext'
import './TaskForm.css'

interface TaskFormProps {
  onSubmit?: () => void
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const { addTask } = useTask()
  const [formData, setFormData] = useState<CreateTaskInput>({
    title: '',
    description: '',
    priority: 'not-urgent-important',
    estimatedDuration: undefined,
  })

  const priorities: TaskPriority[] = [
    'urgent-important',
    'not-urgent-important', 
    'urgent-not-important',
    'not-urgent-not-important'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('请输入任务标题')
      return
    }

    addTask({
      ...formData,
      title: formData.title.trim(),
      description: formData.description?.trim(),
    })

    // 重置表单
    setFormData({
      title: '',
      description: '',
      priority: 'not-urgent-important',
      estimatedDuration: undefined,
    })

    onSubmit?.()
  }

  const handleInputChange = (field: keyof CreateTaskInput, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__group">
        <label htmlFor="title" className="task-form__label">
          任务标题 *
        </label>
        <input
          id="title"
          type="text"
          className="task-form__input"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="请输入任务标题..."
          maxLength={100}
          required
        />
      </div>

      <div className="task-form__group">
        <label htmlFor="description" className="task-form__label">
          任务描述
        </label>
        <textarea
          id="description"
          className="task-form__textarea"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="请描述任务详情..."
          rows={3}
          maxLength={500}
        />
      </div>

      <div className="task-form__group">
        <label htmlFor="priority" className="task-form__label">
          优先级 (四象限法则)
        </label>
        <select
          id="priority"
          className="task-form__select"
          value={formData.priority}
          onChange={(e) => handleInputChange('priority', e.target.value as TaskPriority)}
        >
          {priorities.map(priority => (
            <option key={priority} value={priority}>
              {getPriorityLabel(priority)}
            </option>
          ))}
        </select>
      </div>

      <div className="task-form__group">
        <label htmlFor="estimatedDuration" className="task-form__label">
          预估时长 (分钟)
        </label>
        <input
          id="estimatedDuration"
          type="number"
          className="task-form__input"
          value={formData.estimatedDuration || ''}
          onChange={(e) => handleInputChange('estimatedDuration', 
            e.target.value ? parseInt(e.target.value) : undefined
          )}
          placeholder="例如: 60"
          min={1}
          max={480} // 最大8小时
        />
      </div>

      <div className="task-form__actions">
        <button type="submit" className="btn btn--primary btn--large">
          🍞 烘焙任务
        </button>
      </div>
    </form>
  )
}