require("dotenv").config()
const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const ports = process.env.PORTS

app.use(express.static('public'))
app.use(express.json())

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

app.get('/', (req, res) => {
    res.send('Server Online')
})

app.post('/email', (req, res) => {
    const { toMail } = req.body
    const { ccMail } = req.body
    const { subjectMail } = req.body
    const { textMail } = req.body
    const { htmlMail } = req.body

    res.send({
        response: `Messages Successfully Sent from ${process.env.EMAIL}`,
        to: `${toMail}`,
        cc: `${ccMail}`,
        subject: `${subjectMail}`,
        text: `${textMail}`,
        html: `${htmlMail}`
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: `${toMail}`,
        cc: `${ccMail}`,
        subject: `${subjectMail}`,
        text: `${textMail}`,
        html: `${htmlMail}`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})

app.listen(ports, () => {
    console.log(`Server running on port ${ports}`)
    console.log(process.env.HOST)
    console.log(process.env.EMAIL)
    console.log(process.env.PASS)
})