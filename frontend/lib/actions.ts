// The actions logic for the ui

import { State, Action, DragData } from "./types";
import { updateStore } from "./store";

export const initialState: State = {
  lists: [[], [], [], []],
  listTitles: ["Do first", "Schedule", "Delegate", "Don't do"],
  description: null,
  createTaskValue: "",
  priority: null,
  insertIdx: null,
  deleteData: null,
  dragData: null,
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

  updateCreateTaskValue(inputValue: string, setState: React.Dispatch<any>) {
    updateStore(Action.UpdateCreateTaskValue, inputValue, setState);
  }

  dropIntoList(updateData: DragData, setState: React.Dispatch<any>) {
    updateStore(Action.AddToList, updateData, setState);
  }

  updateInsertIdx(newInsertIdx: number, setState: React.Dispatch<any>) {
    updateStore(Action.UpdateInsertIdx, newInsertIdx, setState);
  }
}

export default new Actions();
