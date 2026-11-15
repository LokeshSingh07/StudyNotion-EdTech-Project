const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    // 1. Try Zoho SMTP if credentials are configured
    if (process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASS) {
        try {
            const port = Number(process.env.ZOHO_SMTP_PORT) || 587;
            const isSecure = port === 465;

            const zohoTransporter = nodemailer.createTransport({
                host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.in",
                port: port,
                secure: isSecure,
                requireTLS: !isSecure,
                auth: {
                    user: process.env.ZOHO_SMTP_USER,
                    pass: process.env.ZOHO_SMTP_PASS,
                },
                connectionTimeout: 8000, // 8s connection timeout (prevents infinite hanging)
                greetingTimeout: 8000,
                socketTimeout: 10000,
            });

            const info = await zohoTransporter.sendMail({
                from: `"StudyNotion | codewithlokesh" <${process.env.ZOHO_SMTP_USER}>`,
                to: email,
                subject: title,
                html: body,
            });

            console.log("Mail sent successfully via Zoho:", info.messageId);
            return info;
        } catch (zohoError) {
            console.warn(
                "Zoho SMTP failed/timed out (" + zohoError.message + "). Checking for fallback transport..."
            );
            // If Gmail is not available, rethrow the Zoho error
            if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
                throw zohoError;
            }
        }
    }

    // 2. Fallback to Gmail if Zoho failed or is not configured
    if (process.env.MAIL_USER && process.env.MAIL_PASS) {
        try {
            const gmailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
                connectionTimeout: 8000,
                greetingTimeout: 8000,
                socketTimeout: 10000,
            });

            const info = await gmailTransporter.sendMail({
                from: `"StudyNotion" <${process.env.MAIL_USER}>`,
                to: email,
                subject: title,
                html: body,
            });

            console.log("Mail sent successfully via Gmail fallback:", info.messageId);
            return info;
        } catch (gmailError) {
            console.error("Gmail transport also failed:", gmailError);
            throw gmailError;
        }
    }

    throw new Error("No valid email transport configuration found in environment variables.");
};

module.exports = mailSender;