import { Task, TaskPriority, TaskStatus } from '../types/task';

/**
 * 任务工具函数集合
 */

// 生成唯一ID
export const generateId = (): string => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 获取优先级显示名称
export const getPriorityLabel = (priority: TaskPriority): string => {
  const labels: Record<TaskPriority, string> = {
    'urgent-important': '紧急重要',
    'not-urgent-important': '重要不紧急', 
    'urgent-not-important': '紧急不重要',
    'not-urgent-not-important': '不紧急不重要'
  };
  return labels[priority];
};

// 获取优先级颜色
export const getPriorityColor = (priority: TaskPriority): string => {
  const colors: Record<TaskPriority, string> = {
    'urgent-important': '#ff4757',      // 红色
    'not-urgent-important': '#ffa502',  // 橙色  
    'urgent-not-important': '#ffda79',  // 黄色
    'not-urgent-not-important': '#c7ecee' // 灰蓝色
  };
  return colors[priority];
};

// 获取状态显示名称
export const getStatusLabel = (status: TaskStatus): string => {
  const labels: Record<TaskStatus, string> = {
    'pending': '待开始',
    'in-progress': '进行中',
    'completed': '已完成',
    'cancelled': '已取消'
  };
  return labels[status];
};

// 计算任务持续时间（分钟）
export const calculateDuration = (startTime: Date, endTime: Date): number => {
  return Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
};

// 格式化持续时间显示
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}分钟`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}小时${remainingMinutes}分钟` : `${hours}小时`;
};

// 检查任务是否可以开始
export const canStartTask = (task: Task): boolean => {
  return task.status === 'pending';
};

// 检查任务是否可以完成
export const canCompleteTask = (task: Task): boolean => {
  return task.status === 'in-progress';
};

// 检查任务是否可以编辑
export const canEditTask = (task: Task): boolean => {
  return task.status !== 'completed' && task.status !== 'cancelled';
};