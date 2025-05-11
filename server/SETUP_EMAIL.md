# Email Setup Guide

To enable email functionality for your contact form, you need to set up environment variables for your email credentials.

## Create a .env file

Create a file named `.env` in the server directory with the following content:

```
# Server Port
PORT=3001

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

Replace the email placeholders with your actual credentials.

## Gmail App Password Setup

If you're using Gmail, you'll need to use an "App Password" instead of your regular password.

To create an App Password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to Security > 2-Step Verification > App passwords
3. Select "Mail" as the app and "Other" as the device
4. Enter a name (e.g., "Portfolio Website") and click "Generate"
5. Copy the 16-character password and paste it as EMAIL_PASS in your .env file

## Testing the Email Functionality

Once you've set up your .env file with the correct credentials, restart your server. The contact form should now be able to send real emails to your address.

## Alternative Email Services

If you prefer not to use Gmail, you can modify the `transporter` configuration in `server/routes/contact.js` to use a different email service. 

For example, for Outlook/Hotmail:

```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

For more information, refer to the [Nodemailer documentation](https://nodemailer.com/about/). 