const nodemailer = require('nodemailer')




  async function sendEmail(email,code){
    console.log("start send")
    try{
        const transporter = nodemailer.createTransport({
            service:"Gmail",
            host:'mail.openjavascript.info',
            port:465,
            secure:true,
            auth:{
                user: "wanilawhite2030@gmail.com",
                pass:process.env.EMAIL_PASSWORD
            }
        })
            const mailOptions = {
                from: "wanilawhite2030@gmail.com",
                to: email,
                subject: "Тестовая отправка письма из nodeJs",
                text: `Ваш код подтверждения: ${code}`
                }
                const info = await transporter.sendMail(mailOptions)
     
    }catch(error){
        console.log(error)
    }
  }

  module.exports = sendEmail
  
