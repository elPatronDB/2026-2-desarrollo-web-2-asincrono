const express = require('express');
const { z } = require('zod');

const app = express();

app.use(express.json());

const userSchema = z.object({
  primer_nombre: z.string({
    required_error: "El campo 'primer_nombre' es obligatorio.",
    invalid_type_error: "'primer_nombre' debe ser una cadena de texto."
  }).min(1, "El campo 'primer_nombre' no puede estar vacío."),

  segundo_nombre: z.string({
    invalid_type_error: "'segundo_nombre' debe ser una cadena de texto."
  }).optional(),

  primer_apellido: z.string({
    required_error: "El campo 'primer_apellido' es obligatorio.",
    invalid_type_error: "'primer_apellido' debe ser una cadena de texto."
  }).min(1, "El campo 'primer_apellido' no puede estar vacío."),

  segundo_apellido: z.string({
    invalid_type_error: "'segundo_apellido' debe ser una cadena de texto."
  }).optional(),

  username: z.string({
    required_error: "El campo 'username' es obligatorio.",
    invalid_type_error: "'username' debe ser una cadena de texto."
  })
    .min(5, "El 'username' debe tener mínimo 5 caracteres.")
    .max(20, "El 'username' debe tener máximo 20 caracteres.")
    .regex(/^[a-zA-Z_]+$/, "El 'username' solamente puede contener letras o guiones bajos."),

  password: z.string({
    required_error: "El campo 'password' es obligatorio.",
    invalid_type_error: "'password' debe ser una cadena de texto."
  })
    .min(8, "El 'password' debe tener un mínimo de 8 caracteres.")
    .max(25, "El 'password' debe tener un máximo de 25 caracteres.")
    .regex(/[A-Z]/, "El 'password' debe contener al menos una letra mayúscula.")
    .regex(/[0-9]/, "El 'password' debe contener al menos un dígito.")
    .regex(/[^a-zA-Z0-9\s]/, "El 'password' debe contener al menos un símbolo.")
    .regex(/^[a-z0-9A-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, "El 'password' contiene caracteres no permitidos.")
});

app.post('/api/users/register', (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body)

    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente.",
      data: validatedData
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: "Error de validación en los datos enviados.",
        errors: errorMessages
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor."
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
