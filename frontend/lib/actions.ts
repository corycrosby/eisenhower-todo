// This module contains the tasks logic

import { State, TaskData, SortedTasks } from "./types";
import { updateState } from "./store";

class Action {
  constructor() {}

  submitTask(prevState: State, newState: State, setState: React.Dispatch<any>) {
    updateState("new task", prevState, newState, setState);
  }

  createTask(priority: number, data: State) {
    // console.log("createTask", priority, data);
    // data.lists[priority].push({
    //   description: data.taskDescription,
    //   priority: priority,
    // });
    // Data.lists = data.lists;
    // Data.taskDescription = data.taskDescription;
  }

  updateTasks(description: string, newPriority: number) {
    // const data = this.getTaskData();
    // data[newPriority].push({ description: description, priority: newPriority });
    // localStorage.setItem("tasks_data", JSON.stringify(data));
    // Data.lists = data;
  }

  deleteTask(priority: number, idx: number) {
    // console.log("delete");
    // const data = this.getTaskData();
    // data[priority].splice(idx, 1);
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
