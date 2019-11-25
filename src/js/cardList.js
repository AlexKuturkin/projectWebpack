import {doApi} from "./api.js"

/* Класс для отрисовки карточек и добавления новой карточки */
export class CardList {
    constructor(array, cardsContainer) {
      this.array = array;
      this.cardsContainer = cardsContainer;
    }
  
    render(array, cardsContainer) {
      array.forEach(
        card =>
          this.cardsContainer ==
          cardsContainer.appendChild(changeCardList.addCard(card))
      );
    }
  
    renderCardList() {
      doApi.getInitialCards()
      .then(result => {
          changeCardList.render(result, cardContainer);
        })
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

  export const changeCardList = new CardList();
  export const cardContainer = document.querySelector(".places-list");