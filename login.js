import bcrypt from 'bcryptjs'; // Importa bcryptjs

async function iniciarSesion() {
  const usuario = document.getElementById("usuarioInput").value;
  const contrasena = document.getElementById("contrasenaInput").value;

  if (!usuario || !contrasena) {
    alert("Por favor, ingrese su usuario y contraseña.");
    return;
  }

  // Encripta la contraseña con bcrypt
  const hashedPassword = await bcrypt.hash(contrasena, 12);

  try {
    const response = await fetch('login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `usuario=${encodeURIComponent(usuario)}&contrasena=${encodeURIComponent(hashedPassword)}`,
    });

    if (response.ok) {
      const data = await response.text();
      alert(data); // Muestra el mensaje de éxito o error del inicio de sesión
    } else {
      alert('Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al iniciar sesión');
  }

  console.log("Usuario:", usuario);
  console.log("Contraseña encriptada:", hashedPassword);
}

document.getElementById('btnIniciarSesion').addEventListener('click', iniciarSesion);

document.addEventListener('DOMContentLoaded', function() {
    // Enfocar el primer campo de entrada al cargar la página
    document.getElementById('usuarioInput').focus();

    // Configurar la navegación entre campos de entrada al presionar Tab
    document.getElementById('usuarioInput').addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            event.preventDefault(); // Evita el comportamiento predeterminado del Tab
            document.getElementById('contrasenaInput').focus(); // Enfoca el campo de contraseña
        }
    });

    // En el campo de contraseña, si Tab se presiona, va al botón de Iniciar Sesión
    document.getElementById('contrasenaInput').addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            event.preventDefault(); // Evita el comportamiento predeterminado del Tab
            document.getElementById('btnIniciarSesion').focus(); // Enfoca el botón de Iniciar Sesión
        }
    });

    // Enviar el formulario al presionar Enter en los campos de entrada
    document.getElementById('usuarioInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el comportamiento predeterminado del Enter
            document.getElementById('btnIniciarSesion').click(); // Simula hacer clic en el botón de Iniciar Sesión
        }
    });

    document.getElementById('contrasenaInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el comportamiento predeterminado del Enter
            document.getElementById('btnIniciarSesion').click(); // Simula hacer clic en el botón de Iniciar Sesión
        }
    });
});

// Función para mostrar u ocultar la contraseña
function togglePassword() {
  const passwordInput = document.getElementById('contrasenaInput');
  const toggleButton = document.getElementById('togglePassword');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  toggleButton.src = type === 'password' ? 'iconos/ojo.png' : 'iconos/ver.png';
}

// Evento clic del botón para mostrar/ocultar la contraseña
document.getElementById('togglePassword').addEventListener('click', togglePassword);

// Evento keydown para detectar la tecla Enter
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('btnIniciarSesion').click();
  }
});