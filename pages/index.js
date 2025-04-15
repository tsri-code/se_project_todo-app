import { v4 as uuidv4 } from "https://jspm.dev/uuid";
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
    if (inputValues.date) {
      const date = new Date(inputValues.date);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      inputValues.date = date;
    }

    inputValues.id = uuidv4();
    renderTodo(inputValues);
    addTodoPopupWithForm.close();
    newTodoValidator.resetValidation();
    todoCounter.updateTotal(true);
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

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopupWithForm.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();
