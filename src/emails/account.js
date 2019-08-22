const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'nickolas.a.wills@gmail.com',
		subject: 'Welcome to the club!',
		text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
	})
};

const sendGoodbyeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'nickolas.a.wills@gmail.com',
		subject: 'Reeeeeeeeeeeeeee',
		text: 'OOoohHhhHHH YOU MAKE ME SO AAAANGRYYY. GETOUT GETOUT GETOUT!!!'
	})
}

module.exports = {
	sendWelcomeEmail,
	sendGoodbyeEmail
}