import React from "react";
import { func, array } from "prop-types";

import "./Today.styles.scss";
import Main from "../../components/Main/Main";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

import { formatTodaySectionDate } from "../../utils/dates";

export function RenderTodayDateTime() {
  const { todayDate, todayFormattedDate } = formatTodaySectionDate();

  return (
    <time dateTime={todayDate} className="Section__Date">
      {todayFormattedDate}
    </time>
  );
}

function Today({
  todayTodos = null,
  overdueTodos = null,
  openAddTodoModal = null,
}) {
  return (
    <Main>
      <h1 className="Page__Title">Today</h1>
      {overdueTodos && overdueTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h1 className="Section__Title">Overdue</h1>
          </header>
          <ul className="Section__Todos__List">
            {overdueTodos &&
              overdueTodos.map((todoID) => (
                <Todo key={todoID} todoID={todoID} />
              ))}
          </ul>
        </section>
      ) : null}

      <section className="Section">
        <header className="Section__Header">
          <h1 className="Section__Title">Today</h1>
          {RenderTodayDateTime()}
        </header>
        <ul className="Section__Todos__List">
          {todayTodos &&
            todayTodos.map((todoID) => <Todo key={todoID} todoID={todoID} />)}
        </ul>
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
        >
          Add todo
        </AddNew>
      </section>
    </Main>
  );
}

Today.propTypes = {
  todayTodos: array.isRequired,
  overdueTodos: array.isRequired,
  openAddTodoModal: func.isRequired,
};

export default Today;
