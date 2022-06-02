import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import handleBars from 'nodemailer-express-handlebars';

export default class NodeMailer {
	private subject = 'Password Recovery';
	private resume = 'Password Recovery Link';

	constructor(private name: string){
		name = this.name;
	}

	mailTransporter() {
		return nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASS
			},
			tls: {ciphers: 'SSLv3'}
		}).use('compile', handleBars({
			viewEngine: {
				partialsDir: path.resolve('./views'),
				defaultLayout: false,
			},
			viewPath: path.resolve('./views/'),
		}));
	}

	async sendEmail(recepientEmail: string, hashCode: string) {
		dotenv.config();
		console.log('33', process.env.NODEMAILER_USER, recepientEmail);
		const mail = {
			from: process.env.NODEMAILER_USER,
			to: recepientEmail,
			subject: this.subject,
			template: 'email',
			context: {
				name: this.name,
				hashCode: hashCode
			}
		};
		await this.mailTransporter().sendMail(mail)
			.then(result => console.log(result));
	}
}