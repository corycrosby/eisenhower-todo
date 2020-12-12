export interface State {
  lists: ListData[];
  listTitles: string[];
  dragData: DragData | null;
}

export interface ListData {
  createTaskValue: string;
  deleteIdx: number | null;
  tasks: TaskData[];
}

export interface TaskData {
  description: string;
  isDragging: boolean;
  isCompleted: boolean;
}

export interface DragData {
  dropPriority: number;
  dragPriority: number;
  taskIdx: number;
  taskDescription: string;
  insertIdx: number | null;
  isDragging: boolean | null;
  isCompleted: boolean | null;
}

export enum Action {
  InitState,
  CreateTask,
  DeleteTask,
  AddToList,
  UpdateInsertIdx,
  UpdateCreateTaskValue,
  UpdateIsDragging,
  UpdateIsCompleted,
}
