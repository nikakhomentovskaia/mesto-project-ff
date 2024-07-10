import { config } from "webpack";

// Функция добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}-error`);
    inputElement.classList.add(config.inputTypeErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClassActive);
};
  
  // Функция удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}-error`);
    inputElement.classList.remove(config.inputTypeErrorClass);
    errorElement.classList.remove(config.errorClassActive);
    errorElement.textContent = "";
};
  
  // Функция проверки валидности
  const isValid = (formElement, inputElement) => {
    inputElement.setCustomValidity(inputElement.validity.patternMismatch ? inputElement.dataset.errorMessage : "");
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  // Функция проверки наличия невалидных полей
  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };
  
  // Функция отключения кнопки при невалидной форме
  const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };
  
  // Функция установки слушателей событий
  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };
  
  // Функция включения валидации
  export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
      formElement.addEventListener("submit", evt => evt.preventDefault());
      setEventListeners(formElement, config);
    });
  };
  
// Функция очистки валидации при закрытии попапа
export const clearValidation = (formElement, config) => {
    formElement.querySelectorAll(config.inputSelector).forEach(inputElement => {
        hideInputError(formElement, inputElement, config);
    });

    const submitButton = formElement.querySelector(config.submitButtonSelector);
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
};

// Функция удаляет класс с ошибкой
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${config.inputErrorClass}-${inputElement.name}-error`);
    inputElement.classList.remove(config.inputTypeErrorClass);
    errorElement.classList.remove(config.errorClassActive);
    errorElement.textContent = "";
}