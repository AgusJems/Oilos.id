import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { format } from 'date-fns';
import pool from '../../config/db.js';
import authenticationService from '../services/authentication.service.js';
import cityService from '../services/city.service.js';

let EnvSetting;
let ReqEmail;
const AuthenticationController = {
    init: (envSetting, reqEmail) => {
        EnvSetting = envSetting;
        ReqEmail = reqEmail;
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        try {
            // Gunakan pool langsung (tanpa getConnection)
            const [rows] = await authenticationService.getDetailUser(username);

            if (rows.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const user = rows[0];
            console.log('User found:', user);

            if (password === user.password) {
                const token = jwt.sign(
                    user,
                    EnvSetting.secretKey // Replace with a strong, secret key
                );
                return res.status(200).json({ message: 'Login successful', token: token });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }

        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    register: async (req, res) => {
        try {
            const { username, password, name, identity, phone, email, codeReferral, cityId } = req.body;
            const verificationToken = crypto.randomBytes(20).toString('hex');

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            const [existingUsers] = await authenticationService.getDetailUser(username);
            const [rowCity] = await cityService.getCityById(cityId);

            if (existingUsers.length > 0) {
                return res.status(400).json({ message: 'Username OR Identity already exists' });
            }
            
            if (rowCity.length === 0) {
                return res.status(400).json({ message: 'Invalid city ID' });
            }

            const words = username.split(' ');
            let initial = '';
            for (const word of words) {
                if (word.length > 0) {
                    initial += word[0].toUpperCase();
                }
            }
            const cityCode = rowCity[0].code.replace('.', '');

            const registrationDateTime = format(new Date(), 'ddMMyyyyHm');
            let generateCode = `${initial}-${cityCode}${registrationDateTime}`;
        
            // Insert user with status 0 (unverified) and verification token
            await authenticationService.insertDetailUser(
                username, password, name, identity, phone, email, generateCode, codeReferral, verificationToken, cityId
            );

            // Send verification email
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Or your email service
                auth: {
                    user: ReqEmail.user, // Replace with your email
                    pass: ReqEmail.password // Replace with your email password or app-specific password
                }
            });

            const mailOptions = {
                from: ReqEmail.user,
                to: email,
                subject: 'Email Verification',
                text: `Click the following link to verify your email: ${ReqEmail.host}/verify-email?token=${verificationToken}` // Replace your_domain
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending verification email:', error);
                } else {
                    console.log('Verification email sent:', info.response);
                }
            });

            return res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    verifyEmail: async (req, res) => {
        const { token } = req.query;
        const [rows] = await authenticationService.getUserByToken(token);
        if (rows.length === 0) return res.status(400).json({ message: 'Invalid verification token' });
        await authenticationService.verifyEmail(token);
        return res.status(200).json({ message: 'Email verified successfully' });
    }
};

export default AuthenticationController;
