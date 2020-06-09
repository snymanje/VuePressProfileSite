---
title: Sending Emails via GMAIL using Nodemailer
excerpt: "Sending Emails with Nodemailer"
date: 2019-11-18
tags: ["Nodejs", "javascript"]
keywords: "nodejs"
sidebar: auto
---

# Sending Emails via GMAIL using Nodemailer

<br>
<hr>
<br>

### Install nodemailer

```javascript

npm i nodemailer

```

<br>

### Create a new js file

<br>

You can call it anything you like, email.js.

```javascript
//Require nodemailer
const nodemailer = require("nodemailer");

//create function to export
const sendEmail = async (options) => {
  // 1) Create a transporter
  // GMAIL
  // Activate in gmail "less secure app" option
  const transporter = nodemailer.createTransport({
    service: "Gmail",

    // When using some other service like mailtrap,
    // you will remove service and uncomment host, port and specify
    // the smtp address for that host.

    //host: smtp.mailtrap.io,
    //port: 25,
    auth: {
      user: "YOUR USERNAME",
      pass: "YOUR PASSWORD",
    },
  });

  // 2) Define email options
  const mailOptions = {
    from: "Jean Snyman <hello@jeans.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

//sendEmail can now be required in any other file, you just pass in your mail options.
```
