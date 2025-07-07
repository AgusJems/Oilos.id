import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

let dbPool;
let EnvSetting;
let ReqEmail;
const AuthenticationController = {
    init: (pool, envSetting, reqEmail) => {
        dbPool = pool;
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
            const [rows] = await dbPool.query(
                `SELECT u.Id, u.Username, u.Password, u.RoleId, u.Name, u.Identity, u.Phone, u.Email, u.Area, u.CodeRefferal, r.Code AS RoleCode, r.Name AS RoleName
                FROM users u
                INNER JOIN roles r ON r.Id = u.RoleId
                WHERE u.Username = ? AND u.Status = 1`,
                [username]
            );

            if (rows.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const user = rows[0];

            if (password === user.Password) {
                const token = jwt.sign(
                    {
                        Username: user.Username,
                        RoleId: user.RoleId,
                        RoleCode: user.RoleCode,
                        RoleName: user.RoleName,
                        Name: user.Name,
                        Identity: user.Identity,
                        Phone: user.Phone,
                        Email: user.Email,
                        Area: user.Area,
                        CodeRefferal: user.CodeRefferal
                    },
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
            const { username, password, name, identity, phone, email, area, codeRefferal } = req.body;
            const verificationToken = crypto.randomBytes(20).toString('hex');

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            const [existingUsers] = await dbPool.query(
                'SELECT * FROM users WHERE Username = ? OR Identity = ?',
                [username, identity]
            );

            if (existingUsers.length > 0) {
                return res.status(400).json({ message: 'Username OR Identity already exists' });
            }

            // Insert user with status 0 (unverified) and verification token
            await dbPool.query(
                'INSERT INTO users (Username, Password, RoleId, Name, Identity, Phone, Email, Area, CodeRefferal, verificationToken, Status, CreatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [username, password, 2, name, identity, phone, email, area, codeRefferal, verificationToken, 0, username]
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
        const [rows] = await dbPool.query('SELECT * FROM users WHERE verificationToken = ?', [token]);
        if (rows.length === 0) return res.status(400).json({ message: 'Invalid verification token' });
        await dbPool.query('UPDATE users SET Status = 1, verificationToken = NULL WHERE verificationToken = ?', [token]);
        return res.status(200).json({ message: 'Email verified successfully' });
    }
};

export default AuthenticationController;
