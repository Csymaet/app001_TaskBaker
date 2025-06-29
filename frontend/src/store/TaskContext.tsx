import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Task, CreateTaskInput, UpdateTaskInput } from '@shared/types'
import { generateId } from '@shared/utils/task'

// 任务状态接口
interface TaskState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
}

// 任务操作类型
type TaskAction =
  | { type: 'ADD_TASK'; payload: CreateTaskInput }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: UpdateTaskInput } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'START_TASK'; payload: string }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

// 初始状态
const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
}

// Reducer函数
function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask: Task = {
        id: generateId(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        status: 'pending',
        tags: [], // 暂时简化，后续添加标签功能
        createdAt: new Date(),
        updatedAt: new Date(),
        estimatedDuration: action.payload.estimatedDuration,
      }
      return {
        ...state,
        tasks: [newTask, ...state.tasks],
        error: null,
      }
    }

    case 'UPDATE_TASK': {
      const { id, updates } = action.payload
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === id
            ? { ...task, ...updates, updatedAt: new Date() }
            : task
        ),
        error: null,
      }
    }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        error: null,
      }

    case 'START_TASK': {
      const taskId = action.payload
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === taskId
            ? { 
                ...task, 
                status: 'in-progress',
                startedAt: new Date(),
                updatedAt: new Date()
              }
            : task
        ),
        error: null,
      }
    }

    case 'COMPLETE_TASK': {
      const taskId = action.payload
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === taskId) {
            const completedAt = new Date()
            const actualDuration = task.startedAt 
              ? Math.round((completedAt.getTime() - task.startedAt.getTime()) / (1000 * 60))
              : undefined
            
            return { 
              ...task, 
              status: 'completed',
              completedAt,
              actualDuration,
              updatedAt: new Date()
            }
          }
          return task
        }),
        error: null,
      }
    }

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload }

    default:
      return state
  }
}

// Context接口
interface TaskContextType {
  state: TaskState
  addTask: (task: CreateTaskInput) => void
  updateTask: (id: string, updates: UpdateTaskInput) => void
  deleteTask: (id: string) => void
  startTask: (id: string) => void
  completeTask: (id: string) => void
}

// 创建Context
const TaskContext = createContext<TaskContextType | undefined>(undefined)

// Provider组件
export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  const contextValue: TaskContextType = {
    state,
    addTask: (task: CreateTaskInput) => dispatch({ type: 'ADD_TASK', payload: task }),
    updateTask: (id: string, updates: UpdateTaskInput) => 
      dispatch({ type: 'UPDATE_TASK', payload: { id, updates } }),
    deleteTask: (id: string) => dispatch({ type: 'DELETE_TASK', payload: id }),
    startTask: (id: string) => dispatch({ type: 'START_TASK', payload: id }),
    completeTask: (id: string) => dispatch({ type: 'COMPLETE_TASK', payload: id }),
  }

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  )
}

// Hook for consuming context
export function useTask() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}