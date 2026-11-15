const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.ZOHO_SMTP_HOST,
            port: Number(process.env.ZOHO_SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.ZOHO_SMTP_USER,
                pass: process.env.ZOHO_SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"StudyNotion | codewithlokesh" <${process.env.ZOHO_SMTP_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Mail sent:", info.messageId);
        return info;
    } catch (error) {
        console.error(error);
        throw error; // let the caller know it failed
    }
};

module.exports = mailSender;