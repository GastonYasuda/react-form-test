// src/components/FormularioContacto.js
import React, { useState } from 'react';
// import enviar from '../php/enviar.php'

function FormularioContacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await fetch('../php/enviar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });



            console.log('Response:', response);
            // Agrega esta línea para ver la respuesta

            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }

            console.log('Formulario enviado correctamente');
            // Puedes manejar la respuesta o redirigir aquí después del envío exitoso
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }

        console.log('FormData:', formData);
        // console.log('URL:', '../php/enviar.php');
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" required />
            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" />
            <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Mensaje" required></textarea>
            <button type="submit">Enviar</button>
        </form>
    );
}

export default FormularioContacto;
