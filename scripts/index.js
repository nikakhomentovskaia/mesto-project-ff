// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
// @todo: Функция создания 
const addCards = (cardData, {deleteCard}) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardElement.querySelector(".card__title").textContent = cardData.name;

    cardElement
        .querySelector(".card__delete-button")
        .addEventListener('click', () => {deleteCard(cardElement);});

    return cardElement;
};
// @todo: Функция удаления карточки
const deleteCard = (cardElement) => {
    cardElement.remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    cardContainer.append(addCards(item, {deleteCard}));
});