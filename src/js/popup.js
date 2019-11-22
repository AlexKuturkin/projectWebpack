/* Класс для открытия и закрытия попапов */
export class Popup {
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

export const nickForm = document.forms.edit.elements.nick;
export const aboutForm = document.forms.edit.elements.about;
export const userInfoSave = document.querySelector(".popupup__button");

export const userName = document.querySelector(".user-info__name");
export const userAbout = document.querySelector(".user-info__job");