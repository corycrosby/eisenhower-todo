// The actions logic for the ui

import { State, Action } from "./types";
import { stateInit, updateState } from "./store";

class Actions {
  constructor() {}

  createTask(prevState: State, newState: State, setState: React.Dispatch<any>) {
    updateState(Action.CreateTask, prevState, newState, setState);
  }

  deleteTask(prevState: State, newState: State, setState: React.Dispatch<any>) {
    updateState(Action.DeleteTask, prevState, newState, setState);
  }

  updateCreateTaskValue(
    prevState: State,
    inputValue: string,
    setState: React.Dispatch<any>
  ) {
    const newState = { ...prevState, createTaskValue: inputValue };
    updateState(Action.UpdateCreateTaskValue, prevState, newState, setState);
  }

  dropIntoList(
    prevState: State,
    newState: State,
    setState: React.Dispatch<any>
  ) {
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
