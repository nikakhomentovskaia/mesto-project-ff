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
  
// закрытие попапа оверлей

function closeModalOnOverlay(evt) { 
  if (evt.target.classList.contains('popup_is-opened')) { 
    closeModal(evt.target); 
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