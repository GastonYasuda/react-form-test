<?php
// Ejemplo básico de manejo de errores en enviar.php

$data = json_decode(file_get_contents('php://input'), true);

// Verificación básica de datos
if (!isset($data['nombre'], $data['email'], $data['mensaje'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Por favor, complete todos los campos obligatorios.']);
  exit;
}

// Procesamiento del correo electrónico y envío
$para = 'ryoyasu52@gmail.com'; // Cambia esto al correo al que quieres recibir los mensajes
$asunto = 'Nuevo mensaje de contacto';
$contenido = "Nombre: {$data['nombre']} \n";
$contenido .= "Email: {$data['email']} \n";
$contenido .= "Mensaje: \n{$data['mensaje']} \n";
$cabeceras = "From: {$data['email']}";

if (mail($para, $asunto, $contenido, $cabeceras)) {
  echo json_encode(['success' => '¡El mensaje ha sido enviado correctamente!']);
} else {
  http_response_code(500);
  echo json_encode(['error' => 'Error al enviar el mensaje. Por favor, intenta nuevamente más tarde.']);
}
