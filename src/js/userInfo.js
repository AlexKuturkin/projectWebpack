/* Класс для установки полученных данных юзера с сервера */

import {doApi} from "./api.js"
import {userName, userAbout} from "./popup.js"

export class UserInfo {
    setUserInfo(result) {
      userName.textContent = result.name;
      userAbout.textContent = result.about;
      userPhoto.style.backgroundImage = `url(${result.avatar})`;
    }
  
    renderUserInfo() {
      doApi.getUserInfo()
        .then(result => {
          changeUserInfo.setUserInfo(result);
        });
    }
  
    renderNewUserInfo() {
      doApi.setNewUserInfo()
      .then(result => {
          changeUserInfo.setUserInfo(result);
        })
    }
  }

export const changeUserInfo = new UserInfo();
export const userPhoto = document.querySelector(".user-info__photo");