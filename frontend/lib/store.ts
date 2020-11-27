import { State, TaskData, SortedTasks } from "./types";

const state: State = {
  lists: null,
  description: null,
  priority: null,
};

export function updateState(
  action: string,
  prevState: State,
  newState: State,
  setState: (state: State) => void
) {
  switch (action) {
    case "new task":
      const { priority, description } = newState;
      setState(createTask(priority, description, prevState));
      break;

    default:
      break;
  }
}

function updateLists(lists: SortedTasks) {
  return { ...state, lists: lists };
}

function createTask(
  priority: number,
  description: string,
  prevState: State
): State {
  console.log(
    "createTask prevState",
    prevState.lists,
    priority,
    prevState.lists[priority]
  );

  const lists = prevState.lists;
  lists[priority].push({ description: description });

  return { lists, description: null, priority: null };
}

export function getState() {
  return state;
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
