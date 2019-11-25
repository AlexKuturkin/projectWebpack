import "./style.css";
import {Button} from "./js/button.js"
import {Popup, nickForm, aboutForm, userInfoSave} from "./js/popup.js"
import {changeUserInfo} from "./js/userInfo.js"
import {Card} from "./js/card.js"
import {changeCardList, cardContainer} from "./js/cardList.js"
import {handleValidate} from "./js/functions.js"


// Переменные
const popUpNewCard = document.querySelector(".popup");
const popUpEdit = document.querySelector(".popupup");
const divZoom = document.querySelector(".popuper");

const newForm = document.forms.new;
const nameForm = document.forms.new.elements.name;
const linkForm = document.forms.new.elements.link;

const editForm = document.forms.edit;

const buttonPlus = document.querySelector(".popup__button");


/* Создание новых объектов от классов*/
const changePopup = new Popup();
const changeCard = new Card();
const changeButton = new Button();


// Обработчики //
/* Обработчик открытия окна добавления карточки */
const addButton = document.querySelector(".user-info__button");
addButton.addEventListener("click", function() {
  changePopup.open(popUpNewCard);
  changeButton.makeButtonInactiveAfterAdd(buttonPlus);
});

/* Обработчик закрытия окна добавления карточки*/
const popUpClose = document.querySelector(".popup__close");
popUpClose.addEventListener("click", function() {
  changePopup.close(popUpNewCard);
  nameForm.value = '';
  linkForm.value = '';
});

/* Обработчик открытия окна редактирования*/
const addButtonEdit = document.querySelector(".user-info__button-edit");
addButtonEdit.addEventListener("click", function() {
  changePopup.open(popUpEdit);
  changePopup.preEdit();
});

/* Обработчик закрытия окна редактирования*/
const popUpCloseEdit = document.querySelector(".popupup__close");
popUpCloseEdit.addEventListener("click", function() {
  changePopup.close(popUpEdit);
});

/* Обработчик открытия зума, лайка и удаления карточки*/
cardContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains("place-card__image")) {
    changePopup.open(divZoom);
    changeCard.zoom();
  }
  changeCard.like();
  changeCard.remove();
});

/* Обработчик закрытия зума карточки*/
const divZoomCardClose = document.querySelector(".popuper__close");
divZoomCardClose.addEventListener("click", function() {
  changePopup.close(divZoom);
});

/* Обработчик редактирования карточки*/
editForm.addEventListener("submit", function(event) {
  event.preventDefault();
  /* Вызов метода изменения данных юзера*/
  changeUserInfo.renderNewUserInfo();
  changePopup.close(popUpEdit);
});

/* Обработчик валидации*/
nickForm.addEventListener("input", handleValidate);
aboutForm.addEventListener("input", handleValidate);

/* Обработчик добавления карточки*/
newForm.addEventListener("submit", function(event) {
  event.preventDefault();
  cardContainer.appendChild(
    changeCardList.addCard({
      name: nameForm.value,
      link: linkForm.value
    })
  );
  changePopup.close(popUpNewCard);
  newForm.reset();
});


// Вызовы методов //
/* Вызов методов активации-дезактивации кнопок + и Сохранить*/
changeButton.activateDisactivate(newForm, nameForm, linkForm, buttonPlus);
changeButton.activateDisactivate(editForm, nickForm, aboutForm, userInfoSave);
/* Вызов метода получения данных юзера с сервера*/
changeUserInfo.renderUserInfo();
/* Вызов метода получения карточек с сервера */
changeCardList.renderCardList();