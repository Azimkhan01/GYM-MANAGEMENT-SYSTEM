const nodemailer = require("nodemailer");
require("dotenv").config();


// async..await is not allowed in global scope, must use a wrapper
async function main(name,date,duration,expiry,mail,type) {
    let sendHTML;
    if(!type)
    {
         sendHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Important Membership Expiry Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #e0f7fa, #b9fbc0); /* Light teal to light green gradient */
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }
        .notification-container {
            background-color: #ffffff; /* White */
            border: 2px solid #0288d1; /* Deep blue */
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            padding: 20px;
            margin: 20px;
            text-align: center;
            color: #333;
            position: relative;
            animation: bounceIn 1s ease-in-out;
        }
        .notification-container img {
            width: 100%;
            height: auto;
            border-radius: 12px;
            margin-bottom: 20px;
            border: 5px solid #0288d1; /* Deep blue border */
        }
        h2 {
            color: #0288d1; /* Deep blue */
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
            animation: shake 1s ease-in-out;
        }
        p, ul {
            font-size: 16px;
            color: #333;
        }
        strong {
            color: #ffab00; /* Warm yellow */
        }
        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        li {
            padding: 10px 0;
            border-bottom: 1px solid #e0f2f1; /* Light teal */
        }
        .highlight {
            color: #ffab00; /* Warm yellow */
            font-weight: bold;
        }
        .contact-info {
            font-size: 16px;
            color: #333;
            margin-top: 20px;
        }
        .contact-info strong {
            color: #0288d1; /* Deep blue */
        }
        .notification-container::before {
            content: "⚠️";
            font-size: 40px;
            color: #0288d1; /* Deep blue */
            position: absolute;
            top: 10px;
            left: 10px;
        }

        /* Animation Definitions */
        @keyframes bounceIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes shake {
            0% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            100% { transform: translateX(0); }
        }

        /* Responsive Styles */
        @media (max-width: 600px) {
            .notification-container {
                padding: 15px;
                margin: 10px;
            }
            h2 {
                font-size: 20px;
            }
            p, ul {
                font-size: 14px;
            }
            .contact-info {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="notification-container">
        <img src="https://t4.ftcdn.net/jpg/00/99/82/15/360_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg" alt="Gym Image">
        <h2>Important Membership Expiry Notification</h2>
        <p>Dear <span class="highlight">${name}</span>,</p>
        <p>This is an important notification from <strong>The Vyne Gym</strong> to inform you that your membership is nearing its expiry date. Immediate action is required.</p>
        <ul>
            <li><strong>Name:</strong> <span class="highlight">${name}</span></li>
            <li><strong>Date of Admission:</strong> <span class="highlight">${date}</span></li>
            <li><strong>Duration:</strong> <span class="highlight">${duration}</span></li>
            <li><strong>Expiry Date:</strong> <span class="highlight">${expiry}</span></li>
        </ul>
        <p class="contact-info">Please visit the gym or contact us at <strong>info@vynegym.com</strong> to renew your membership before the expiry date to ensure uninterrupted access to our facilities.</p>
        <p>Thank you for your prompt attention to this matter.</p>
    </div>
</body>
</html>
`
    }else{
         sendHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to The Vyne Gym</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #e0f7fa, #b9fbc0); /* Light teal to light green gradient */
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }
        .greeting-container {
            background-color: #ffffff; /* White */
            border: 2px solid #0288d1; /* Deep blue */
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            padding: 20px;
            margin: 20px;
            text-align: center;
            color: #333;
            position: relative;
            animation: bounceIn 1s ease-in-out;
        }
        .greeting-container img {
            width: 100%;
            height: auto;
            border-radius: 12px;
            margin-bottom: 20px;
            border: 5px solid #0288d1; /* Deep blue border */
        }
        h2 {
            color: #0288d1; /* Deep blue */
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
            animation: shake 1s ease-in-out;
        }
        p {
            font-size: 16px;
            color: #333;
            margin: 10px 0;
        }
        strong {
            color: #ffab00; /* Warm yellow */
        }
        .highlight {
            color: #ffab00; /* Warm yellow */
            font-weight: bold;
        }
        .greeting-container::before {
            content: "🎉";
            font-size: 40px;
            color: #0288d1; /* Deep blue */
            position: absolute;
            top: 10px;
            left: 10px;
        }

        /* Animation Definitions */
        @keyframes bounceIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes shake {
            0% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            100% { transform: translateX(0); }
        }

        /* Responsive Styles */
        @media (max-width: 600px) {
            .greeting-container {
                padding: 15px;
                margin: 10px;
            }
            h2 {
                font-size: 20px;
            }
            p {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="greeting-container">
        <img src="https://t4.ftcdn.net/jpg/00/99/82/15/360_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg" alt="Gym Image">
        <h2>Welcome to The Vyne Gym!</h2>
        <p>Dear <span class="highlight">${name}</span>,</p>
        <p>Thank you for choosing <strong>The Vyne Gym</strong> as your fitness partner. We are thrilled to have you with us!</p>
        <p>Here are the details of your membership:</p>
        <p><strong>Name:</strong> <span class="highlight">${name}</span></p>
        <p><strong>Date of Admission:</strong> <span class="highlight">${date}</span></p>
        <p><strong>Duration:</strong> <span class="highlight">${duration}</span></p>
        <p><strong>Start Date:</strong> <span class="highlight">${date}</span></p>
        <p><strong>Expiry Date:</strong> <span class="highlight">${expiry}</span></p>
        <p>We are committed to providing you with the best fitness experience. If you have any questions or need assistance, please do not hesitate to contact us at <strong>info@vynegym.com</strong>.</p>
        <p>Welcome aboard, and here's to your fitness journey!</p>
    </div>
</body>
</html>
`
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.email,
          pass: process.env.emailPass,
        },
      });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.email, // sender address
    to: mail, // list of receivers
    subject: "Important Notice", // Subject line
    text: "The Vyne Gym", // plain text body
    html: sendHTML, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}



module.exports = {main};