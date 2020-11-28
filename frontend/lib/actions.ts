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

  updateTasks(description: string, newPriority: number) {
    // const data = this.getTaskData();
    // data[newPriority].push({ description: description, priority: newPriority });
    // localStorage.setItem("tasks_data", JSON.stringify(data));
    // Data.lists = data;
  }

  updateList(priority: number, task: any) {
    // const draggingIdx = JSON.parse(localStorage.getItem("prev_pos"));
    // const dropOnIdx = JSON.parse(localStorage.getItem("next_pos"));
    // console.log("insert", priority, draggingIdx, dropOnIdx);
    // const data = this.getTaskData();
    // const list = data[priority];
    // const task = list[draggingIdx];
    // list.splice(dropOnIdx + 1, 0, task);
    // localStorage.setItem("tasks_data", JSON.stringify(data));
    // Data.lists = data;
    // console.log("insert list", list);
    // this.deleteTask(priority, draggingIdx);
  }
}

export default new Action();
