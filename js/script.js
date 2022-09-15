const category = ["Task", "Random thought", "Idea"];

let tableFlag = "activeTask";
const activeTask = [
  {
    name: "Play associations",
    creation_time: "September 14, 2022",
    category: "Idea",
    content: "Play the association game",
    dates: "06.13.24, 06.12.24",
  },
  {
    name: "Walk the dog",
    creation_time: "September 14, 2022",
    category: "Task",
    content: "walk the dog",
    dates: "07.04.23, 08.05.23",
  },
  {
    name: "Try to nail to the sky",
    creation_time: "September 14, 2022",
    category: "Random thought",
    content: "Try to nail to the sky, interesting ...",
    dates: "01.10.22",
  },
  {
    name: "The action is performed by the beneficiary",
    creation_time: "September 14, 2022",
    category: "Random thought",
    content: "Truely-true",
    dates: "02.11.22",
  },
  {
    name: "Take out the trash",
    creation_time: "September 14, 2022",
    category: "Task",
    content: "Very important!",
    dates: "01.11.22",
  },
  {
    name: "Punish an imaginary friend",
    creation_time: "September 14, 2022",
    category: "Random thought",
    content: "He tired",
    dates: "05.12.22",
  },
  {
    name: "Drill some pear",
    creation_time: "September 14, 2022",
    category: "Task",
    content: "Some drill",
    dates: "12.12.22",
  },
];
const archivedTask = [];

const body = document.querySelector("body");
const createNoteButton = document.querySelector(".add_task__button");
const mainWraper = document.querySelector(".wrapper");
const todoTable = document.querySelector(".todo_table");
const archivedTable = document.querySelector(".archived_table");
const modalWraper = document.querySelector(".modal_wrapper");

const todoTableWraper = document.querySelector(".todo_table_row__wraper");
const archivedTableWraper = document.querySelector(
  ".archived_table_row__wraper"
);
const pivotTable = document.querySelector(".pivot_table_row__wraper");
const switchButtonWraper = document.querySelector(".switch_button_wraper");

function CreateSwitchButton() {
  switchButtonWraper.innerHTML = "";

  const buttonContent =
    tableFlag === "activeTask" ? "Watch archived notes" : "Watch active notes";

  const switchButton = document.createElement("button");
  switchButton.classList.add("switch_button");
  switchButton.textContent = buttonContent;
  console.log(switchButton);

  switchButtonWraper.appendChild(switchButton);
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
  console.log(tableFlag);
}

function InitTodoTable() {
  todoTable.style.display = "";
  archivedTable.style.display = "none";
  todoTableWraper.innerHTML = "";
  activeTask.forEach((elem, idx) => {
    const newElement = document.createElement("div");
    newElement.classList.add("todo_table_row");
    newElement.innerHTML = `
          <div class="todo_table_row__item">${elem.name}</div>
          <div class="todo_table_row__item">${elem.creation_time}</div>
          <div class="todo_table_row__item">${elem.category}</div>
          <div class="todo_table_row__item">${elem.content}</div>
          <div class="todo_table_row__item">${elem.dates}</div>
          <div class="todo_table_row__item" ><div class="icons_wraper" data-index=${idx}><img src="./icons/edit.png" alt="edit_icon" class="edit_icon"><img src="./icons/archive.png" alt="archive_icon" class="archive_icon"><img src="./icons/trash.png" alt="trash_icon" class="trash_icon"></div>
        </div>
        `;

    todoTableWraper.appendChild(newElement);
  });
}

function InitArchiveTable() {
  todoTable.style.display = "none";
  archivedTable.style.display = "";
  archivedTableWraper.innerHTML = "";
  archivedTask.forEach((elem, idx) => {
    const newElement = document.createElement("div");
    newElement.classList.add("archived_table_row");
    newElement.innerHTML = `
          <div class="archived_table_row__item">${elem.name}</div>
          <div class="archived_table_row__item">${elem.creation_time}</div>
          <div class="archived_table_row__item">${elem.category}</div>
          <div class="archived_table_row__item">${elem.content}</div>
          <div class="archived_table_row__item">${elem.dates}</div>
          <div class="archived_table_row__item" ><div class="icons_wraper" data-index=${idx}><img src="./icons/unzip.png" alt="archive_icon" class="archive_icon"><img src="./icons/trash.png" alt="trash_icon" class="trash_icon"></div>
        </div>
        `;

    archivedTableWraper.appendChild(newElement);
  });
}

function InitPivotTable() {
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

function transformDates(dates) {
  const regexp = /\d{1,2}\.\d{1,2}.\d{2,4}/g;

  return dates.match(regexp).join(", ");
}

function CreateNoteModal(name, category, content, datesprops) {
  const dates = transformDates(datesprops);
  activeTask.push({
    name,
    creation_time: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    category,
    content,
    dates,
  });
}

function EditNoteModal(
  idx,
  name,
  creation_time,
  category,
  content,
  datesprops
) {
  const dates = transformDates(datesprops);
  activeTask.splice(idx, 1, {
    name,
    creation_time,
    category,
    content,
    dates,
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

function Modal(
  action,
  inputValue = "",
  creation_time = "",
  inputCategory = "Task",
  contentContent = "",
  inputDates = "",
  idx
) {
  let actionLabel;

  switch (action) {
    case "createNote":
      actionLabel = "Add Note";
      break;
    case "editNote":
      actionLabel = "Edit Note";
      break;

    default:
      actionLabel = "?select action?";
  }

  const selectHTML = document.createElement("select");
  selectHTML.name = "category_select";
  selectHTML.id = "category_select";

  const optionHTML = document.createElement("option");
  optionHTML.value = inputCategory;
  optionHTML.innerText = inputCategory;

  selectHTML.appendChild(optionHTML);

  category.forEach((elem, idx) => {
    const optionHTML = document.createElement("option");
    optionHTML.value = elem;
    optionHTML.innerText = elem;

    if (elem === inputCategory) {
      return;
    }

    selectHTML.appendChild(optionHTML);
  });

  function CleanInputValue() {
    (nameInput.value = ""), (contentInput.value = ""), (datesInput.value = "");
  }

  modalWraper.innerHTML = `

      
        <div class="modal_content">
          <div class="name_input">
            <input type="text" placeholder="Add a name" value=${inputValue}>
          </div>
          <div class="category_input">
            <label for="category_select">Select a category:</label>
      
          </div>
          <div class="content_input">
            <input type="text" placeholder="Add a note content" value=${contentContent} >
          </div>
          <div class="dates_input">
            <input type="text" placeholder="Add a dates" value=${inputDates} >
          </div>

          <div class="submit">
            <button class="add_btn">${actionLabel}</button>
          </div>
          <div class="modal_overlay"></div>
        </div>
        `;

  const addButton = document.querySelector(".add_btn");
  const nameInput = document.querySelector(".name_input input");
  const categoryInput = document.querySelector(".category_input");

  const contentInput = document.querySelector(".content_input input");
  const datesInput = document.querySelector(".dates_input input");
  const modalOverlay = document.querySelector(".modal_overlay");

  categoryInput.appendChild(selectHTML);
  const categoryInputSelect = document.querySelector(".category_input select");
  mainWraper.style.display = "none";
  modalWraper.style.display = "flex";

  modalOverlay.style.display = "flex";

  modalOverlay.addEventListener("click", () => {
    mainWraper.style.display = "flex";
    modalWraper.style.display = "none";
    modalOverlay.style.display = "none";
  });

  switch (action) {
    case "createNote":
      addButton.addEventListener("click", () => {
        CreateNoteModal(
          nameInput.value,
          categoryInputSelect.value,
          contentInput.value,
          datesInput.value
        );

        CleanInputValue();
        if (tableFlag === "activeTask") {
          InitTodoTable();
        }
        InitPivotTable();
        modalOverlay.click();
      });
      break;
    case "editNote":
      addButton.addEventListener("click", () => {
        EditNoteModal(
          idx,
          nameInput.value,
          creation_time,
          categoryInputSelect.value,
          contentInput.value,
          datesInput.value
        );

        CleanInputValue();
        if (tableFlag === "activeTask") {
          InitTodoTable();
        }
        InitPivotTable();
        modalOverlay.click();
      });
      break;

    default:
      break;
  }
}

InitTodoTable();
InitPivotTable();
CreateSwitchButton();

createNoteButton.addEventListener("click", () => {
  Modal("createNote");
});

todoTableWraper.addEventListener("click", (e) => {
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

archivedTableWraper.addEventListener("click", (e) => {
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
