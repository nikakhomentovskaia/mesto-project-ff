// открытие попап
function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keyup', closeModalByEsc);
    document.addEventListener('mouseup', closeModalOnOverlay);
}
  
// закрытие попапа
function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', closeModalByEsc);
    document.removeEventListener('mouseup', closeModalOnOverlay);
}
  
// Закрытие попапа оверлей
function closeModalOnOverlay(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.target === openedPopup) {
      closeModal(openedPopup);
  }
}
  
// закрытие попапа на Esc
function closeModalByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
    }
}
  
export { openModal, closeModal, closeModalOnOverlay, closeModalByEsc };