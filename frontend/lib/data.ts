// This module contains the task manipulation logic

import { TaskData, SortedTasks } from "./types";

class Data {
  constructor() {}

  getTaskData(): TaskData[] {
    return JSON.parse(localStorage.getItem("tasks_data")) || [];
  }

  getSortedTasks(tasks: TaskData[]): SortedTasks {
    const sortedTasks: SortedTasks = [[], [], [], []];

    for (const task of tasks) {
      const idx = task.priority - 1;
      sortedTasks[idx].push(task);
    }

    return sortedTasks;
  }

  createTask(description: string, priority: number) {
    if (!/\S/.test(description)) return;

    const data = this.getTaskData();
    data.push({ description: description, priority: priority });

    localStorage.setItem("tasks_data", JSON.stringify(data));
  }
}

export default new Data();
