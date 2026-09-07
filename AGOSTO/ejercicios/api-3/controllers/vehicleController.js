const vehicleService = require('../services/vehicleService');

const getAllVehicles = (req, res) => {
    try {
        const vehicles = vehicleService.getAllVehicles();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

const getVehicleById = (req, res) => {
    try {
        const vehicle = vehicleService.getVehicleById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

const createVehicle = (req, res) => {
    try {
        const newVehicle = req.body;
        if (!newVehicle.make || !newVehicle.model || !newVehicle.year) {
            return res.status(400).json({ message: 'Faltan datos obligatorios (make, model, year)' });
        }
        const createdVehicle = vehicleService.createVehicle(newVehicle);
        res.status(201).json(createdVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

const updateVehicle = (req, res) => {
    try {
        const updatedVehicle = vehicleService.updateVehicle(req.params.id, req.body);
        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

const deleteVehicle = (req, res) => {
    try {
        const deleted = vehicleService.deleteVehicle(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.status(200).json({ message: 'Vehículo eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
};
