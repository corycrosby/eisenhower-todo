// This is the state logic

import { State, Action, DragData } from "./types";

let state: State;

export function updateStore(
  action: Action,
  updateData,
  setState: (state: State) => void
) {
  switch (action) {
    case Action.InitState:
      setState(updateState(updateData));

      break;

    case Action.CreateTask:
      setState(createTask(updateData));

      break;

    case Action.DeleteTask:
      setState(deleteTask(updateData));

      break;

    case Action.UpdateCreateTaskValue:
      setState(updateCreateTaskValue(updateData));

      break;

    case Action.AddToList:
      setState(addToList(updateData));

      break;

    case Action.UpdateInsertIdx:
      setState(updateInsertIdx(updateData));

      break;

    case Action.UpdateIsCompleted:
      setState(updateIsCompleted(updateData));

      break;

    default:
      break;
  }
}

function updateState(updateData) {
  state = { ...state, ...updateData };
  return state;
}

function createTask({ listIdx, description }): State {
  state.lists[listIdx].taskLists.push({ description });
  state.lists[listIdx].createTaskValue = "";

  return updateState({ lists: state.lists });
}

function deleteTask({ listIdx, idx }): State {
  state.lists[listIdx].taskLists.splice(idx, 1);

  return updateState({ lists: state.lists });
}

function updateCreateTaskValue({ listIdx, createTaskValue }) {
  state.lists[listIdx].createTaskValue = createTaskValue;

  return updateState({ lists: state.lists });
}

function addToList(updateData: DragData): State {
  const task = { description: updateData.taskDescription };

  state.lists[updateData.dropPriority].taskLists.splice(
    state.dragData.insertIdx,
    0,
    task
  );

  let newDeleteIdx: number;

  if (
    updateData.dragPriority == updateData.dropPriority &&
    state.dragData.insertIdx < updateData.taskIdx
  ) {
    newDeleteIdx = updateData.taskIdx + 1;
  } else {
    newDeleteIdx = updateData.taskIdx;
  }

  deleteTask({ listIdx: updateData.dragPriority, idx: newDeleteIdx });

  return updateState({ lists: state.lists });
}

function updateInsertIdx(insertIdx) {
  state.dragData.insertIdx = insertIdx;

  return updateState(state);
}

function updateIsCompleted({ listIdx, taskIdx, isCompleted }) {
  state.lists[listIdx].taskLists[taskIdx].isCompleted = isCompleted;

  return updateState(state);
}
