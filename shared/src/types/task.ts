/**
 * TaskBaker 核心数据类型定义
 * 基于"烘焙法"时间管理理念设计
 */

// 任务优先级 - 四象限法则
export type TaskPriority = 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';

// 任务状态
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

// 任务标签
export interface TaskTag {
  id: string;
  name: string;
  color: string;
}

// 核心任务实体
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  tags: TaskTag[];
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  estimatedDuration?: number; // 预估时长（分钟）
  actualDuration?: number;    // 实际时长（分钟）
}

// 任务创建参数
export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: TaskPriority;
  tags?: string[]; // 标签ID数组
  estimatedDuration?: number;
}

// 任务更新参数
export interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  tags?: string[];
  estimatedDuration?: number;
}

// 任务统计数据
export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  byPriority: Record<TaskPriority, number>;
}