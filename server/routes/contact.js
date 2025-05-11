/**
 * Contact Routes
 * 
 * This file handles the contact form submissions and sends emails.
 */

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Route to handle contact form submissions
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  
  console.log('Received contact form submission:', { name, email, messageLength: message?.length });
  
  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
  }

  try {
    // Create a test account if email credentials are not provided
    // This allows the form to work in development without actual credentials
    let testAccount;
    let transporter;
    
    // Check if email credentials are set in environment variables
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('Using configured email account:', process.env.EMAIL_USER);
      
      // Create a transporter object using SMTP transport with actual credentials
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // For development - create a test account with ethereal.email
      console.log('Email credentials not found in environment, using test account');
      testAccount = await nodemailer.createTestAccount();
      
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER || testAccount.user}>`,
      to: 'dor2495@gmail.com', // Your email where you want to receive messages
      subject: `Portfolio Contact: Message from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<h3>New contact form submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Message sent: %s', info.messageId);
    
    // If using a test account, show preview URL
    if (testAccount) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    // Return success response
    res.status(200).json({ success: true, message: 'Your message has been sent. Thank you!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 