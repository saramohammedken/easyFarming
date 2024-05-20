const express = require("express");
const StatusCodes = require("http-status-codes");
const database = require("./sensorReading.database");

var sensorReadingRouter = express.Router();

sensorReadingRouter.get("/data", async (req , res ) => {
    try {
        const allSensorReadings = await database.findAll()

        if (!allSensorReadings) {
            return res.status(StatusCodes.NOT_FOUND).json({msg : `No sensorReadings at this time..`})
        }

        return res.status(StatusCodes.OK).json(allSensorReadings)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

sensorReadingRouter.get("/:id", async (req , res ) => {
    try {
        const sensorReading = await database.findOne(req.params.id)

        if (!sensorReading) {
            return res.status(StatusCodes.NOT_FOUND).json(`SensorReading not found!`)
        }

        return res.status(StatusCodes.OK).json({sensorReading})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

sensorReadingRouter.post("/data", async (req , res ) => {
    try {
        const { sensorTypeId, value } = req.body

        if (!sensorTypeId || !value) {
            return res.status(StatusCodes.BAD_REQUEST).json(`Please provide all the required parameters..`)
        }

        const sensorReading = await database.create(req.body)
        return res.status(StatusCodes.CREATED).json(sensorReading)

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

sensorReadingRouter.put('/:id', async (req , res ) => {
    try {

        const {sensorTypeId, value} = req.body;

        if (!sensorTypeId || !value) {
            return res.status(StatusCodes.BAD_REQUEST).json(`Please provide all the required parameters..`)
        }

        const getSensorReading = await database.findOne(req.params.id)

        if (!getSensorReading) {
            return res.status(404).json(`No sensorReading with id ${req.params.id}`)
        }

        const updateSensorReading = await database.update((req.params.id), req.body)

        return res.status(201).json(updateSensorReading)
    } catch (error) {
        return res.status(500).json({error})
    }
})

sensorReadingRouter.delete("/:id", async (req , res ) => {
    try {
        const id = (req.params.id)

        const sensorReading = await database.findOne(id)

        if (!sensorReading) {
            return res.status(StatusCodes.NOT_FOUND).json(`SensorReading does not exist`)
        }

        await database.remove(id)

        return res.status(StatusCodes.OK).json({msg : "SensorReading deleted"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

module.exports = sensorReadingRouter;