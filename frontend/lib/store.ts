import { State, TaskData, SortedTasks, DragData } from "./types";

const state: State = {
  lists: null,
  description: null,
  priority: null,
  insertIdx: null,
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

    case "update insert":
      setState(updateInsertIdx(prevState, newState));
      break;

    default:
      break;
  }
}

const resetState = {
  description: null,
  priority: null,
  insertIdx: null,
  dragData: null,
};

function createTask(prevState: State, newState: State): State {
  const { priority, description } = newState;
  const lists = prevState.lists;

  lists[priority].push({ description: description });

  return { ...resetState, lists: lists };
}

function deleteTask(prevState: State, newState: State): State {
  const { dragData } = newState;
  const lists = prevState.lists;

  let deleteIdx;

  if (
    dragData.dragPriority == dragData.dropPriority &&
    prevState.insertIdx < dragData.taskIdx
  ) {
    deleteIdx = dragData.taskIdx + 1;
  } else {
    deleteIdx = dragData.taskIdx;
  }

  lists[dragData.dragPriority].splice(deleteIdx, 1);

  return { ...resetState, lists: lists };
}

function insertIntoList(prevState: State, newState: State): State {
  const { dragData } = newState;
  const lists = prevState.lists;

  lists[dragData.dropPriority].splice(prevState.insertIdx + 1, 0, {
    description: dragData.description,
  });
  deleteTask(prevState, { ...newState, lists: lists });

  return { ...resetState, lists: lists };
}

function updateInsertIdx(prevState: State, newState: State) {
  const { insertIdx } = newState;
  return { ...prevState, insertIdx };
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
