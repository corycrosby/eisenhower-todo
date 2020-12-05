export interface State {
  lists: SortedTasks;
  listTitles: string[];
  description: string;
  createTaskValue: string;
  priority: number;
  insertIdx: number;
  deleteData: DeleteData;
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

export interface DeleteData {
  priority: number;
  idx: number;
}

export enum Action {
  CreateTask,
  DeleteTask,
  AddToList,
  UpdateInsertIdx,
  UpdateCreateTaskValue,
}
