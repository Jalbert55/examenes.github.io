<?php
$servername = "srv1062.hstgr.io";
$basededatos = "u811290313_Stratford";
$username = "u811290313_Stratford";
$password = "Nr=!7Ok6";

// Recibe los datos del usuario del formulario de inicio de sesión
$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$basededatos", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepara la consulta SQL para seleccionar el usuario con el nombre de usuario proporcionado
    $stmt = $conn->prepare("SELECT * FROM login WHERE user = :usuario");
    $stmt->bindParam(':usuario', $usuario);
    $stmt->execute();

    // Obtiene el resultado de la consulta
    $resultado = $stmt->fetch();

    // Verifica si se encontró un usuario con el nombre de usuario proporcionado
    if ($resultado) {
        // Verifica si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
        if ($contrasena === $resultado['pass']) {
            // La contraseña es correcta, el inicio de sesión es exitoso
            if ($resultado['admin'] == 1) {
                // Si el usuario es administrador, redirige a la página de profesor.html
                header('Location: profesor.html');
                exit;
            } else {
                // Si el usuario no es administrador, redirige a la página de alumno.html
                header('Location: alumno.html');
                exit;
            }
        } else {
            // La contraseña no coincide, muestra un mensaje de error
            http_response_code(401);
            echo "Usuario o contraseña incorrecta";
        }
    } else {
        // No se encontró ningún usuario con el nombre de usuario proporcionado
        http_response_code(401);
        echo "Usuario o contraseña incorrecta";
    }
} catch(PDOException $e) {
    // Captura cualquier excepción que pueda ocurrir durante la conexión o la ejecución de la consulta SQL
    http_response_code(500);
    echo "Error: " . $e->getMessage();
}
?>