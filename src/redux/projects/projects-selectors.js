import { createSelector } from "reselect";

import { isPastDate, isFutureDate } from "../../utils/dates";

export const selectProject = (state, projectID) =>
  state.projects.byID[projectID];

export const selectAllProjects = (state) => Object.values(state.projects.byID);

export const selectProjects = (state) =>
  Object.values(state.projects.byID).filter(
    (project) => !project.hasOwnProperty("isInbox"),
  );

export const selectProjectTodos = (state, projectID) => {
  return Object.values(state.todos.byID).filter(
    (todo) =>
      todo.hasOwnProperty("project") &&
      todo.project.hasOwnProperty("projectID") &&
      todo.project.projectID === projectID,
  );
};

export const selectInboxProject = (state) =>
  Object.values(state.projects.byID).filter(
    (project) => project.hasOwnProperty("isInbox") && project.isInbox,
  );

export const allProjectsSelector = createSelector(
  [selectAllProjects],
  (projects) => projects,
);

export const projectsSelector = createSelector(
  [selectProjects],
  (projects) => projects,
);

export const projectSelector = createSelector(
  [selectProject],
  (project) => project,
);

export const inboxProjectSelector = createSelector(
  [selectInboxProject],
  (project) => project[0],
);

export const projectOverdueTodosSelector = createSelector(
  [selectProjectTodos],
  (todos) =>
    todos.filter((todo) => isPastDate(todo.dueDate)).map((todo) => todo.id),
);

export const projectNotOverdueTodosSelector = createSelector(
  [selectProjectTodos],
  (todos) =>
    todos
      .filter((todo) => isFutureDate(todo.dueDate) || todo.dueDate === null)
      .map((todo) => todo.id),
);
