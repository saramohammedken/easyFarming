const express = require("express");
const StatusCodes = require("http-status-codes");
const database = require("./sensorType.database");

var sensorTypeRouter = express.Router();

sensorTypeRouter.get("/getAll", async (req , res ) => {
    try {
        const allSensorTypes = await database.findAll()

        if (!allSensorTypes) {
            return res.status(StatusCodes.NOT_FOUND).json(`No sensorTypes at this time..`)
        }

        return res.status(StatusCodes.OK).json(allSensorTypes)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

sensorTypeRouter.get("/:id", async (req , res ) => {
    try {
        const sensorType = await database.findOne(req.params.id)

        if (!sensorType) {
            return res.status(StatusCodes.NOT_FOUND).json(`SensorType not found!`)
        }

        return res.status(StatusCodes.OK).json({sensorType})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

sensorTypeRouter.post("/add", async (req , res ) => {
    try {
        const { name, description } = req.body

        if (!name || !description) {
            return res.status(StatusCodes.BAD_REQUEST).json(`Please provide all the required parameters..`)
        }

        const sensorType = await database.create(req.body)
        return res.status(StatusCodes.CREATED).json(sensorType)

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

sensorTypeRouter.put('/:id', async (req , res ) => {
    try {

        const {name, description} = req.body;

        if (!name || !description) {
            return res.status(StatusCodes.BAD_REQUEST).json(`Please provide all the required parameters..`)
        }

        const getSensorType = await database.findOne(req.params.id)

        if (!getSensorType) {
            return res.status(404).json(`No sensorType with id ${req.params.id}`)
        }

        const updateSensorType = await database.update((req.params.id), req.body)

        return res.status(201).json(updateSensorType)
    } catch (error) {
        return res.status(500).json({error})
    }
})

sensorTypeRouter.delete("/:id", async (req , res ) => {
    try {
        const id = (req.params.id)

        const sensorType = await database.findOne(id)

        if (!sensorType) {
            return res.status(StatusCodes.NOT_FOUND).json(`SensorType does not exist`)
        }

        await database.remove(id)

        return res.status(StatusCodes.OK).json({msg : "SensorType deleted"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

module.exports = sensorTypeRouter;