import { createTask, updateTask } from './api.js';

const inputNewTodo = document.getElementById('new-todo');
const ulTodoList = document.getElementById('todo-list');

function addTaskToList(task) {
  const li = document.createElement('li');
  li.setAttribute('data-id', task.id);
  li.innerHTML = `
    <span>${task.description}</span>
    <button class="toggle-status">${task.status === 'pending' ? 'Concluir' : 'Reabrir'}</button>
  `;
  ulTodoList.appendChild(li);
}

function updateTaskInDOM(updatedTask) {
  const li = document.querySelector(`li[data-id="${updatedTask.id}"]`);
  if (li) {
    li.innerHTML = `
      <span>${updatedTask.description}</span>
      <button class="toggle-status">${updatedTask.status === 'pending' ? 'Concluir' : 'Reabrir'}</button>
    `;
  }
}

inputNewTodo.addEventListener('keypress', async (event) => {
  if (event.key === 'Enter') {
    const taskText = event.target.value.trim();
    if (taskText !== '') {
      const taskData = { description: taskText, status: 'pending' };
      const newTask = await createTask(taskData);
      if (newTask) {
        addTaskToList(newTask);
      }
      event.target.value = '';
    }
  }
});

ulTodoList.addEventListener('click', async (event) => {
  if (event.target.classList.contains('toggle-status')) {
    const li = event.target.closest('li');
    const taskId = li.getAttribute('data-id');
    const newStatus = event.target.textContent === 'Concluir' ? 'done' : 'pending';
    const updatedTask = await updateTask(taskId, { status: newStatus });
    if (updatedTask) {
      updateTaskInDOM(updatedTask);
    }
  }
});
