const buttonCloseModal = document.querySelector(".modal_button");
const buttonAddNote = document.querySelector(".addNote");
const buttonSubmitForm = document.querySelector(".form_button");
const modalForm = document.querySelector(".modal");
const modalDialog = document.querySelector(".modal_dialog");
const form = document.querySelector(".form");
const noteList = document.querySelector(".notes_area");
const formTitle = document.querySelector(".form_input__title");
const formDescription = document.querySelector(".form_input__description");
const formColor = document.querySelector(".form_radiobuttons");
const search = document.querySelector(".search_input");

let titleError = false;
let descriptionError = false;
let titleEditError = false;
let descriptionEditError = false;

let editMode = false;
let editItem = null;
let filter = "";
let deletedItem = null;

if (!document.location.pathname.includes("favorites")) {
  buttonCloseModal.addEventListener("click", closeModalForm);
  buttonAddNote.addEventListener("click", openModalForm);
  form.addEventListener("submit", validateAndCreateNewNote);
}

noteList.addEventListener("click", clickButtonNotes);
search.addEventListener("input", filterNotes);

function clickButtonNotes(e) {
  const clickButton = e.target.innerHTML;
  const id = e.target.closest(".note").id;
  switch (clickButton) {
    case "edit":
      if (editMode) {
        closeEditMode();
      }
      editNote(id);
      break;
    case "delete":
      deletedItem = id;
      openModalDialog();
      break;
    case "close":
      closeEditMode();
      break;
    case "done":
      if (!titleEditError && !descriptionEditError) {
        validateAndUpdateNotes(id);
      }
      break;
  }
  if (clickButton.includes("star")) {
    changeFavorites(id);
  }
}

function closeEditMode() {
  titleEditError = false;
  descriptionEditError = false;
  editMode = false;
  editItem = null;
  drawNotes();
}

function changeFavorites(id) {
  let noteList = JSON.parse(localStorage.getItem("notes"));
  let UpdatedNote = noteList.find((item) => item.id === +id);
  UpdatedNote.favorites = !UpdatedNote.favorites;
  localStorage.setItem("notes", JSON.stringify(noteList));
  drawNotes();
}

function filterNotes() {
  drawNotes(search.value);
}

async function validateAndUpdateNotes(id) {
  const editFormTitle = document.querySelector(".note_input");
  const editFormDescription = document.querySelector(".note_textarea");
  const buttonDone = document.querySelector(".note_button__done");

  titleEditError = isValidValue(editFormTitle.value, editFormTitle, buttonDone, true);
  descriptionEditError = isValidValue(editFormDescription.value, editFormDescription, buttonDone);
  if (!titleEditError && !descriptionEditError) {
    await updateNotes(editFormTitle.value, editFormDescription.value, id);
    closeEditMode();
  } else {
    buttonDone.classList.add("note_button__disabled");
  }
}

async function updateNotes(title, description, id) {
  let noteList = JSON.parse(localStorage.getItem("notes"));
  let updatedNote = noteList.find((item) => item.id === +id);
  updatedNote.title = title;
  updatedNote.description = description;
  updatedNote.updating = true;
  (updatedNote.date = Date.now()), localStorage.setItem("notes", JSON.stringify(noteList));
}

function editNote(id) {
  editMode = true;
  editItem = id;
  const editingItem = document.getElementById(id);
  const noteList = JSON.parse(localStorage.getItem("notes"));
  const editingNote = noteList.find((item) => item.id === +id);
  editingItem.innerHTML = editNoteInner(editingNote);
}

function deleteNote(id) {
  const noteList = JSON.parse(localStorage.getItem("notes"));
  const newList = noteList.filter((item) => item.id !== +id);
  localStorage.setItem("notes", JSON.stringify(newList));
  deletedItem = null;
  closeModalDialog();
  drawNotes();
}

function closeModalForm() {
  formTitle.value = "";
  formDescription.value = "";
  titleEditError = false;
  descriptionEditError = false;
  removeError(formTitle, buttonSubmitForm);
  removeError(formDescription, buttonSubmitForm);
  modalForm.classList.add("modal_close");
}

function openModalForm() {
  if (editMode) {
    drawNotes();
  }
  modalForm.classList.remove("modal_close");
}

function openModalDialog() {
  modalDialog.classList.remove("modal_close");
  const buttonYes = document.querySelector(".modal_button__yes");
  const buttonNo = document.querySelector(".modal_button__no");
  buttonYes.addEventListener("click", () => deleteNote(deletedItem));
  buttonNo.addEventListener("click", closeModalDialog);
}

function closeModalDialog() {
  modalDialog.classList.add("modal_close");
}

function isValidValue(value, element, button, isTitle = false) {
  if (value.length >= 5 && (isTitle ? value.length <= 15 : value.length <= 100)) {
    return false;
  }
  element.classList.add("form_input__validationError");
  element.addEventListener("input", () => removeError(element, button), { once: true });
  return true;
}

function removeError(element, button) {
  element.classList.remove("form_input__validationError");

  switch (element.dataset.type) {
    case "titleForm":
      titleError = false;
      break;
    case "descriptionForm":
      descriptionError = false;
      break;
    case "titleNote":
      titleEditError = false;
      break;
    case "descriptionNote":
      descriptionEditError = false;
      break;
  }

  if (!titleError && !descriptionError && !titleEditError && !descriptionEditError) {
    button.classList.remove(
      element.dataset.place === "form" ? "form_button__disabled" : "note_button__disabled"
    );
  }
}

async function createNewNote() {
  const colorNewNote = document.querySelector('input[name="color"]:checked').value;
  const newNote = await createNoteObject(formTitle.value, formDescription.value, colorNewNote);
  const noteList = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
  localStorage.setItem("notes", JSON.stringify([...noteList, newNote]));
}

function validateAndCreateNewNote(e) {
  titleError = isValidValue(formTitle.value, formTitle, buttonSubmitForm, true);
  descriptionError = isValidValue(formDescription.value, formDescription, buttonSubmitForm);
  if (!titleError && !descriptionError) {
    createNewNote();
    drawNotes();
  } else {
    e.preventDefault();
    buttonSubmitForm.classList.add("form_button__disabled");
  }
}

function createNoteObject(title, description, color) {
  const newObject = {
    id: Date.now(),
    title: title,
    description: description,
    color: color,
    date: Date.now(),
    favorites: false,
    updating: false,
  };
  return newObject;
}

function drawNotes(filter) {
  const location = document.location.pathname;
  let list = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : null;
  noteList.innerHTML = "";
  if (list.length > 0) {
    if (location.includes("favorites")) {
      list = list.filter((item) => item.favorites);
    }
    if (filter || (search && search.value.length > 0)) {
      list = list.filter((item) => item.title.indexOf(filter ? filter : search.value) > -1);
    }
    list.forEach((element) => {
      drawNote(element);
    });
  } else {
    const emptyList = document.createElement("div");
    emptyList.className = "note_empty";
    emptyList.innerHTML = "You haven't any notes";
    noteList.append(emptyList);
  }
  if (editMode) {
    editNote(editItem);
  }
}

function drawNote(note) {
  const newNote = document.createElement("div");
  newNote.className = "note";
  newNote.id = note.id;
  newNote.innerHTML = createNote(note);
  noteList.append(newNote);
}

function createNote(item) {
  const date = new Date(item.date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const note = `
        <h3 class="note_title" style='background-color: ${item.color}'>${item.title}</h3>
        <div class="note_content">
          <div class="note_content__left">
            <div class="note_description">${item.description}</div>
            <div class="note_dateBlock">
            ${
              item.updating
                ? `<span class="note_updated">Updated&ensp;</span>`
                : `<span class="note_updated"></span>`
            }              
              <div class="note_date">${hours > 9 ? hours : "0" + hours}:${
    minutes > 9 ? minutes : "0" + minutes
  } ${day > 9 ? day : "0" + day}.${month > 8 ? month + 1 : "0" + (month + 1)}.${year}</div>
            </div>
          </div>
          <div class="note_buttons">
          <button class="note_button note_button__favorite">
              <span class="material-icons">${item.favorites ? "star" : "star_outlined"}</span>
            </button>
            <button class="note_button note_button__edit">
              <span class="material-icons">edit</span>
            </button>
            <button class="note_button note_button__delete">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>`;
  return note;
}

function editNoteInner(item) {
  const note = `
        <h3 class="note_title" style='background-color: ${item.color}'>
          <input class = 'note_input form_input' type=text value=${item.title} data-type='titleNote' data-place='note'/>
        </h3>
        <div class="note_content">
            <div class="note_description">
              <textarea class = 'note_textarea form_input' data-type='descriptionNote' data-place='note'>${item.description}</textarea>
            </div>
          <div class="note_buttons">
            <button class="note_button note_button__done">
              <span class="material-icons">done</span>
            </button>
            <button class="note_button note_button__close">
              <span class="material-icons">close</span>
            </button>
          </div>
        </div>`;
  return note;
}

drawNotes();
