// This module contains the tasks logic

import { TaskData, SortedTasks } from "./types";

class Tasks {
  constructor() {}

  seedData() {
    const seedData = [
      {
        description: "foo",
        priority: 2,
      },
      {
        description: "bar",
        priority: 0,
      },
      {
        description: "baz",
        priority: 3,
      },
      {
        description: "fooBar",
        priority: 1,
      },
    ];

    const sortedData = this.sortTasks(seedData);
    localStorage.setItem("tasks_data", JSON.stringify(sortedData));
  }

  getTaskData(): TaskData[][] {
    return JSON.parse(localStorage.getItem("tasks_data"));
  }

  private sortTasks(tasks: TaskData[]): SortedTasks {
    const sortedTasks: SortedTasks = [[], [], [], []];

    for (const task of tasks) {
      const idx = task.priority;
      sortedTasks[idx].push(task);
    }

    return sortedTasks;
  }

  createTask(description: string, priority: number) {
    // Handle on the frontend with messaging
    if (!/\S/.test(description)) return;

    const data = this.getTaskData();
    data[priority].push({ description: description, priority: priority });

    localStorage.setItem("tasks_data", JSON.stringify(data));
  }

  updateTasks(description: string, newPriority: number) {
    const data: TaskData[][] = this.getTaskData();
    data[newPriority].push({ description: description, priority: newPriority });

    localStorage.setItem("tasks_data", JSON.stringify(data));
  }

  deleteTask(priority: number, idx: number) {
    const data = this.getTaskData();
    data[priority].splice(idx, 1);

    localStorage.setItem("tasks_data", JSON.stringify(data));
  }
}

export default new Tasks();
