import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export default class NodeMailer {
	private subject = 'Password Recovery';
	private resume = 'Password Recovery Link';

	constructor(private name: string){
		name = this.name;
	}

	mailTransporter() {
		return nodemailer.createTransport({
			service: 'Hotmail',
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASS
			},
			tls: {ciphers: 'SSLv3'}
		});
	}

	async sendEmail(recepientEmail: string, hashCode: string) {
		dotenv.config();

		await this.mailTransporter().sendMail({
			from: `<${process.env.NODEMAILER_USER}>`,
			to: recepientEmail,
			subject: this.subject,
			text: this.resume,
			html: 
            `
            <div styles='width: '100%', height: '100%', minHeight: '400px', maxWidth: '400px', display: 'flex', alignItems: 'center''>
                <p textAlign: 'center', textAlignLast: 'left'>
                    Hello, ${this.name}. We have received a request to reset your password.
                    If you really did request that, please click on the button bellow to finalize your password reset. 
                    if you didin't request that, you can just ignore this email. Att. Wev Developer
                </p>
                <button style='display: 'flex', align: 'center'' onClick='() => window.open('http://localhost:3003${hashCode}', '_blank', 'noopener,noreferrer')'>Reset Password</button>
            </div>`,
		})
			.then(result => console.log(result.accepted));
	}
}