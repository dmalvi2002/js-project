const form = document.querySelector("#new-todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const LOCAL_STORAGE_PREFIX = "ADVANCE_TODO_LIST";
const STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
let todos = loadTodos();
console.log(todos);
todos.forEach(renderTodo);

list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  todo.complete = e.target.checked;
  saveTodos();
});
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;
  const parent = e.target.closest(".list-item");
  parent.remove();
  const todoId = parent.dataset.todoId;
  todos = todos.filter((t) => t.id !== todoId);
  saveTodos();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = todoInput.value;
  if (todoName === "") return;
  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  };
  renderTodo(newTodo);
  todos.push(newTodo);
  console.log(todos);
  saveTodos();
  todoInput.value = "";
});

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true);
  const textElemnt = templateClone.querySelector("[data-list-item-text]");
  const listItem = templateClone.querySelector(".list-item");
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]");
  listItem.dataset.todoId = todo.id;
  textElemnt.innerText = todo.name;
  checkbox.checked = todo.complete;
  list.append(templateClone);
}

function loadTodos() {
  const getTodosArr = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(getTodosArr) || [];
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
