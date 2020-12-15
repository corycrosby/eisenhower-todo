// This is the state logic

import { State, Action, DragData, TaskData } from "./types";

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

    case Action.UpdateIsDragging:
      setState(updateIsDragging(updateData));

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

function createTask({ listIdx, task }): State {
  state.lists[listIdx].tasks.push(task);
  state.lists[listIdx].createTaskValue = "";

  return updateState({ lists: state.lists });
}

function deleteTask({ listIdx, idx }): State {
  state.lists[listIdx].tasks.splice(idx, 1);

  return updateState({ lists: state.lists });
}

function updateCreateTaskValue({ listIdx, createTaskValue }): State {
  state.lists[listIdx].createTaskValue = createTaskValue;

  return updateState({ lists: state.lists });
}

function addToList(updateData: DragData): State {
  const task: TaskData = {
    description: updateData.taskDescription,
    isDragging: updateData.isDragging,
    isCompleted: updateData.isCompleted,
  };

  state.lists[updateData.dropPriority].tasks.splice(
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

function updateInsertIdx(insertIdx: number): State {
  state.dragData.insertIdx = insertIdx;

  return updateState(state);
}

function updateIsDragging({ listIdx, taskIdx, isDragging }): State {
  state.lists[listIdx].tasks[taskIdx].isDragging = isDragging;

  return updateState(state);
}

function updateIsCompleted({ listIdx, taskIdx, isCompleted }): State {
  state.lists[listIdx].tasks[taskIdx].isCompleted = isCompleted;

  return updateState(state);
}
