
const { v4: random } = require('uuid');
const fs = require('fs');
var path = require('path');

let sensorReadings = loadSensorReadings() 

function loadSensorReadings ()  {
  try {
    const data = fs.readFileSync(path.join(__dirname,'../data/sensorReadings.json'), "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log(`Error ${error}`)
    return {}
  }
}

function saveSensorReadings () {
  let res =[];
  try {
    fs.writeFileSync(path.join(__dirname,'../data/sensorReadings.json'), JSON.stringify(sensorReadings), "utf-8")
    console.log(`SensorReading saved successfully!`);
  } catch (error) {
    console.log(`Error : ${error}`)
  }
}

const findAll = async () => Object.values(loadSensorReadings());

const findOne = async (id) => sensorReadings[id];

const create = async (sensorReadingData ) => {

  let id = random()

  let checkReading = await findOne(id);

  while (checkReading) {
    id = random()
    checkType = await findOne(id)
  }

  const sensorReading = {
    id : id,
    sensorTypeId : sensorReadingData.sensorTypeId,
    value : sensorReadingData.value,
    timestamp: new Date().toLocaleString(),
  };

  sensorReadings[id]=sensorReading;

  saveSensorReadings();
  return sensorReading;
};
  
const update = async (id, updateValues) => {

    const typeExists = await findOne(id)

    if (!typeExists) {
        return null
    }

    sensorReadings[id] = {
        ...typeExists,
        ...updateValues
    }

    saveSensorReadings()

    return sensorReadings[id]
}

const remove = async (id) => {

    const sensorReading = await findOne(id)

    if (!sensorReading) {
        return null
    }

    delete sensorReadings[id]

    saveSensorReadings()
}

exports.findAll = findAll;
exports.findOne = findOne;
exports.create = create;
exports.update = update;
exports.remove = remove;
