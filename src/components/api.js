const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-17",
    headers: {
      authorization: "12393fd9-1d28-49ff-9259-b8ee19bdfcac",
      "Content-Type": "application/json",
    },
};
  
  // Обработка ответа с сервера
const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};
  
  // Функция для избежания дублирования кода
const fetchData = (url, options) => {
    return fetch(url, options)
      .then(checkResponse)
      .catch((err) => console.log(err));
};
  
  // Загрузка
export const renderLoading = (isLoading) => {
    document.querySelectorAll(".popup__button").forEach(button => {
      button.textContent = isLoading ? "Сохранение..." : "Сохранить";
    });
};
  
  // Вызов информации о пользователе
export const infoForMe = () => {
    return fetchData(`${config.baseUrl}/users/me`, { headers: config.headers });
};
  
  // Вызов карточек
export const getInitialCards = () => {
    return fetchData(`${config.baseUrl}/cards`, { headers: config.headers });
};
  
  // Отправка инфо о новой аватарке
export const editAvatar = (formEditLink) => {
    return fetchData(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ avatar: formEditLink.value }),
    }).finally(() => renderLoading(false));
};
  
  // Отправка отредактированной инфо профиля
export const editProfile = (formEditName, formEditDescription) => {
    return fetchData(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: formEditName.value,
        about: formEditDescription.value,
      }),
    }).finally(() => renderLoading(false));
};
  
  // Отправка карточки
export const postNewCard = (item) => {
    return fetchData(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).finally(() => renderLoading(false));
};
  
  // Запрос на удаление карточки
export const deleteCardServer = (cardId) => {
    return fetchData(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    });
};
  
  // Отправка инфо о лайке
export const putLikeServer = (cardId) => {
    return fetchData(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    });
};
  
  // Отправка инфо о снятии лайка
export const deleteLikeServer = (cardId) => {
    return fetchData(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    });
};