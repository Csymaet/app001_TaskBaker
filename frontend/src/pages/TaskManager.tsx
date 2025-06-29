import React, { useState } from 'react'
import { TaskPriority } from '@shared/types'
import { useTask } from '../store/TaskContext'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'
import './TaskManager.css'

export default function TaskManager() {
  const { state } = useTask()
  const [showForm, setShowForm] = useState(false)
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')

  // 筛选任务
  const filteredTasks = state.tasks.filter(task => {
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority
    const statusMatch = filterStatus === 'all' || task.status === filterStatus
    return priorityMatch && statusMatch
  })

  // 按优先级分组任务
  const tasksByPriority = {
    'urgent-important': filteredTasks.filter(t => t.priority === 'urgent-important'),
    'not-urgent-important': filteredTasks.filter(t => t.priority === 'not-urgent-important'),
    'urgent-not-important': filteredTasks.filter(t => t.priority === 'urgent-not-important'),
    'not-urgent-not-important': filteredTasks.filter(t => t.priority === 'not-urgent-not-important'),
  }

  const toggleForm = () => setShowForm(!showForm)

  return (
    <div className="task-manager">
      {/* 操作栏 */}
      <div className="task-manager__toolbar">
        <button 
          className="btn btn--primary"
          onClick={toggleForm}
        >
          {showForm ? '📝 隐藏表单' : '➕ 添加任务'}
        </button>
        
        <div className="task-manager__filters">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as TaskPriority | 'all')}
            className="filter-select"
          >
            <option value="all">全部优先级</option>
            <option value="urgent-important">紧急重要</option>
            <option value="not-urgent-important">重要不紧急</option>
            <option value="urgent-not-important">紧急不重要</option>
            <option value="not-urgent-not-important">不紧急不重要</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">全部状态</option>
            <option value="pending">待开始</option>
            <option value="in-progress">进行中</option>
            <option value="completed">已完成</option>
          </select>
        </div>
      </div>

      {/* 添加任务表单 */}
      {showForm && (
        <TaskForm onSubmit={() => setShowForm(false)} />
      )}

      {/* 任务统计 */}
      <div className="task-stats">
        <div className="stat-item">
          <span className="stat-number">{state.tasks.length}</span>
          <span className="stat-label">总任务</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{state.tasks.filter(t => t.status === 'pending').length}</span>
          <span className="stat-label">待开始</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{state.tasks.filter(t => t.status === 'in-progress').length}</span>
          <span className="stat-label">进行中</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{state.tasks.filter(t => t.status === 'completed').length}</span>
          <span className="stat-label">已完成</span>
        </div>
      </div>

      {/* 四象限任务展示 */}
      <div className="quadrant-grid">
        <div className="quadrant quadrant--urgent-important">
          <h3 className="quadrant__title">🔴 紧急重要</h3>
          <div className="quadrant__tasks">
            {tasksByPriority['urgent-important'].map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
            {tasksByPriority['urgent-important'].length === 0 && (
              <div className="empty-state">暂无任务</div>
            )}
          </div>
        </div>

        <div className="quadrant quadrant--urgent-not-important">
          <h3 className="quadrant__title">🟡 紧急不重要</h3>
          <div className="quadrant__tasks">
            {tasksByPriority['urgent-not-important'].map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
            {tasksByPriority['urgent-not-important'].length === 0 && (
              <div className="empty-state">暂无任务</div>
            )}
          </div>
        </div>

        <div className="quadrant quadrant--not-urgent-important">
          <h3 className="quadrant__title">🟠 重要不紧急</h3>
          <div className="quadrant__tasks">
            {tasksByPriority['not-urgent-important'].map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
            {tasksByPriority['not-urgent-important'].length === 0 && (
              <div className="empty-state">暂无任务</div>
            )}
          </div>
        </div>

        <div className="quadrant quadrant--not-urgent-not-important">
          <h3 className="quadrant__title">🔵 不紧急不重要</h3>
          <div className="quadrant__tasks">
            {tasksByPriority['not-urgent-not-important'].map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
            {tasksByPriority['not-urgent-not-important'].length === 0 && (
              <div className="empty-state">暂无任务</div>
            )}
          </div>
        </div>
      </div>

      {/* 空状态 */}
      {state.tasks.length === 0 && (
        <div className="welcome-message">
          <h2>🎉 欢迎使用 TaskBaker！</h2>
          <p>基于"烘焙法"的时间管理理念，让我们开始烘焙你的第一个任务吧！</p>
          <button className="btn btn--primary btn--large" onClick={toggleForm}>
            🍞 开始烘焙任务
          </button>
        </div>
      )}
    </div>
  )
}