// Переменные
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4'
const myAuthorization = "7f9b7c8f-ccda-43f0-a53e-53dd5ff0c34d";
const popUpNewCard = document.querySelector(".popup");
const popUpEdit = document.querySelector(".popupup");

const newForm = document.forms.new;
const nameForm = document.forms.new.elements.name;
const linkForm = document.forms.new.elements.link;

const editForm = document.forms.edit;
const nickForm = document.forms.edit.elements.nick;
const aboutForm = document.forms.edit.elements.about;

const buttonPlus = document.querySelector(".popup__button");

const userName = document.querySelector(".user-info__name");
const userAbout = document.querySelector(".user-info__job");
const userPhoto = document.querySelector(".user-info__photo");
const userInfoSave = document.querySelector(".popupup__button");

const divZoomCard = document.querySelector(".popuper__image");
const divZoom = document.querySelector(".popuper");

// Классы
/* Класс для установки полученных данных юзера с сервера */
class UserInfo {
  setUserInfo(res) {
    userName.textContent = res.name;
    userAbout.textContent = res.about;
    userPhoto.style.backgroundImage = `url(${res.avatar})`;
  }
}

/* Класс для открытия и закрытия попапов */
class Popup {
  open(name) {
    name.classList.add("popup_is-opened") == this.name;
  }

  close(name) {
    name.classList.remove("popup_is-opened") == this.name;
  }

  preEdit() {
    nickForm.value = userName.textContent;
    aboutForm.value = userAbout.textContent;

    nickForm.parentNode.classList.remove("form_is-invalid");
    aboutForm.parentNode.classList.remove("form_is-invalid");

    if (nickForm.value != 0 && aboutForm.value != 0) {
      userInfoSave.classList.add("button_is-active");
    }
  }

}

/* Класс для лайка и удаления карточек */
class Card {
  like() {
    if (event.target.classList.contains("place-card__like-icon")) {
      event.target.classList.toggle("place-card__like-icon_liked");
    }
  }

  remove() {
    if (event.target.classList.contains("place-card__delete-icon")) {
      event.target.closest(".place-card").remove();
    }
  }

  zoom() {
    divZoomCard.src = event.target.style.backgroundImage.slice(
      5,
      event.target.style.backgroundImage.length - 2
    );
  }
}

/* Класс для отрисовки карточек и добавления новой карточки */
class CardList {
  constructor(array, cardsContainer) {
    this.array = array;
    this.cardsContainer = cardsContainer;
  }

  render(array, cardsContainer) {
    array.forEach(
      card =>
        this.cardsContainer ==
        cardsContainer.appendChild(changeCardList.addCard(card))
    )
  }

  addCard(card) {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.innerHTML = `
    <div class="place-card__image">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <button class="place-card__like-icon"></button>
    </div>`;

    placeCard.querySelector(".place-card__name").textContent = card.name;
    placeCard.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${card.link})`;

    return placeCard;
  }
}

class Button {
  activateDisactivate(form, upInput, downInput, button) {
    form.addEventListener("input", function (event) {
      const isButton = upInput.value.length < 2 || downInput.value.length < 2;
      if (isButton) {
        button.setAttribute("disabled", isButton);
        button.classList.remove("button_is-active");
      } else {
        button.removeAttribute("disabled");
        button.classList.add("button_is-active");
      }
    });
  }

  makeButtonInactiveAfterAdd(button) {
    button.setAttribute("disabled", true);
    button.classList.remove("button_is-active");
  }
}

class Api {
  constructor(cardContainer, nickForm, aboutForm) {
    this.cardContainer = cardContainer;
    this.nickForm = nickForm;
    this.aboutForm = aboutForm;
  }

  getUserInfo() {
    fetch(serverUrl + "/users/me", {
      headers: {
        authorization: myAuthorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        changeUserInfo.setUserInfo(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getInitialCards() {
    fetch(serverUrl + "/cards", {
      headers: {
        authorization: myAuthorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        changeCardList.render(result, cardContainer);
      })
      .catch(err => {
        console.log(err);
      });
  }

  setNewUserInfo() {
    fetch(serverUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: myAuthorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nickForm.value,
        about: aboutForm.value
      })
    }) 
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(result => {
      changeUserInfo.setUserInfo(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

}

/* Создание новых объектов от классов*/
const changeUserInfo = new UserInfo();
const changePopup = new Popup();
const changeCard = new Card();
const changeCardList = new CardList();
const changeButton = new Button();
const doApi = new Api(serverUrl,
  myAuthorization);


// Обработчики //
/* Обработчик открытия окна добавления карточки */
const addButton = document.querySelector(".user-info__button");
addButton.addEventListener("click", function () {
  changePopup.open(popUpNewCard);
  changeButton.makeButtonInactiveAfterAdd(buttonPlus);
});

/* Обработчик открытия окна редактирования*/
const addButtonEdit = document.querySelector(".user-info__button-edit");
addButtonEdit.addEventListener("click", function () {
  changePopup.open(popUpEdit);
  changePopup.preEdit();
});

/* Обработчик закрытия окна добавления карточки*/
const popUpClose = document.querySelector(".popup__close");
popUpClose.addEventListener("click", function () {
  changePopup.close(popUpNewCard);
});

/* Обработчик закрытия окна редактирования*/
const popUpCloseEdit = document.querySelector(".popupup__close");
popUpCloseEdit.addEventListener("click", function () {
  changePopup.close(popUpEdit);
});

/* Обработчик открытия зума, лайка и удаления карточки*/
const cardContainer = document.querySelector(".places-list");
cardContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("place-card__image")) {
    changePopup.open(divZoom);
    changeCard.zoom();
  }

  changeCard.like();
  changeCard.remove();
});

/* Обработчик закрытия зума карточки*/
const divZoomCardClose = document.querySelector(".popuper__close");
divZoomCardClose.addEventListener("click", function () {
  changePopup.close(divZoom);
});

/* Обработчик редактирования карточки*/
editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  doApi.setNewUserInfo();
  changePopup.close(popUpEdit);
}
);

/* Обработчик валидации*/
nickForm.addEventListener("input", handleValidate);
aboutForm.addEventListener("input", handleValidate);

/* Обработчик добавления карточки*/
newForm.addEventListener("submit", function (event) {
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
doApi.getUserInfo();
/* Вызов метода получения карточек с сервера */
doApi.getInitialCards();


/**
 * Здравствуйте.
 * --Добрый день!) Вроде всё поправил)
 * Необходимо вынести за класс в константу http://95.216.175.5/cohort4/  +
 *
 * Обработчики лучше отделять от функций, с возможностью переиспользовать функцию(метод класса) +
 * editForm.addEventListener("submit", function (event) {
 *
 * Ключ тоже надо вынести за класс
 *  authorization: "7f9b7c8f-ccda-43f0-a53e-53dd5ff0c34d" +
 * передавать при вызове класса
 *
 * В классе cardList вынести из конструктора перебор в отдельный метод класса
 * Конструктор нужен только для инициализации +
 *
 *
 */


/**
 * -  Необходимо вынести за класс в константу http://95.216.175.5/cohort4/
 * -  authorization: "7f9b7c8f-ccda-43f0-a53e-53dd5ff0c34d"
 * Да, но передавать в качестве параметров при создании объекта класса API +
 *
 * Вот такие вызовы должны быть в классе к которому отни относятся, я про doApi.getInitialCards();
 *
 * Класс api с большой буквы. Все классы именуются с большой буквы(такое внегласное правило, чтобы отличать от переменных) +
 *
 * Убрать из класса
 *         userName.textContent = result.name;
        userAbout.textContent = result.about;
        userPhoto.style.backgroundImage = `url(${result.avatar})`;
  Класс API не должен знать про DOM и тем более уметь с ним работать.  +
 *
  *
  * можно лучше: метод просит чтобы вы разбили на методы более мелкие
  *  activateDisactivate(form, upInput, downInput, button) -
  *
  *
  * Совсем чуть чуть осталось, у Вас всё получится. -- спасибо)
  *
 */

/**
 * И снова я.
 * У вас класс API работает с переменными с глобальной областью видимости, это грубое нарушение.
 * Вам надо передавать переменные в конструктор и там инициализировать. +++
 *
 * в методе setNewUserInfo()  если возникнет ошибка на сервере, никто о ней не узнает.
 * Вы меняете данные в профиле, но при этом не убедились что они действительно записались на сервере.
 *  Надо исправить   ++++
 *
 *
 */

 /**
  * Работу принимаю. но... 
  * 
  * вот такого не должно бьыть в классе API как 
  *  changeCardList.render(result, cardContainer);
  * или 
  *    changeUserInfo.setUserInfo(result);
  * 
  * класс API ничего не знает о  changeUserInfo или других классах и не должен знать
  * 
  * Надеюсь с опытом это к Вам придёт 
  * 
  * 
  */