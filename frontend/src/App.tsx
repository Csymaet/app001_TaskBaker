import React from 'react'
import { TaskProvider } from './store/TaskContext'
import TaskManager from './pages/TaskManager'
import './styles/App.css'

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <header className="app-header">
          <h1>🍞 TaskBaker</h1>
          <p>基于烘焙法的时间管理</p>
        </header>
        <main className="app-main">
          <TaskManager />
        </main>
      </div>
    </TaskProvider>
  )
}

export default App