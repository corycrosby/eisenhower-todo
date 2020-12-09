// The actions logic for the ui

import { State, Action, DragData } from "./types";
import { updateStore } from "./store";

const seedList = [
  {
    createTaskValue: "",
    deleteIdx: null,
    taskLists: [],
  },
  {
    createTaskValue: "",
    deleteIdx: null,
    taskLists: [],
  },
  {
    createTaskValue: "",
    deleteIdx: null,
    taskLists: [],
  },
  {
    createTaskValue: "",
    deleteIdx: null,
    taskLists: [],
  },
];

const initialState: State = {
  lists: seedList,
  listTitles: ["Do first", "Schedule", "Delegate", "Don't do"],
  dragData: {
    dropPriority: null,
    dragPriority: null,
    taskIdx: null,
    taskDescription: "",
    insertIdx: null,
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

  deleteTask(newDeleteData, setState: React.Dispatch<any>) {
    updateStore(Action.DeleteTask, newDeleteData, setState);
  }

  updateCreateTaskValue(updateData, setState: React.Dispatch<any>) {
    updateStore(Action.UpdateCreateTaskValue, updateData, setState);
  }

  dropIntoList(updateData: DragData, setState: React.Dispatch<any>) {
    updateStore(Action.AddToList, updateData, setState);
  }

  updateInsertIdx(insertIdx: number, setState: React.Dispatch<any>) {
    updateStore(Action.UpdateInsertIdx, insertIdx, setState);
  }
}

export default new Actions();
