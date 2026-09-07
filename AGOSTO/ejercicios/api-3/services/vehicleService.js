const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../mock-data/vehicles.json');

const getVehicles = () => {
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
};

const saveVehicles = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const getAllVehicles = () => {
    return getVehicles();
};

const getVehicleById = (id) => {
    const vehicles = getVehicles();
    return vehicles.find(v => v.id === parseInt(id));
};

const createVehicle = (newVehicle) => {
    const vehicles = getVehicles();
    const maxId = vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) : 0;
    
    const vehicle = {
        id: maxId + 1,
        ...newVehicle
    };
    
    vehicles.push(vehicle);
    saveVehicles(vehicles);
    return vehicle;
};

const updateVehicle = (id, updatedData) => {
    const vehicles = getVehicles();
    const index = vehicles.findIndex(v => v.id === parseInt(id));
    
    if (index === -1) {
        return null;
    }
    
    vehicles[index] = { ...vehicles[index], ...updatedData, id: parseInt(id) };
    saveVehicles(vehicles);
    return vehicles[index];
};

const deleteVehicle = (id) => {
    const vehicles = getVehicles();
    const index = vehicles.findIndex(v => v.id === parseInt(id));
    
    if (index === -1) {
        return false;
    }
    
    vehicles.splice(index, 1);
    saveVehicles(vehicles);
    return true;
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
};
