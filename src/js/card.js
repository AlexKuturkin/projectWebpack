/* Класс для лайка и удаления карточек */

export class Card {
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

  export const divZoomCard = document.querySelector(".popuper__image");