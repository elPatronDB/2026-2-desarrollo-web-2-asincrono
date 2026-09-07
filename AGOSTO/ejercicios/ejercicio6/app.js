const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
let proveedores = [
    {
        id: 1,
        nombreComercial: "ProveeTodo S.A.",
        Telefono: "12345678",
        email: "contacto@proveetodo.com"
    }
];

const validarProveedor = (data) => {
    const { nombreComercial, Telefono, email } = data;

    if (!nombreComercial || !Telefono || !email) {
        return "Todos los campos son requeridos (nombreComercial, Telefono, email).";
    }

    if (nombreComercial.length > 50) {
        return "El nombreComercial no debe exceder los 50 caracteres.";
    }
    if (!/^\d{8}$/.test(Telefono)) {
        return "El Telefono debe contener exactamente 8 dígitos.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "El email no tiene un formato válido.";
    }

    return null; 
};

app.get('/api/proveedores', (req, res) => {
    res.json(proveedores);
});
app.get('/api/proveedores/:id', (req, res) => {
    const proveedor = proveedores.find(p => p.id === parseInt(req.params.id));
    if (!proveedor) {
        return res.status(404).json({ error: "Proveedor no encontrado." });
    }
    res.json(proveedor);
});

app.post('/api/proveedores', (req, res) => {
    const errorValidacion = validarProveedor(req.body);
    
    if (errorValidacion) {
        return res.status(400).json({ error: errorValidacion });
    }

    const nuevoProveedor = {
        id: proveedores.length > 0 ? proveedores[proveedores.length - 1].id + 1 : 1,
        nombreComercial: req.body.nombreComercial,
        Telefono: req.body.Telefono,
        email: req.body.email
    };

    proveedores.push(nuevoProveedor);
    res.status(201).json(nuevoProveedor);
});

app.listen(PORT, () => {
    console.log(`Servidor de Proveedores inicializado en http://localhost:${PORT}`);
});
