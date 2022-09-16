import { Modal } from "../services/modal.js";
import { category, activeTask, archivedTask } from "../services/constants.js";

export let tableFlag = "activeTask";

const todoTable = document.querySelector(".todo_table");
const archivedTable = document.querySelector(".archived_table");
const pivotTable = document.querySelector(".pivot_table_row__wrapper");
const todoTableWrapper = document.querySelector(".todo_table_row__wrapper");
const archivedTableWrapper = document.querySelector(
  ".archived_table_row__wrapper"
);

const createNoteButton = document.querySelector(".add_task__button");

const switchButtonWrapper = document.querySelector(".switch_button_wrapper");

function CreateSwitchButton() {
  switchButtonWrapper.innerHTML = "";

  const buttonContent =
    tableFlag === "activeTask" ? "Watch archived notes" : "Watch active notes";

  const switchButton = document.createElement("button");
  switchButton.classList.add("switch_button");
  switchButton.textContent = buttonContent;

  switchButtonWrapper.appendChild(switchButton);
  document.querySelector(".switch_button").addEventListener("click", () => {
    FlagSwitch();
    CreateSwitchButton();
    if (tableFlag === "activeTask") {
      InitTodoTable();
    }
    if (tableFlag === "archivedTask") {
      InitArchiveTable();
    }
  });
}

function FlagSwitch() {
  tableFlag = tableFlag === "activeTask" ? "archivedTask" : "activeTask";
}

export function InitTodoTable() {
  todoTable.style.display = "";
  archivedTable.style.display = "none";
  todoTableWrapper.innerHTML = "";
  activeTask.forEach((elem, idx) => {
    const newElement = document.createElement("div");
    newElement.classList.add("todo_table_row");
    newElement.innerHTML = `
          <div class="todo_table_row__item">${elem.name}</div>
          <div class="todo_table_row__item">${elem.creation_time}</div>
          <div class="todo_table_row__item">${elem.category}</div>
          <div class="todo_table_row__item">${elem.content}</div>
          <div class="todo_table_row__item">${elem.dates}</div>
          <div class="todo_table_row__item" ><div class="icons_wrapper" data-index=${idx}><img src="./icons/edit.png" alt="edit_icon" class="edit_icon"><img src="./icons/archive.png" alt="archive_icon" class="archive_icon"><img src="./icons/trash.png" alt="trash_icon" class="trash_icon"></div>
        </div>
        `;

    todoTableWrapper.appendChild(newElement);
  });
}

function InitArchiveTable() {
  todoTable.style.display = "none";
  archivedTable.style.display = "";
  archivedTableWrapper.innerHTML = "";
  archivedTask.forEach((elem, idx) => {
    const newElement = document.createElement("div");
    newElement.classList.add("archived_table_row");
    newElement.innerHTML = `
          <div class="archived_table_row__item">${elem.name}</div>
          <div class="archived_table_row__item">${elem.creation_time}</div>
          <div class="archived_table_row__item">${elem.category}</div>
          <div class="archived_table_row__item">${elem.content}</div>
          <div class="archived_table_row__item">${elem.dates}</div>
          <div class="archived_table_row__item" ><div class="icons_wrapper" data-index=${idx}><img src="./icons/unzip.png" alt="archive_icon" class="archive_icon"><img src="./icons/trash.png" alt="trash_icon" class="trash_icon"></div>
        </div>
        `;

    archivedTableWrapper.appendChild(newElement);
  });
}

export function InitPivotTable() {
  pivotTable.innerHTML = "";

  category.forEach((elem, idx) => {
    const activeTaskValue = activeTask.filter(
      (filterElem) => filterElem.category === elem
    ).length;

    const archivedTaskValue = archivedTask.filter(
      (filterElem) => filterElem.category === elem
    ).length;
    const newElement = document.createElement("div");
    newElement.classList.add("pivot_table_row");
    newElement.innerHTML = `
          <div class="pivot_table_row__item">${elem}</div>
          <div class="pivot_table_row__item">${activeTaskValue}</div>
          <div class="pivot_table_row__item">${archivedTaskValue}</div>
        `;

    pivotTable.appendChild(newElement);
  });
}

function DeleteNode(arr, idx) {
  if (arr === "todo_table_row__item") {
    activeTask.splice(idx, 1);
    InitTodoTable();
    InitPivotTable();
    return;
  }

  archivedTask.splice(idx, 1);
  InitArchiveTable();
}

function ArchiveNode(idx) {
  const archivedNote = activeTask[idx];
  activeTask.splice(idx, 1);
  archivedTask.push(archivedNote);
  InitTodoTable();
  InitPivotTable();
}

function unZipNode(idx) {
  const archivedNote = archivedTask[idx];
  archivedTask.splice(idx, 1);
  activeTask.push(archivedNote);
  InitArchiveTable();
  InitPivotTable();
}

function EditNode(arr, idx) {
  const task = activeTask[idx];
  Modal(
    "editNote",
    task.name,
    task.creation_time,
    task.category,
    task.content,
    task.dates,
    idx
  );
}

InitTodoTable();
InitPivotTable();
CreateSwitchButton();

createNoteButton.addEventListener("click", () => {
  Modal("createNote");
});

todoTableWrapper.addEventListener("click", (e) => {
  if (e.target.alt === "trash_icon") {
    DeleteNode(
      e.target.parentNode.parentNode.className,
      e.target.parentNode.dataset.index
    );
  }

  if (e.target.alt === "archive_icon") {
    ArchiveNode(e.target.parentNode.dataset.index);
  }
  if (e.target.alt === "edit_icon") {
    EditNode(
      e.target.parentNode.parentNode.className,
      e.target.parentNode.dataset.index
    );
  }
});

archivedTableWrapper.addEventListener("click", (e) => {
  if (e.target.alt === "trash_icon") {
    DeleteNode(
      e.target.parentNode.parentNode.className,
      e.target.parentNode.dataset.index
    );
  }

  if (e.target.alt === "archive_icon") {
    unZipNode(e.target.parentNode.dataset.index);
  }
});
