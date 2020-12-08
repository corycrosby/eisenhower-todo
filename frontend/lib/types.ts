export interface State {
  lists: SortedTasks;
  listTitles: string[];
  description: string | null;
  createTaskValue: string;
  priority: number | null;
  insertIdx: number | null;
  deleteData: DeleteData | null;
  dragData: DragData | null;
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
  InitState,
  CreateTask,
  DeleteTask,
  AddToList,
  UpdateInsertIdx,
  UpdateCreateTaskValue,
}
