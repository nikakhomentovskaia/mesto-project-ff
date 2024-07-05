/*// получение шаблона карточки cardTemplate
function getCardTemplate() {
    return document.querySelector('#card-template').content;
}

const cardTemplate = getCardTemplate();
  
function getCardElement() {
    return cardTemplate.querySelector('.card').cloneNode(true);
}

// удаление карточки
function removeCard(card) {
    card.remove();
}
  
// лайк карточки
function likeCard(evt) {
    if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
    }
}
  
// создание карточки
function createCard({ name, link }, removeCard, openModalImage, likeCard) {

const cardElement = getCardElement();
cardElement.querySelector('.card__title').textContent = name;
const cardImage = cardElement.querySelector('.card__image');
cardImage.src = link;
cardImage.alt = name;
  
cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', () => {
        removeCard(cardElement);
    });

cardImage.addEventListener('click', () => {
    openModalImage({ name, link });
});

const likesContainer = cardElement.querySelector('.card__description');

likesContainer.addEventListener('click', (evt) => {
    likeCard(evt);
});
return cardElement;
}
  
export { removeCard, likeCard, createCard };*/

import * as modal from "./modal.js";
import * as api from "./api.js";

export const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

export function createCard(
  title,
  link,
  deleteCard,
  likeCard,
  handleImageClick,
  likes,
  userId,
  cardId,
  ownerId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  cardLikeCounter.textContent = likes.length;

  cardTitle.textContent = title;
  cardImage.src = link;
  cardImage.alt = title;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => {
    likeCard(likeButton, cardId, cardLikeCounter);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (ownerId == userId) {
    deleteButton.addEventListener("click", (evt) => {
      deleteCard(cardElement, cardId);
    });
  } else {
    deleteButton.disabled = true;
    deleteButton.style.display = "none";
  }

  if (likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
}

export function deleteCard(card, cardId) {
  const popupElement = document.querySelector(".popup_is-opened");

  api.deleteCard(cardId).then(() => {
    card.remove();
    modal.closeModal(popupElement);
  });
}

export function likeCard(cardLikeButton, cardId, cardLikesCount) {
  const likeAction = cardLikeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? api.deleteLike
    : api.addLike;
  likeAction(cardId)
    .then((res) => {
      cardLikesCount.textContent = res.likes.length;
      cardLikeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}