import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const addTodoPopupWithForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    renderTodo(inputValues);
    addTodoPopupWithForm.close();
    newTodoValidator.resetValidation();
  },
});
addTodoPopupWithForm.setEventListeners();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleTodoCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleTodoDelete(wasCompleted) {
  todoCounter.updateTotal(false);

  if (wasCompleted) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleTodoCheck,
    handleTodoDelete
  );
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
  todoCounter.updateTotal(true);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopupWithForm.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();
