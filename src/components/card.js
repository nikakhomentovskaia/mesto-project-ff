// получение шаблона карточки cardTemplate
function getCardTemplate() {
    return document.querySelector('#card-template').content;
}

const cardTemplate = getCardTemplate();

function getCardElement() {
    return cardTemplate.querySelector('.card').cloneNode(true);
}
  
// увеличенное изображение
const popupImage = document.querySelector('.popup_type_image');
  
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
    openModalImage({ name, link }, popupImage);
});

const likesContainer = cardElement.querySelector('.card__description');

likesContainer.addEventListener('click', (evt) => {
    likeCard(evt);
});
return cardElement;
}
  
export { removeCard, likeCard, createCard };