import nodemailer from "nodemailer";

const emailConfig = {
  host: "localhost", // SmtpHost
  port: 25, // SmtpPort
  auth: {
    user: "__USER__", // SmtpUsername
    pass: "__PASSWORD__", // SmtpPassword
  },
  secure: false, // Change to `true` if using TLS
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
};

const transporter = nodemailer.createTransport(emailConfig);

export async function sendEmail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: `"Hackathon" <hackathon@example.com>`, // FromEmail & FromName
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Example usage
// sendEmail("user@example.com", "Test Email", "Hello from Node.js!");
