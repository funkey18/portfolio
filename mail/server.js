const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const port = 3000;

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files like HTML, CSS, and JS
app.use(express.static('public'));

// POST route to handle the contact form submission
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Check if all required fields are filled
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Please fill all required fields correctly.' });
    }

    // Create the email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use another email service like SendGrid, etc.
        auth: {
            user: 'anoob3829@gmail.com', // Your email address
            pass: 'wpix vqtq qtqr xgjc', // Your email password or App password
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'anoob3829@gmail.com', // The recipient's email address
        subject: `${subject}: ${name}`,
        text: `You have received a new message from your website contact form.\n\nHere are the details:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({
                message: 'Sorry, something went wrong. Please try again later.',
                error: error.message || error // Include the error message in the response
            });
        }
        res.json({ message: 'Your message has been sent successfully!' });
    });
    
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
