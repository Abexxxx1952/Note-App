import { category, activeTask, regexp } from "./constants.js";
import { InitTodoTable, InitPivotTable } from "../js/script.js";
import { tableFlag } from "../js/script.js";

const modalWrapper = document.querySelector(".modal_wrapper");
const mainWrapper = document.querySelector(".wrapper");

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

  modalWrapper.innerHTML = `

      
        <div class="modal_content">
        
          <div class="name_input">
            <input type="text" placeholder="Add a name" required value=${inputValue} >
            <div><p>Required</p></div>
          </div>
          <div class="category_input">
            <label for="category_select">Select a category:</label>
      
          </div>
          <div class="content_input">
            <input type="text" placeholder="Add a note content" required value=${contentContent} >
            <div><p>Required</p></div>
          </div>
          <div class="dates_input">
            <input type="text" placeholder="Add a dates" required value=${inputDates} >
           <div><p>Required</p></div>
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
  mainWrapper.style.display = "none";
  modalWrapper.style.display = "flex";

  modalOverlay.style.display = "flex";

  modalOverlay.addEventListener("click", () => {
    mainWrapper.style.display = "flex";
    modalWrapper.style.display = "none";
    modalOverlay.style.display = "none";
  });

  switch (action) {
    case "createNote":
      addButton.addEventListener("click", () => {
        if (
          ValidationFields(
            nameInput.value,
            categoryInputSelect.value,
            contentInput.value,
            datesInput.value
          )
        ) {
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
        }
      });
      break;
    case "editNote":
      addButton.addEventListener("click", () => {
        if (
          ValidationFields(
            nameInput.value,
            categoryInputSelect.value,
            contentInput.value,
            datesInput.value
          )
        ) {
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
        }
      });
      break;

    default:
      break;
  }
}

function CreateNoteModal(name, category, content, datesProps) {
  const dates = TransformDates(datesProps);

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
  datesProps
) {
  const dates = TransformDates(datesProps);
  activeTask.splice(idx, 1, {
    name,
    creation_time,
    category,
    content,
    dates,
  });
}

function TransformDates(dates) {
  return Array.from(dates.matchAll(regexp)).join(", ");
}

function ValidationFields(name, category, content, datesProps) {
  return name === "" || category === "" || content === "" || datesProps === ""
    ? false
    : true;
}
