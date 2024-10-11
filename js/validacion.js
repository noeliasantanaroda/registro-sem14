document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const emailInput = document.getElementById("email");
  const password1Input = document.getElementById("password1");
  const password2Input = document.getElementById("password2");
  const terminosCheckbox = document.getElementById("terminos");
  const submitButton = form.querySelector("button[type='submit']");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const showAlert = (input, message) => {
    const alert = document.createElement("div");
    alert.className = "alert alert-danger";
    alert.textContent = message;
    input.classList.add("is-invalid");

    // Insertar el mensaje de alerta después del input
    input.parentNode.insertBefore(alert, input.nextSibling);
    
    // Eliminar alerta después de un segundo
    setTimeout(() => alert.remove(), 3000);
  };

  const clearAlerts = () => {
    const alerts = document.querySelectorAll(".alert");
    alerts.forEach((alert) => alert.remove());
    form.querySelectorAll(".form-control").forEach((input) => {
      input.classList.remove("is-invalid");
      input.classList.remove("is-valid"); // Limpia el estado de validación
    });
    terminosCheckbox.classList.remove("is-invalid");
  };

  const showSuccess = (input) => {
    input.classList.add("is-valid"); // Añadir clase de éxito
  };

  const resetForm = () => {
    form.reset(); // Resetea el formulario
    clearAlerts(); // Limpia cualquier alerta
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevenir el envío del formulario hasta validar
    clearAlerts();
    let valid = true;

    // Validar campos vacíos
    [nombreInput, apellidoInput, emailInput, password1Input, password2Input].forEach((input) => {
      if (!input.value.trim()) {
        valid = false;
        showAlert(input, "Este campo no puede estar vacío.");
      } else {
        showSuccess(input); // Muestra el tic verde en los campos válidos
      }
    });

    // Validar email
    if (emailInput.value && !validateEmail(emailInput.value)) {
      valid = false;
      showAlert(emailInput, "El email no tiene un formato válido.");
    } else if (emailInput.value) {
      showSuccess(emailInput);
    }

    // Validar contraseña
    if (password1Input.value && password1Input.value.length < 6) {
      valid = false;
      showAlert(password1Input, "La contraseña debe tener al menos 6 caracteres.");
    } else if (password1Input.value) {
      showSuccess(password1Input);
    }

    // Validar coincidencia de contraseñas
    if (password1Input.value && password2Input.value && password1Input.value !== password2Input.value) {
      valid = false;
      showAlert(password2Input, "Las contraseñas no coinciden.");
    } else if (password2Input.value === password1Input.value) {
      showSuccess(password2Input);
    }

    // Validar checkbox de términos
    if (!terminosCheckbox.checked) {
      valid = false;
      showAlert(terminosCheckbox, "Debes aceptar los términos y condiciones.");
      submitButton.classList.add("btn-danger");
    } else {
      showSuccess(terminosCheckbox); // Muestra el tic verde en el checkbox
      submitButton.classList.remove("btn-danger");
    }

    if (valid) {
      // Si todos los campos son válidos, mostrar el mensaje de éxito y resetear el formulario
      alert("Registro exitoso!");
      setTimeout(() => {
        resetForm(); // Restablecer el formulario después de 2 segundos
      }, 2000);
    }
  });

  // Validaciones en tiempo real
  [nombreInput, apellidoInput, emailInput, password1Input, password2Input, terminosCheckbox].forEach((input) => {
    input.addEventListener("input", () => {
      clearAlerts(); // Limpiar alertas en tiempo real

      if (input === password2Input && password1Input.value && password2Input.value !== password1Input.value) {
        showAlert(password2Input, "Las contraseñas no coinciden.");
      }

      if (input === emailInput && emailInput.value && !validateEmail(emailInput.value)) {
        showAlert(emailInput, "El email no tiene un formato válido.");
      }

      if (input === password1Input && password1Input.value.length < 6) {
        showAlert(password1Input, "La contraseña debe tener al menos 6 caracteres.");
      }

      if (input === terminosCheckbox && !terminosCheckbox.checked) {
        showAlert(terminosCheckbox, "Debes aceptar los términos y condiciones.");
        submitButton.classList.add("btn-danger");
      } else {
        submitButton.classList.remove("btn-danger");
      }
    });
  });
});

  
  
      
