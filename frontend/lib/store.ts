// This is the state logic

import { State, SortedTasks, Action, DeleteData } from "./types";

const seedLists: SortedTasks = [
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

export const stateInit: State = {
  lists: seedLists,
  listTitles: ["Do first", "Schedule", "Delegate", "Don't do"],
  description: null,
  createTaskValue: "",
  priority: null,
  insertIdx: null,
  deleteData: null,
  dragData: {
    dropPriority: null,
    dragPriority: null,
    taskIdx: null,
    description: null,
  },
};

export function updateState(
  action: Action,
  prevState: State,
  newState: State,
  setState: (state: State) => void
) {
  switch (action) {
    case Action.CreateTask:
      setState(createTask(prevState, newState));
      break;

    case Action.DeleteTask:
      setState(deleteTask(prevState, newState));
      break;

    case Action.UpdateCreateTaskValue:
      setState(updateCreateTaskValue(prevState, newState));
      break;

    case Action.AddToList:
      setState(insertIntoList(prevState, newState));
      break;

    case Action.UpdateInsertIdx:
      setState(updateInsertIdx(prevState, newState));
      break;

    default:
      break;
  }
}

function createTask(prevState: State, newState: State): State {
  const { priority, description } = newState;
  const lists = prevState.lists;

  lists[priority].push({ description: description });

  return { ...stateInit, lists: lists };
}

function deleteTask(prevState: State, newState: State): State {
  const { deleteData } = newState;
  const lists = prevState.lists;

  lists[deleteData.priority].splice(deleteData.idx, 1);

  return { ...stateInit, lists: lists };
}

function insertIntoList(prevState: State, newState: State): State {
  const { dragData } = newState;
  const lists = prevState.lists;

  lists[dragData.dropPriority].splice(prevState.insertIdx, 0, {
    description: dragData.description,
  });

  let newDeleteIdx: number;

  if (
    dragData.dragPriority == dragData.dropPriority &&
    prevState.insertIdx < dragData.taskIdx
  ) {
    newDeleteIdx = dragData.taskIdx + 1;
  } else {
    newDeleteIdx = dragData.taskIdx;
  }

  const deleteData: DeleteData = {
    priority: dragData.dragPriority,
    idx: newDeleteIdx,
  };

  deleteTask(prevState, { ...newState, lists: lists, deleteData: deleteData });

  return { ...stateInit, lists: lists };
}

function updateInsertIdx(prevState: State, newState: State) {
  const { insertIdx } = newState;
  return { ...prevState, insertIdx: insertIdx };
}

function updateCreateTaskValue(preState: State, newState: State) {
  const { createTaskValue } = newState;
  return { ...preState, createTaskValue: createTaskValue };
}
