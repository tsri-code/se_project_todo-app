class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = formElement;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  resetValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      this._hideInputError(this._formElement, inputElement);
    });

    this._toggleButtonState(inputList, buttonElement);
    this._formElement.reset();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
