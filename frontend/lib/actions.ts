// This module contains the tasks logic

import { State, DragData } from "./types";
import { updateState } from "./store";

class Action {
  constructor() {}

  submitTask(prevState: State, newState: State, setState: React.Dispatch<any>) {
    updateState("new task", prevState, newState, setState);
  }

  deleteTask(prevState: State, newState: State, setState: React.Dispatch<any>) {
    updateState("delete task", prevState, newState, setState);
  }

  addToList(prevState: State, newState: State, setState: React.Dispatch<any>) {
    updateState("add to list", prevState, newState, setState);
  }

  updateInsertIdx(
    prevState: State,
    newState: State,
    setState: React.Dispatch<any>
  ) {
    updateState("update insert", prevState, newState, setState);
  }
}

export default new Action();
