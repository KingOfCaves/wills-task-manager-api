const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number')
			}
		}
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid')
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 6,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('You cannot include the word "password" in your password...')
			}
		}
	},
	tokens: [{
		token: {
			type: String,
			required: true,
		}
	}],
	avatar: {
		type: Buffer
	}
}, {
	timestamps: true
});

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

	user.tokens = user.tokens.concat({ token });
	await user.save();
	
	return token;
}

userSchema.statics.findByCridentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Unable to login.')
	}
	
	const isMatched = await bcrypt.compare(password, user.password);
	if (!isMatched) {
		throw new Error('Unable to login.')
	}

	return user;
};

userSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	delete userObject.avatar;
	
	return userObject;
}

// Has the plain text password before saving
userSchema.pre('save', async function(next) {
	const user = this;
	
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next();
});

//Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
	const user = this;
	await Task.deleteMany({ author: user._id });
	next();
})

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'author'
});

const User = mongoose.model('User', userSchema);

module.exports = User;