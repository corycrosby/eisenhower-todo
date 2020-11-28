import { State, TaskData, SortedTasks, DragData } from "./types";

const state: State = {
  lists: null,
  description: null,
  priority: null,
  deleteIdx: null,
  dragData: null,
};

export function updateState(
  action: string,
  prevState: State,
  newState: State,
  setState: (state: State) => void
) {
  switch (action) {
    case "new task":
      setState(createTask(prevState, newState));
      break;

    case "delete task":
      setState(deleteTask(prevState, newState));
      break;

    case "add to list":
      setState(insertIntoList(prevState, newState));
      break;

    default:
      break;
  }
}

const resetState = {
  description: null,
  priority: null,
  deleteIdx: null,
  dragData: null,
};

function createTask(prevState: State, newState: State): State {
  const { priority, description } = newState;
  const lists = prevState.lists;

  lists[priority].push({ description: description });

  return { ...resetState, lists: lists };
}

function deleteTask(prevState: State, newState: State): State {
  const { priority, deleteIdx } = newState;
  const lists = prevState.lists;

  lists[priority].splice(deleteIdx, 1);

  return { ...resetState, lists: lists };
}

function insertIntoList(prevState: State, newState: State): State {
  const { dragData } = newState;
  const lists = prevState.lists;

  lists[dragData.dropPriority].push({ description: dragData.description });
  return { ...resetState, lists: lists };
}

export const seedData: SortedTasks = [
  [
    {
      description: "foo",
    },
  ],
  [
    {
      description: "bar",
    },
  ],
  [
    {
      description: "baz",
    },
  ],
  [
    {
      description: "fooBar",
    },
  ],
];
