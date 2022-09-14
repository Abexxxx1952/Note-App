let activeTask = [
  {
    name: "Play associations",
    creation_time: "September 14, 2022",
    category: "idea",
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
let archivedTask = [];

function Init() {
  todoTable.innerHTML = "";
  activeTask.forEach((elem, idx) => {
    let newElement = document.createElement("div");
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

    todoTable.appendChild(newElement);
  });
}

function CreateNode(name, category, content, dates, status = active) {
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
    status,
  });
}
function DeleteNode(arr, idx) {
  let regexp = /todo_table/gi;
  if (regexp.test(arr)) {
    activeTask.splice(idx, 1);
    Init();
    return;
  }

  archivedTask.splice(idx, 0);
  Init();
}

function CleanInputValue() {
  (nameInput.value = ""), (contentInput.value = ""), (datesInput.value = "");
}

const createNoteButton = document.querySelector(".add_task__button");
const mainWraper = document.querySelector(".wrapper");
const modalOverlay = document.querySelector(".modal_overlay");
const modalWraper = document.querySelector(".modal_wrapper");
const addButton = document.querySelector(".add_btn");
const nameInput = document.querySelector(".name_input input");
const categoryInput = document.querySelector(".category_input select");
const contentInput = document.querySelector(".content_input input");
const datesInput = document.querySelector(".dates_input input");
const todoTable = document.querySelector(".todo_table_row__wraper");

Init();

createNoteButton.addEventListener("click", () => {
  mainWraper.style.display = "none";
  modalWraper.style.display = "flex";
  modalOverlay.style.display = "flex";
});

modalOverlay.addEventListener("click", () => {
  mainWraper.style.display = "flex";
  modalWraper.style.display = "none";
  modalOverlay.style.display = "none";
});

addButton.addEventListener("click", () => {
  CreateNode(
    nameInput.value,
    categoryInput.value,
    contentInput.value,
    datesInput.value
  );
  console.log(categoryInput.value);
  CleanInputValue();
  Init();
  modalOverlay.click();
});

todoTable.addEventListener("click", (e) => {
  DeleteNode(
    e.target.parentNode.parentNode.className,
    e.target.parentNode.dataset.index
  );
  console.log(e.target.parentNode.dataset.index);
  console.log(e.target.parentNode.parentNode.className);
  console.log(activeTask);
});
