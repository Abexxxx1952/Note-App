import { category, activeTask, regexp } from "./constants.js";
import { InitTodoTable, InitPivotTable } from "../js/script.js";
import { tableFlag } from "../js/script.js";

const modalWraper = document.querySelector(".modal_wrapper");
const mainWraper = document.querySelector(".wrapper");

export function Modal(
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

function transformDates(dates) {
  return Array.from(dates.matchAll(regexp)).join(", ");
}
