import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};

    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });

    if (values.date) {
      const date = new Date(values.date);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      values.date = date;
    }

    values.id = uuidv4();

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
}

export default PopupWithForm;
