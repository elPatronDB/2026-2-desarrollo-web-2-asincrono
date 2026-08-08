const express = require('express');
const app = express();
const PORT = 3500; 

const televisiones = [
    { id: 1, marca: "Samsung", modelo: "QLED 4K", pulgadas: 55 },
    { id: 2, marca: "LG", modelo: "OLED", pulgadas: 65 },
    { id: 3, marca: "Sony", modelo: "Bravia XR", pulgadas: 50 },
    { id: 4, marca: "TCL", modelo: "Roku TV", pulgadas: 40 },
    { id: 5, marca: "Hisense", modelo: "U8G", pulgadas: 75 }
];

app.get('/api/televisiones', (req, res) => {
    res.status(200).json({
        success: true,
        data: televisiones
    });
});
        
app.listen(PORT, () => {
    console.log(`Server api-1 corriendo en http://localhost:${PORT}`);
});