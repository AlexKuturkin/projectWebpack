export class Button {
    activateDisactivate(form, upInput, downInput, button) {
      form.addEventListener("input", function(event) {
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