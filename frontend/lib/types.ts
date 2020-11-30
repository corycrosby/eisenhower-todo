export interface State {
  lists: SortedTasks;
  description: string;
  priority: number;
  insertIdx: number;
  dragData: DragData;
}

export type SortedTasks = [TaskData[], TaskData[], TaskData[], TaskData[]];

export interface TaskData {
  description: string;
}

export interface DragData {
  dropPriority: number;
  dragPriority: number;
  taskIdx: number;
  description: string;
}
