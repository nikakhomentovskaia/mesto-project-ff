import "../pages/index.css";
import * as modal from "../components/modal.js";
import * as card from "../components/card.js";
import * as validation from "../components/validation.js";
import * as api from "../components/api.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editAvatarPopup = document.querySelector(".popup_type_avatar");
const closePopupButtons = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImg = document.querySelector(".profile__image");

const cardPopup = document.querySelector(".popup_type_image");
const cardPopupImg = document.querySelector(".popup__image");
const cardPopupTitle = document.querySelector(".popup__caption");

const popupAvatarForm = document.forms["edit-avatar"];
const avatarInput = popupAvatarForm.elements.avatar;
let userId;

const popupProfileForm = document.forms["edit-profile"];
const popupInputProfileName = popupProfileForm.elements.name;
const popupInputProfileDescription = popupProfileForm.elements.description;

avatarButton.addEventListener("click", function () {
  modal.openModal(editAvatarPopup);
  avatarInput.value = "";
  validation.clearValidation(popupAvatarForm, validationConfig);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const popupElement = document.querySelector(".popup_is-opened");
  renderLoading(true, popupElement);

  api
    .editProfileInfo({
      name: popupInputProfileName.value,
      about: popupInputProfileDescription.value,
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      modal.closeModal(editPopup);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    });
}

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

editProfileButton.addEventListener("click", () => {
  popupInputProfileName.value = profileTitle.textContent;
  popupInputProfileDescription.value = profileDescription.textContent;
  modal.openModal(editPopup);
  validation.clearValidation(popupProfileForm, validationConfig);
});

const popupNewCardForm = document.forms["new-place"];
const popupInputCardName = popupNewCardForm.elements["place-name"];
const popupInputCardLink = popupNewCardForm.elements.link;

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const popupElement = document.querySelector(".popup_is-opened");
  renderLoading(true, popupElement);

  api
    .newCard({
      name: popupInputCardName.value,
      link: popupInputCardLink.value,
    })
    .then((newCard) => {
      card.placesList.prepend(
        card.createCard(
          newCard.name,
          newCard.link,
          card.deleteCard,
          card.likeCard,
          handleImageClick,
          newCard.likes,
          userId,
          newCard._id,
          newCard.owner._id
        )
      );
    })
    .then(() => {
      modal.closeModal(newCardPopup);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    });
  popupNewCardForm.reset();
}

popupNewCardForm.addEventListener("submit", handleCardFormSubmit);

addCardButton.addEventListener("click", () => {
  modal.openModal(newCardPopup);
  validation.clearValidation(popupNewCardForm, validationConfig);
});

closePopupButtons.forEach((item) => {
  const popup = item.closest(".popup");
  item.addEventListener("click", () => modal.closeModal(popup));
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

window.addEventListener("load", function () {
  validation.enableValidation(validationConfig);
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    profileDescription.textContent = userData.about;
    profileTitle.textContent = userData.name;
    profileImg.style = `background-image: url('${userData.avatar}')`;
    userId = userData._id;

    cardData.forEach(function (cardElem) {
      card.placesList.append(
        card.createCard(
          cardElem.name,
          cardElem.link,
          card.deleteCard,
          card.likeCard,
          handleImageClick,
          cardElem.likes,
          userId,
          cardElem._id,
          cardElem.owner._id
        )
      );
    });
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error);
  });

function renderLoading(isLoading, popupElement) {
  const activeButton = popupElement.querySelector(".popup__button");
  if (isLoading) {
    activeButton.textContent = "Сохранение...";
  } else {
    activeButton.textContent = "Сохранить";
  }
}

popupAvatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const popupElement = document.querySelector(".popup_is-opened");
  renderLoading(true, popupElement);

  api
    .editAvatar(avatarInput.value)
    .then((data) => {
      userAvatar.style.backgroundImage = `url('${data.avatar}')`;
      modal.closeModal(editAvatarPopup);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    });
});

function handleImageClick(evt) {
  cardPopupImg.alt = evt.target.alt;
  cardPopupImg.src = evt.target.src;
  cardPopupTitle.textContent = evt.target.alt;

  modal.openModal(cardPopup);
}