let listTasks = [];
let isEdit = false;
let idEdit = null;
let listTasksOrigin = [];
// Add new task
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const valueInput = document.querySelector(".form-input").value;
  if (!valueInput) {
    console.log(valueInput);
    alert("Please, Enter your task!");
    return;
  }

  if (!isEdit) {
    const newTask = {
      id: Math.floor(Math.random() * 100000),
      isDone: false,
      title: valueInput,
    };

    listTasks.push(newTask);
  } else {
    listTasks.forEach((task) => {
      if (task.id === idEdit) {
        task.title = valueInput;
      }
    });
    handleEditFinished();
    document.querySelector(".btn-add").innerHTML = "ADD";
    isEdit = false;
  }

  document.querySelector(".form-input").value = "";
  renderTask();
});

// Render UI
function renderTask() {
  let html = "";
  for (let i in listTasks) {
    let newTaskHTML = `
        <li class="task-item ${listTasks[i].isDone ? "done" : "undone"}" 
       
        >
        <div class="task-item__title"  onclick="handleToggleStatic(${
          listTasks[i].id
        })">
          <p>${listTasks[i].title}</p>
        </div>
        <div class="task-item__action">
          <div class="delete"   onclick="handleDeleteTask(${listTasks[i].id})">
          <i class="fa-solid fa-trash"></i>
          </div>
          <div class="edit"  onclick="handleEditTask(${listTasks[i].id})"
          ><i class="fa-solid fa-pen-to-square"></i></div>
        </div>
      </li>
        `;

    html += newTaskHTML;
  }

  document.querySelector(".list-task").innerHTML = html;
}

// Toggle static task
function handleToggleStatic(id) {
  listTasks.forEach((task) => {
    if (task.id === id) {
      task.isDone = !task.isDone;
      return;
    }
  });

  renderTask();
}

// Delete task
function handleDeleteTask(id) {
  listTasks = listTasks.filter((task) => task.id !== id);
  renderTask();
}

function handleEditTask(id) {
  isEdit = true;
  idEdit = id;
  document.querySelector(".btn-add").innerHTML = "EDIT";
  const taskEdit = listTasks.filter((task) => task.id === id);
  console.log(taskEdit);
  document.querySelector(".form-input").value = taskEdit[0].title;
}

function handleSortTask(id) {
  const sortBtns = document.querySelectorAll(".btn-sort");
  document.querySelector(".btn-sort.active").classList.remove("active");
  sortBtns[id].classList.add("active");
  listTasksOrigin = [...listTasks];
  if (id === 0) {
    listTasks = [...listTasksOrigin];
  } else if (id === 1) {
    let taskDone = listTasksOrigin.filter((task) => task.isDone);
    listTasks = [...taskDone];
  } else if (id === 2) {
    let taskUnDone = listTasksOrigin.filter((task) => !task.isDone);
    listTasks = [...taskUnDone];
  }
  renderTask();
  listTasks = [...listTasksOrigin];
}

function handleEditFinished() {
  console.log("Hello");
  const main = document.querySelector(".toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, 3000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };
    toast.classList.add("toast-item");
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s 0.5s forwards`;

    toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid fa-circle-check"></i></div>
    <div class="toast-message">Edit Successfully</div>
    <div class="toast-delete"><i class="fa-solid fa-x"></i></div>
                `;
    main.appendChild(toast);
  }
}
