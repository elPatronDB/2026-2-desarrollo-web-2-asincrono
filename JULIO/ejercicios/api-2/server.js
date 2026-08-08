const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const PORT = 3000;
const mockFilePath = path.join(__dirname, 'mock.json');

let vehiculos = [];
try {
    const data = fs.readFileSync(mockFilePath, 'utf8');
    vehiculos = JSON.parse(data);
} catch (err) {
    console.error("Error al leer mock.json:", err);
}





const guardarDatos = () => {
    try {
        fs.writeFileSync(mockFilePath, JSON.stringify(vehiculos, null, 4), 'utf8');
    } catch (err) {
        console.error("Error al guardar en mock.json:", err);
    }
};



app.get('/api/vehiculos', (req, res) => {
    res.status(200).json(vehiculos);
});

app.get('/api/vehiculos/:id', (req, res) => {
    const vehiculo = vehiculos.find(v => v.id === parseInt(req.params.id));
    if (!vehiculo) {
        return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    res.status(200).json(vehiculo);
});

app.post('/api/vehiculos', (req, res) => {
    const { id, marca, modelo } = req.body;

    if (!id || !marca || !modelo) {
        return res.status(400).json({ error: "Faltan datos del vehículo" });
    }

    const existe = vehiculos.some(v => v.id === id);
    if (existe) {
        return res.status(409).json({ error: "El ID del vehículo ya existe" });
    }

    vehiculos.push({ id, marca, modelo });
    guardarDatos();
    res.status(201).json({ mensaje: "Vehículo creado" });
});

app.put('/api/vehiculos/:id', (req, res) => {
    try {
        const vehiculo = vehiculos.find(v => v.id === parseInt(req.params.id));
        if (!vehiculo) {
            return res.status(404).json({ error: "Vehículo no encontrado" });
        }
        vehiculo.marca = req.body.marca || vehiculo.marca;
        vehiculo.modelo = req.body.modelo || vehiculo.modelo;
        guardarDatos();
        res.status(200).json({ mensaje: "Vehículo actualizado", vehiculo });
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});


app.delete('/api/vehiculos/:id', (req, res) => {
    const vehiculoIndex = vehiculos.findIndex(v => v.id === parseInt(req.params.id));
    if (vehiculoIndex === -1) {
        return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    vehiculos.splice(vehiculoIndex, 1);
    guardarDatos();
    res.status(200).json({ mensaje: "Vehículo eliminado" });
});




app.listen(PORT, () => {
    console.log(`Server api-2 corriendo en http://localhost:${PORT}`);
});