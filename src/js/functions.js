// Функции
/* Функция проверки валидации в инпутах*/
function handleValidate(event) {
    event.target.parentNode.classList.remove("form_is-invalid");
    event.target.textContent = "";
    validate(event.target);
  }
  
  /* Функция валидации */
  function validate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
  
    if (element.value.length == 0) {
      errorElement.textContent = "Это обязательное поле";
      element.parentNode.classList.add("form_is-invalid");
      return false;
    } else if (element.value.length < 2) {
      errorElement.textContent = "Должно быть от 2 до 30 символов";
      element.parentNode.classList.add("form_is-invalid");
      return false;
    }
    return true;
  }