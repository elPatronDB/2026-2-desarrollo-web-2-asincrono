const express = require('express');
const app = express();
const vehicleRoutes = require('./routes/vehicleRoutes');

app.use(express.json());

app.use('/api/vehicles', vehicleRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor de concesionario ejecutándose en el puerto ${PORT}`);
});
