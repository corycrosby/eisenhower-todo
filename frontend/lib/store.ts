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

    default:
      break;
  }
}

function updateState(updateData) {
  state = { ...state, ...updateData };
  return state;
}

function createTask(updateData): State {
  const { priority, description } = updateData;
  state.lists[priority].push({ description: description });

  return updateState({ lists: state.lists });
}

function deleteTask(updateData): State {
  state.lists[updateData.priority].splice(updateData.idx, 1);

  return updateState({ lists: state.lists });
}

function addToList(updateData: DragData): State {
  state.lists[updateData.dropPriority].splice(state.insertIdx, 0, {
    description: updateData.description,
  });

  let newDeleteIdx: number;

  if (
    updateData.dragPriority == updateData.dropPriority &&
    state.insertIdx < updateData.taskIdx
  ) {
    newDeleteIdx = updateData.taskIdx + 1;
  } else {
    newDeleteIdx = updateData.taskIdx;
  }

  deleteTask({ priority: updateData.dragPriority, idx: newDeleteIdx });

  return updateState({ lists: state.lists });
}

function updateInsertIdx(updateData: number) {
  return updateState({ insertIdx: updateData });
}

function updateCreateTaskValue(inputValue) {
  return updateState({ createTaskValue: inputValue });
}
