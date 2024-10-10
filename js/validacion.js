document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registroForm');
  const password1 = document.getElementById('password1');
  const password2 = document.getElementById('password2');
  const terminosCheckbox = document.getElementById('terminos');
  const terminosBoton = document.getElementById('terminosBoton');
  const terminosTexto = document.getElementById('terminosTexto');
  const terminosCheck = document.getElementById('terminosCheck');

  const checkIcons = {
      nombre: document.getElementById('nombreCheck'),
      apellido: document.getElementById('apellidoCheck'),
      email: document.getElementById('emailCheck'),
      password1: document.getElementById('password1Check'),
      password2: document.getElementById('password2Check'),
  };

  // Validación de campos al hacer submit
  form.addEventListener('submit', function (event) {
      let formIsValid = true;

      // Validación de campos vacíos y email
      const inputs = form.querySelectorAll('input[required]');
      inputs.forEach(input => {
          const checkIcon = checkIcons[input.id];
          if (!input.checkValidity()) {
              input.classList.add('is-invalid');
              input.classList.remove('is-valid');
              formIsValid = false;
          } else {
              input.classList.remove('is-invalid');
              input.classList.add('is-valid');
          }

          // Mostrar el icono de check
          if (checkIcon) {
              checkIcon.textContent = input.checkValidity() ? '✅' : '';
          }
      });

      // Validar contraseñas
      if (password1.value.length < 6) {
          password1.setCustomValidity('La contraseña debe tener al menos 6 caracteres.');
          password1.classList.add('is-invalid');
          password1.classList.remove('is-valid');
          checkIcons.password1.textContent = '';
          formIsValid = false;
      } else {
          password1.setCustomValidity(''); // Limpiar mensaje de error
          password1.classList.remove('is-invalid');
          password1.classList.add('is-valid');
          checkIcons.password1.textContent = '✅';
      }

      if (password1.value !== password2.value) {
          password2.setCustomValidity('Las contraseñas no coinciden.');
          password2.classList.add('is-invalid');
          password2.classList.remove('is-valid');
          checkIcons.password2.textContent = '';
          formIsValid = false;
      } else {
          password2.setCustomValidity(''); // Limpiar mensaje de error
          password2.classList.remove('is-invalid');
          password2.classList.add('is-valid');
          checkIcons.password2.textContent = '✅';
      }

      // Validar checkbox de términos
      if (!terminosCheckbox.checked) {
          terminosCheckbox.setCustomValidity('Debes aceptar los términos.');
          terminosTexto.textContent = "Debes aceptar los términos.";
          terminosBoton.classList.add('text-danger');
          terminosCheck.textContent = '';
          formIsValid = false;
      } else {
          terminosCheckbox.setCustomValidity(''); // Limpiar mensaje de error
          terminosTexto.textContent = "";
          terminosBoton.classList.remove('text-danger');
          terminosCheck.textContent = '✅';
      }

      // Validar el formulario al final
      if (!formIsValid) {
          event.preventDefault(); // Evita el envío si el formulario no es válido
      }
  });

  // Validación en tiempo real
  form.addEventListener('input', function (event) {
      const input = event.target;

      // Validar el campo en tiempo real
      if (input.checkValidity()) {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
      } else {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
      }

      // Mostrar el icono de check
      const checkIcon = checkIcons[input.id];
      if (checkIcon) {
          checkIcon.textContent = input.checkValidity() ? '✅' : '';
      }

      // Validar contraseñas en tiempo real
      if (input === password1 || input === password2) {
          if (password1.value === password2.value && password1.value.length >= 6) {
              password2.setCustomValidity(''); // Limpiar mensaje de error
              password2.classList.remove('is-invalid');
              password2.classList.add('is-valid');
              checkIcons.password2.textContent = '✅';
          } else {
              password2.setCustomValidity('Las contraseñas no coinciden.');
              password2.classList.add('is-invalid');
              password2.classList.remove('is-valid');
              checkIcons.password2.textContent = '';
          }
      }
  });
});

  
  
  
      