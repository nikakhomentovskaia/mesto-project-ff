const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-17",
    headers: {
      authorization: "12393fd9-1d28-49ff-9259-b8ee19bdfcac",
      "Content-Type": "application/json",
    },
};
  
  // Обработка ответа с сервера
const handleResponse = (res) => {
    if (!res.ok) {
      throw new Error(`Ошибка ${res.status}`);
    }
  
    return res.json();
};
  
// Функция для избежания дублирования кода 
const fetchData = (url, options) => { 
    return fetch(url, options) 
    .then(checkResponse) 
};


  // Вызов информации о пользователе
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(handleResponse);
}
  
  // Вызов карточек
export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(handleResponse);
}
  
  
  // Отправка инфо о новой аватарке
export function editAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(handleResponse);
}
  
  // Отправка отредактированной инфо профиля
  export const editProfile = (formEditName, formEditDescription) => { 
    return fetchData(`${config.baseUrl}/users/me`, { 
        method: "PATCH", 
        headers: config.headers, 
        body: JSON.stringify({ 
            name: formEditName.value, 
            about: formEditDescription.value, 
        }), 
    });
};
  
  // Отправка карточки
export function getNewCard({ name, link }) {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(handleResponse);
}
  
  // Запрос на удаление карточки
export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(handleResponse);
}
  
  // Отправка инфо о лайке
export function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    }).then(handleResponse);
}
  
  // Отправка инфо о снятии лайка
export function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(handleResponse);
}