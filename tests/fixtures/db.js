const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: 'Wink',
	email: 'example@mail.com',
	password: 'TinkywinkyDipsyLalaPoe',
	tokens: [{
		token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
	}]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
	_id: userTwoId,
	name: 'Bink',
	email: 'me@mail.com',
	password: 'BinkoStinko',
	tokens: [{
		token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
	}]
}

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Don\'t kill the president',
	author: userOne._id
}

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Smell yoshi\'s eggs haha',
	author: userOne._id
}

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Make the big funny',
	author: userTwo._id
}

const setupDatabase = async () => {
	await User.deleteMany();
	await new User(userOne).save();
	await new User(userTwo).save();

	await Task.deleteMany();
	await new Task(taskOne).save();
	await new Task(taskTwo).save();
	await new Task(taskThree).save();
}

module.exports = {
	userOne,
	userOneId,
	userTwo,
	userTwoId,
	taskOne,
	taskTwo,
	taskThree,
	setupDatabase
}