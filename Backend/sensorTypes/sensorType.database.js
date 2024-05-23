
const { v4: random } = require('uuid');
const fs = require('fs');
var path = require('path');

let sensorTypes = loadSensorTypes() 

function loadSensorTypes ()  {
  try {
    const data = fs.readFileSync(path.join(__dirname,'../data/sensorTypes.json'), "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log(`Error ${error}`)
    return {}
  }
}

function saveSensorTypes () {
  let res =[];
  try {
    fs.writeFileSync(path.join(__dirname,'../data/sensorTypes.json'), JSON.stringify(sensorTypes), "utf-8")
    console.log(`SensorType saved successfully!`);
  } catch (error) {
    console.log(`Error : ${error}`)
  }
}

const findAll = async () => Object.values(loadSensorTypes());

const findOne = async (id) => sensorTypes[id];

const create = async (sensorTypeData ) => {

  let id = random()

  let checkType = await findOne(id);

  while (checkType) {
    id = random()
    checkType = await findOne(id)
  }

  const sensorType = {
    id : id,
    name : sensorTypeData.name,
    description : sensorTypeData.description,
  };

  sensorTypes[id]=sensorType;

  saveSensorTypes();
  return sensorType;
};
  
const update = async (id, updateValues) => {

    const typeExists = await findOne(id)

    if (!typeExists) {
        return null
    }

    sensorTypes[id] = {
        ...typeExists,
        ...updateValues
    }

    saveSensorTypes()

    return sensorTypes[id]
}

const remove = async (id) => {

    const sensorType = await findOne(id)

    if (!sensorType) {
        return null
    }

    delete sensorTypes[id]

    saveSensorTypes()
}

exports.findAll = findAll;
exports.findOne = findOne;
exports.create = create;
exports.update = update;
exports.remove = remove;
