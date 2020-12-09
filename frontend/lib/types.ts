export interface State {
  lists: ListData[];
  listTitles: string[];
  dragData: DragData | null;
}

export interface ListData {
  createTaskValue: string;
  deleteIdx: number | null;
  taskLists: TaskData[];
}

export interface TaskData {
  description: string;
}

export interface DragData {
  dropPriority: number;
  dragPriority: number;
  taskIdx: number;
  taskDescription: string;
  insertIdx: number | null;
}

export enum Action {
  InitState,
  CreateTask,
  DeleteTask,
  AddToList,
  UpdateInsertIdx,
  UpdateCreateTaskValue,
}
