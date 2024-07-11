export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_visible'
}

    // Функция добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}-error`);
    
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

    // Функция удаляет класс с ошибкой
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${config.inputErrorClass}-${inputElement.name}-error`);
    
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
}

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
      disableSubmitButton(buttonElement, config)
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
};

  // Функция отключения кнопки отправки
const disableSubmitButton = (buttonElement, config) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
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
    disableSubmitButton(submitButton, config);
};