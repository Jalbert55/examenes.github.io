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