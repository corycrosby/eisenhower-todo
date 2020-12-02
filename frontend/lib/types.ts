export interface State {
  lists: SortedTasks;
  listTitles: string[];
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

export enum Action {
  CreateTask,
  DeleteTask,
  AddToList,
  UpdateInsertIdx,
}
