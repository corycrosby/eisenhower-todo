export interface State {
  lists: SortedTasks;
  description: string;
  priority: number;
}

export type SortedTasks = [TaskData[], TaskData[], TaskData[], TaskData[]];

export interface TaskData {
  description: string;
}
