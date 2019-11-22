import {nickForm, aboutForm} from "./popup.js"

export class Api {
    constructor(cardContainer, nickForm, aboutForm) {
      this.cardContainer = cardContainer;
      this.nickForm = nickForm;
      this.aboutForm = aboutForm;
    }
  
    getUserInfo() {
      return fetch(serverUrl + "/users/me", {
        headers: {
          authorization: myAuthorization
        }
      })
        .catch(err => {
          console.log(err);
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
  
    getInitialCards() {
      return fetch(serverUrl + "/cards", {
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
        .catch(err => {
          console.log(err);
        });
    }
  
    setNewUserInfo() {
      return fetch(serverUrl + "/users/me", {
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
        .catch(err => {
          console.log(err);
        });
    }
  }

export const serverUrl =
  NODE_ENV === "development"
    ? "http://praktikum.tk/cohort4"
    : "https://praktikum.tk/cohort4";

export const myAuthorization = "7f9b7c8f-ccda-43f0-a53e-53dd5ff0c34d";
export const doApi = new Api(serverUrl, myAuthorization);