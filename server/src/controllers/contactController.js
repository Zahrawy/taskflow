/**
 * Contact Controller
 * Handles contact form email sending
 */
const nodemailer = require('nodemailer');

// Create transporter (using Gmail SMTP)
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

/**
 * @desc    Send contact form email
 * @route   POST /api/contact
 * @access  Public
 */
const sendContactEmail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address',
            });
        }

        // Create transporter
        const transporter = createTransporter();

        // Email options
        const mailOptions = {
            from: `"TaskFlow Contact" <${process.env.EMAIL_USER}>`,
            to: 'jzjdgg13532@gmail.com',
            replyTo: email,
            subject: `[TaskFlow Contact] ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4f46e5, #a78bfa); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Message</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #374151; margin-top: 0;">From: ${name}</h2>
            <p style="color: #6b7280;"><strong>Email:</strong> ${email}</p>
            <p style="color: #6b7280;"><strong>Subject:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <div style="color: #374151; line-height: 1.6;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
            This email was sent from TaskFlow contact form
          </p>
        </div>
      `,
            text: `
        New Contact Message from TaskFlow
        
        From: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Email sent successfully',
        });
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email. Please try again later.',
        });
    }
};

module.exports = { sendContactEmail };
