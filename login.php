<?php
$servername = "srv1062.hstgr.io";
$basededatos = "u811290313_Stratford";
$username = "u811290313_Stratford";
$password = "Nr=!7Ok6";

// Recibe los datos del usuario del formulario de inicio de sesión
$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

try{
  $conn = new PDO("mysql:host=$servername;dbname=$basededatos", $username, $password);
  $conn ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Prepara la consulta SQL para seleccionar el usuario con el nombre de usuario proporcionado
  $stmt = $conn->prepare("SELECT * FROM login WHERE user = :usuario");
  $stmt->bindParam(':usuario', $usuario);
  $stmt->execute();

  // Obtiene el resultado de la consulta
      $resultado = $stmt->fetch();

      // Verifica si se encontró un usuario con el nombre de usuario proporcionado
      if ($resultado) {
          // Verifica si la contraseña proporcionada coincide con la contraseña almacenada (encriptada) en la base de datos
          if (password_verify($contrasena, $resultado['pass'])) {
              // La contraseña es correcta, el inicio de sesión es exitoso
              echo "Inicio de sesión exitoso";
          } else {
              // La contraseña no coincide, muestra un mensaje de error
              echo "Contraseña incorrecta";
          }
      } else {
          // No se encontró ningún usuario con el nombre de usuario proporcionado
          echo "Usuario no encontrado";
      }
  } catch(PDOException $e) {
      // Captura cualquier excepción que pueda ocurrir durante la conexión o la ejecución de la consulta SQL
      echo "Error: " . $e->getMessage();
  }
}
?>