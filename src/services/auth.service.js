const { models } = require('../../libs/sequelize');
const nodemailer = require('nodemailer');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const config = require('../../config');

class AuthService{

    async readByEmail(email){
        const user = await models.User.findOne({
            where: {
                email
            },
            include: ['role', 'receivedServices', 'employee']
        });
        return user;
    }

    async updatePassword(data, payload){
        const user = await this.readByEmail(payload.email);
        const userupdated = await user.update(data);
        return userupdated;
    }

    async singToken(user) {
        const payload = {
            sub: user.id,
            code: user.status
        }
        const token = await jwt.sign(payload, config.JwtSecret, { expiresIn: '72h' });
        return token;
    }

    async recovery(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            status: user.status
        }
        const token = await jwt.sign(payload, config.JwtLogin, { expiresIn: '2h' });
        return token;
    }

    async signUp(user) {
        const payload = {
            sub: user.id,
            code: user.verificationCode,
            email: user.email,
            id: user.id,
            status: user.status
        }
        const token = await jwt.sign(payload, config.JwtLogin, { expiresIn: '48h' });
        return token;
    }

    async sendMail(user, subject, body){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: config.Mail,
                pass: config.Password
            }
        });

        const mailOption = {
            from: config.Mail,
            to: user.email,
            subject,
            html: body,
        };

        return new Promise((resolve, reject) => {
			transporter.sendMail(mailOption, (error, info) => {
				if (error) {
					reject(boom.badRequest(error));
				} else {
					resolve(info);
				}
			});
		});
    }

    generarCodigo() {
        let codigo = '';
        for (let i = 0; i < 5; i++) {
            codigo += Math.floor(Math.random() * 10);
        }
        return codigo;
    }
}

module.exports = AuthService;