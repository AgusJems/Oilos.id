import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporterConfig = {
  service: "gmail", // Or your email service
  auth: {
    user: process.env.EMAIL_USER, //Replace with your email
    pass: process.env.EMAIL_PASS, // Replace with your email password or app-specific password
  }, // Add this TLS option to fix the self-signed certificate error
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(transporterConfig);

const emailTransporter = {    
    sendEmail: async ({email, subject, body}) => {
      try {
        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: subject,
          text: body,
        };

        // Send a email (optional)
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending verification email:", error);
          } else {
            console.log("Verification email sent:", info.response);
          }
        });

      } catch (error) {
        console.error("Failed to connect to send email:", error);
      }
    },
}

// A simple function to test the connection on startup.
async function testConnection() {
  try {
    await transporter.verify();
    console.log("Email transporter is ready to send messages.");
  } catch (error) {
    console.error('Failed to connect to the transporter:', error);
    // Exit process on connection failure to avoid running the app with a bad DB connection.
    process.exit(1);
  }
}

testConnection();

export default emailTransporter;