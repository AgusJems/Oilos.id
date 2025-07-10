import jwt from "jsonwebtoken";
import crypto from "crypto";
import { format } from "date-fns";
import authenticationService from "../services/authentication.service.js";
import cityService from "../services/city.service.js";
import emailTransporter from "../../config/sendEmail.js";

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
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    try {
      const [rows] = await authenticationService.getDetailUser(username);

      if (rows.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const user = rows[0];
      console.log("User found:", user);

      // Check if the user is verified
      if (user.status === 0) {
        return res
          .status(403)
          .json({ message: "User is not verified. Please check your email." });
      }

      if (password === user.password) {
        const token = jwt.sign(
          user,
          EnvSetting.secretKey // Replace with a strong, secret key
        );
        return res
          .status(200)
          .json({ message: "Login successful", token: token });
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  register: async (req, res) => {
    try {
      const {
        username,
        password,
        name,
        identity,
        phone,
        email,
        codeReferral,
        cityId,
      } = req.body;
      const verificationToken = crypto.randomBytes(20).toString("hex");

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      const [existingUsers] = await authenticationService.getDetailUser(
        username
      );
      const [rowCity] = await cityService.getCityById(cityId);

      if (existingUsers.length > 0) {
        return res
          .status(400)
          .json({ message: "Username OR Identity already exists" });
      }

      if (rowCity.length === 0) {
        return res.status(400).json({ message: "Invalid city ID" });
      }

      const words = username.split(" ");
      let initial = "";
      for (const word of words) {
        if (word.length > 0) {
          initial += word[0].toUpperCase();
        }
      }
      const cityCode = rowCity.code.replace(".", "");

      const registrationDateTime = format(new Date(), "ddMMyyyyHm");
      let generateCode = `${initial}-${cityCode}${registrationDateTime}`;

      // Insert user with status 0 (unverified) and verification token
      await authenticationService.insertDetailUser(
        username,
        password,
        name,
        identity,
        phone,
        email,
        generateCode,
        codeReferral,
        verificationToken,
        cityId
      );

      emailTransporter.sendEmail({
        email: email,
        subject: "Email Verification",
        body: `
        <!DOCTYPE html>
        <html lang="en" style="margin:0; padding:0;">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Please verify your email address</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            color: #333333;
            }
            .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 30px;
            }
            h1 {
            color: #004aad;
            font-size: 24px;
            margin-bottom: 20px;
            }
            p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 30px;
            }
            .btn-verify {
            background-color: #004aad;
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 28px;
            font-weight: bold;
            border-radius: 5px;
            display: inline-block;
            }
            .footer {
            font-size: 12px;
            color: #999999;
            text-align: center;
            margin-top: 40px;
            }
            @media only screen and (max-width: 620px) {
            .container {
                margin: 20px 15px;
                padding: 20px;
            }
            h1 {
                font-size: 20px;
            }
            p {
                font-size: 14px;
            }
            .btn-verify {
                padding: 12px 24px;
                font-size: 14px;
            }
            }
        </style>
        </head>
        <body>
        <div class="container" role="main">
            <h1>Verify Your Email Address</h1>
            <p>
            Welcome! To complete your registration, please verify your email address by clicking the button below.
            </p>
            <p>
            <a href="${ReqEmail.host}/verify-success?token=${verificationToken}" class="btn-verify" target="_blank" rel="noopener">
                Verify Email Address
            </a>
            </p>
            <p>If you did not create an account with us, please ignore this email.</p>
            <div class="footer">
            &copy; 2025 Your Company. All rights reserved.
            </div>
        </div>
        </body>
        </html>
        `,
      });

      return res.status(201).json({
        message:
          "User registered successfully. Please check your email for verification.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  verifyEmail: async (req, res) => {
    const { token } = req.query;
    const [rows] = await authenticationService.getUserByToken(token);
    if (rows.length === 0)
      return res.status(400).json({ message: "Invalid verification token" });
    await authenticationService.verifyEmail(token);
    return res.status(200).json({ message: "Email verified successfully" });
  },
};

export default AuthenticationController;
