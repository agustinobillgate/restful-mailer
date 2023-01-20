require("dotenv").config()
const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const port = process.env.PORT

app.use(express.static('public'))
app.use(express.json())

const transporter = nodemailer.createTransport({
    service: process.env.HOST,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

app.get('/', (req, res)=>{
    res.send('Server Online')
})

app.post('/email', (req, res)=>{
    const { toMail } = req.body
    const { ccMail } = req.body
    const { subjectMail } = req.body
    const { textMail } = req.body
    const { htmlMail } = req.body

    res.send({
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

    transporter.sendMail(mailOptions, (err, info)=>{
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
    console.log(process.env.HOST)
    console.log(process.env.EMAIL)
    console.log(process.env.PASS)
})