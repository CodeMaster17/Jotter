import nodemailer from 'nodemailer'
import config from '../config/config'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: config.MY_GMAIL,
        pass: config.GENERATED_APP_PASSWORD
    }
})

// async..await is not allowed in global scope, must use a wrapper
export async function emailService(receiverEmail: string[], subject: string, text: string) {
    // send mail with defined transport object
    await transporter.sendMail({
        from: '"Harshit yadav 👻" <harshityadav172003@gmail.com>', // sender address
        to: receiverEmail, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: '<b>Hello world?</b>' // html body
    })
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

emailService([], '', '').catch((err) => {
    console.log(err)
})

