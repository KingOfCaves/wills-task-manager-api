const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
	userOne, 
	userOneId, 
	userTwo, 
	userTwoId, 
	setupDatabase,
	taskOne,
	taskTwo,
	taskThree
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
	const response = await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 'Test your skils!'
		})
		.expect(201);

	const task = await Task.findById(response.body._id);
	expect(task).not.toBeNull();
	expect(task.completed).toEqual(false);
});

test('Should delete task for user', async () => {
	const response = await request(app)
		.get('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200)
	
	expect(response.body.length).toEqual(2);
});

test('Should not be able to delete another users task', async () => {
	const response = await request(app)
		.delete(`/tasks/${taskThree._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(404)

	const task = Task.findById(taskThree._id);
	expect(task).toBeDefined();
});

