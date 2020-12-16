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
      return setState(updateState(updateData));

    case Action.CreateTask:
      return setState(createTask(updateData));

    case Action.DeleteTask:
      return setState(deleteTask(updateData));

    case Action.UpdateCreateTaskValue:
      return setState(updateCreateTaskValue(updateData));

    case Action.AddToList:
      return setState(addToList(updateData));

    case Action.UpdateInsertIdx:
      return setState(updateInsertIdx(updateData));

    case Action.UpdateIsDragging:
      return setState(updateIsDragging(updateData));

    case Action.UpdateIsCompleted:
      return setState(updateIsCompleted(updateData));

    case Action.UpdateToggleFilter:
      return setState(updateToggleFilter(updateData));

    case Action.UpdateSelectedIdx:
      return setState(updateSelectedOption(updateData));

    default:
      return;
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

function updateToggleFilter(isFilterOpen: boolean): State {
  state.isFilterOpen = isFilterOpen;

  return updateState(state);
}

function updateSelectedOption(selectedIdx: number): State {
  state.isFilterOpen = false;
  state.filterData.selectedFilter = selectedIdx;

  return updateState(state);
}
