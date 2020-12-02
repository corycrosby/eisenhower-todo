// The actions logic for the ui

import { State, Action } from "./types";
import { updateState } from "./store";

class Actions {
  constructor() {}

  submitTask(prevState: State, newState: State, setState: React.Dispatch<any>) {
    updateState(Action.CreateTask, prevState, newState, setState);
  }

  deleteTask(prevState: State, newState: State, setState: React.Dispatch<any>) {
    updateState(Action.DeleteTask, prevState, newState, setState);
  }

  addToList(prevState: State, newState: State, setState: React.Dispatch<any>) {
    updateState(Action.AddToList, prevState, newState, setState);
  }

  updateInsertIdx(
    prevState: State,
    newState: State,
    setState: React.Dispatch<any>
  ) {
    updateState(Action.UpdateInsertIdx, prevState, newState, setState);
  }
}

export default new Actions();
