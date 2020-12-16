// The actions logic for the ui

import { State, Action, DragData } from "./types";
import { updateStore } from "./store";

const seedList = [
  {
    createTaskValue: "",
    deleteIdx: null,
    tasks: [],
  },
  {
    createTaskValue: "",
    deleteIdx: null,
    tasks: [],
  },
  {
    createTaskValue: "",
    deleteIdx: null,
    tasks: [],
  },
  {
    createTaskValue: "",
    deleteIdx: null,
    tasks: [],
  },
];

const initialState: State = {
  filterData: {
    options: ["all", "in progress", "completed"],
    isMenuOpen: false,
    selectedFilter: 0,
  },
  isFilterOpen: false,
  lists: seedList,
  listTitles: ["Do first", "Schedule", "Delegate", "Don't do"],
  dragData: {
    dropPriority: null,
    dragPriority: null,
    taskIdx: null,
    taskDescription: "",
    insertIdx: null,
    isDragging: null,
    isCompleted: null,
  },
};

class Actions {
  constructor() {}

  initState(setState: React.Dispatch<any>) {
    updateStore(Action.InitState, initialState, setState);
  }

  createTask(updateData, setState: React.Dispatch<any>) {
    updateStore(Action.CreateTask, updateData, setState);
  }

  deleteTask(updateData, setState: React.Dispatch<any>) {
    updateStore(Action.DeleteTask, updateData, setState);
  }

  updateCreateTaskValue(updateData, setState: React.Dispatch<any>) {
    updateStore(Action.UpdateCreateTaskValue, updateData, setState);
  }

  dropIntoList(updateData: DragData, setState: React.Dispatch<any>) {
    updateStore(Action.AddToList, updateData, setState);
  }

  updateInsertIdx(updateData: number, setState: React.Dispatch<any>) {
    updateStore(Action.UpdateInsertIdx, updateData, setState);
  }

  isDragging(updateData, setState: React.Dispatch<any>) {
    updateStore(Action.UpdateIsDragging, updateData, setState);
  }

  isCompleted(updateData, setState: React.Dispatch<any>) {
    updateStore(Action.UpdateIsCompleted, updateData, setState);
  }

  toggleFilter(updateData, setState: React.Dispatch<any>) {
    updateStore(Action.UpdateToggleFilter, updateData, setState);
  }

  selectFilterIdx(updateData: number, setState: React.Dispatch<any>) {
    updateStore(Action.UpdateSelectedIdx, updateData, setState);
  }
}

export default new Actions();
