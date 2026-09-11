export type TaskStatus = "todo" | "in_progress" | "blocked" | "completed" | "cancelled";
export type Priority = "low" | "medium" | "high" | "urgent";
export type ScheduleType = "vendor" | "customer" | "internal";

export interface User {
  id: string;
  name: string;
  initials: string;
  role: string;
}

export interface Customer {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId?: string;
  scheduleId: string;
  startDate: string;
  dueDate: string;
  progress: number;
  parentTaskId?: string;
}

export interface Schedule {
  id: string;
  name: string;
  type: ScheduleType;
  owner: string;
  customerId?: string;
  startDate: string;
  endDate: string;
}

export interface Milestone {
  id: string;
  name: string;
  date: string;
  scheduleId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  vendor: string;
  status: "on_track" | "at_risk" | "completed";
  progress: number;
  startDate: string;
  endDate: string;
  customers: Customer[];
  schedules: Schedule[];
  tasks: Task[];
  milestones: Milestone[];
}