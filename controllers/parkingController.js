const parkingService = require('../services/parkingService');
const authService = require("../services/authService");
const vehicleService = require("../services/vehicleService");

//crear parqueadero
exports.createParking = async (req, res) => {
    const { name, capacity, costPerHour } = req.body;
    try {
        const parking = await parkingService.createParking(name, capacity, costPerHour);
        res.status(201).json(parking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//obtener todos los parqueaderos de un socio o un admin
exports.getAllParkings = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await authService.userById(userId);
        const parkings = 0;
        if (user.role == "SOCIO") {
            parkings = await parkingService.getParkingsByUserId(userId);
        } else {
            parkings = await parkingService.getAllParkings();
        }
        res.status(201).json(parkings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//obtener todos los vehiculos de un parqueadero
exports.getAllVehicles = async (req, res) => {
    try {
      const { userId,parkingId } = req.params;
      const user = await authService.userById(userId);
      const vehicles = 0;
          vehicles = await vehicleService.getVehiclesByParkingId(parkingId);
      res.status(201).json(vehicles);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
  };

//obtener un parqueadero por id
exports.getParkingById = async (req, res) => {
    try {
        const { id } = req.params;
        const parking = await parkingService.getParkingById(id);
        res.status(201).json(parking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//actualizar un parqueadero
exports.updateParking = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, capacity, costPerHour } = req.body;
        const updatedParking = await parkingService.updateParking(id, name, capacity, costPerHour);
        res.json(updatedParking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//Borrar un parqueadero por id
exports.deleteParking = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await parkingService.deleteParking(id);
        if (!deleted) {
            return res.status(400).json({ message: 'Parqueadero no encontrado' });
        }
        res.status(201).json({ message: 'Parqueadero borrado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//asignar parqueadero a un socio
exports.assignParkingToSocio = async (req, res) => {
    try {
        const { userId } = req.body;
        const { parkingId } = req.params;
        const updatedParking = await parkingService.assignParkingToSocio(parkingId, userId);
        res.status(201).json(updatedParking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//obtener los parqueaderos de un socio
exports.getParkingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const parkings = await parkingService.getParkingsByUserId(userId);
        res.status(200).json(parkings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


