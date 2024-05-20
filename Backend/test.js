const request = require('supertest');
const server = require('./server');
const assert = require('assert');

describe('Testing API /sensorTypes/', () => {
    let newItem ;
    it('should create a new item to SensorTypes array on POST /sensorTypes/add', async () => {
        newItem = { id: 'b4d7-81cf2220ac4', name: 'Humidity', description: "This has been added by test" };
        const response = await request(server)
            .post('/sensorTypes/add')
            .send(newItem)
            .expect('Content-Type', /json/)
            .expect(201);

        assert.ok(response.body.id);
        assert.strictEqual(response.body.name, newItem.name);
        assert.strictEqual(response.body.description, newItem.description);
        newItem.id = response.body.id;
    });

    it('should return array of SensorTypes recordes on GET /sensorTypes/getAll', async () => {
        const response = await request(server)
            .get('/sensorTypes/getAll')
            .expect('Content-Type', /json/)
            .expect(200);

        assert(Array.isArray(response.body), 'Response should be an array');
        assert(response.body.length > 0, 'Array should not be empty');

        response.body.forEach(item => {
            assert.ok(item.id, 'Item should have an id');
            assert.ok(item.name, 'Item should have a name');
            assert.ok(item.description, 'Item should have a description');
        });
    });

    it('should update a particular item in SensorTypes array on PUT /sensorTypes/id', async () => {
        let updateItem = {  id: newItem.id, name: 'test1', description: "This has been updated by test" };
        const response = await request(server)
            .put('/sensorTypes/'+newItem.id)
            .send(updateItem)
            .expect(201);
            assert.ok(response.body.id, 'Item should have an id');
            assert.ok(response.body.name, 'Item should have a name');
            assert.ok(response.body.description, 'Item should have a description');
    });

    it('should delete a particular item in SensorTypes array on DELETE /sensorTypes/id', async () => {
        request(server)
        .delete('/sensorTypes/'+newItem.id)
        .expect(200);
    });

    it('should return 404 for unknown routes', async () => {
        const res = await request(server)
            .get('/unknown-route')
            .expect('Content-Type', /json/)
            .expect(404);

        assert.ok(res.body);
        assert.strictEqual(res.body, 'Not Found');
    });
});

describe('Testing API /sensors/', () => {
    let newItem ;
    it('should create a new item to SensorReading array on POST /sensors/data', async () => {
        newItem = { id: 'b4d7-81cf2220ac4', sensorTypeId: '05d98d78-e3a1-471a', value: 5.5, timestamp: "5/18/2024, 8:08:21 PM" };
        const response = await request(server)
            .post('/sensors/data')
            .send(newItem)
            .expect('Content-Type', /json/)
            .expect(201);

        assert.ok(response.body.id);
        assert.strictEqual(response.body.sensorTypeId, newItem.sensorTypeId);
        assert.strictEqual(response.body.value, newItem.value);
        newItem.id = response.body.id;
    });

    it('should return array of SensorReading recordes on GET /sensors/data', async () => {
        const response = await request(server)
            .get('/sensors/data')
            .expect('Content-Type', /json/)
            .expect(200);

        assert(Array.isArray(response.body), 'Response should be an array');
        assert(response.body.length > 0, 'Array should not be empty');

        response.body.forEach(item => {
            assert.ok(item.id, 'Item should have an id');
            assert.ok(item.timestamp, 'Item should have a timestamp');
            assert.ok(item.sensorTypeId, 'Item should have a sensorTypeId');
            assert.ok(item.value, 'Item should have a value');
        });
    });

    it('should update a particular item in SensorReading array on PUT /sensors/id', async () => {
        let updateItem = {  id: newItem.id, sensorTypeId: 'b4d7-81cf2220ac40', value: 4, timestamp: "5/18/2024, 8:08:21 PM" };
        const response = await request(server)
            .put('/sensors/'+newItem.id)
            .send(updateItem)
            .expect(201);
            assert.ok(response.body.id, 'Item should have an id');
            assert.ok(response.body.timestamp, 'Item should have a timestamp');
            assert.ok(response.body.sensorTypeId, 'Item should have a sensorTypeId');
            assert.ok(response.body.value, 'Item should have a value');
    });

    it('should delete a particular item in SensorReading array on DELETE /sensors/id', async () => {
        request(server)
        .delete('/sensors/'+newItem.id)
        .expect(200);
    });

    it('should return 404 for unknown routes', async () => {
        const res = await request(server)
            .get('/unknown-route')
            .expect('Content-Type', /json/)
            .expect(404);

        assert.ok(res.body);
        assert.strictEqual(res.body, 'Not Found');
    });
});
