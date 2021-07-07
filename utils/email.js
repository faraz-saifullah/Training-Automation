const nodemailer = require(`nodemailer`);
let account = nodemailer.createTestAccount();
console.log(account);
let transporter = nodemailer.createTransport({
	service: `gmail`,
	secure: false,
	port: 25,
	auth: {
		user: `saifullahf2608@gmail.com`,
		pass: `fara@0312Zs`
	},
	tls: {
		rejectUnauthorized: false
	}
});

function sendMail(HelperOptions) {
	transporter.sendMail(HelperOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log(`The message was sent!`);
		console.log(info);
	});
}

module.exports = {
	sendMail
};
