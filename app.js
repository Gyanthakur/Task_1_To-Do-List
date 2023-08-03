const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(task => {
      addTaskToList(task);
    });
  }
});

addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    return;
  }

  addTaskToList(taskText);
  tasks.push(taskText);
  saveTasksToLocalStorage();
  taskInput.value = '';
}

function addTaskToList(taskText) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.innerHTML = `
    <span class="todo-text">${taskText}</span>
    <button class="remove-btn">Done</button>
  `;
  taskList.appendChild(li);
}

taskList.addEventListener('click', removeTask);

function removeTask(event) {
  if (event.target.classList.contains('remove-btn')) {
    const listItem = event.target.parentElement;
    taskList.removeChild(listItem);

    // Remove task from the tasks array
    const taskText = listItem.querySelector('.todo-text').textContent;
    tasks = tasks.filter(task => task !== taskText);
    saveTasksToLocalStorage();
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
