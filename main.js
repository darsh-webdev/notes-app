const addBtn = document.querySelector(".add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="notes">
      <div class="tools">
      <h3 class="mode">Edit Mode: ON</h3>
      <p id="note-header" class="note-header hidden"></p>
      <input type="text" class="title-input" placeholder="Enter title...">
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="main hidden"></div>
      <textarea placeholder=" Type something..."></textarea>
    </div>
    `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const noteTitle = note.querySelector(".note-header");
  const titleInput = note.querySelector(".title-input");
  const editMode = note.querySelector(".mode");

  const mainEl = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  if (text !== "") {
    noteTitle.innerText = text.title;
    titleInput.value = text.title;
    mainEl.innerHTML = marked.parse(text.note);
    textarea.value = text.note;
    toggle();
  }

  editBtn.addEventListener("click", () => {
    toggle();
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;
    mainEl.innerHTML = marked.parse(value);
    updateLS();
  });

  titleInput.addEventListener("input", (e) => {
    const { value } = e.target;
    noteTitle.innerText = value;
    updateLS();
  });

  function toggle() {
    mainEl.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
    noteTitle.classList.toggle("hidden");
    titleInput.classList.toggle("hidden");
    editMode.classList.toggle("hidden");
  }

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  const noteTitle = document.querySelectorAll("input");

  const notes = [];
  const titles = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  noteTitle.forEach((title) => {
    titles.push(title.value);
  });

  const notesTitles = [];
  for (let i = 0; i < notes.length; i++) {
    notesTitles.push({ note: notes[i], title: titles[i] });
  }

  localStorage.setItem("notes", JSON.stringify(notesTitles));
}

//
