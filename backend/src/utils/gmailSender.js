import nodemailer from 'nodemailer'

import dotenv from 'dotenv'

dotenv.config()


const transporter = nodemailer.createTransport(
{
    service : "gmail",
    auth : {
        user : process.env.GMAIL_EMAIL,
        pass : process.env.GMAIL_PASSWORD, 
    }
}
)

export const SendSignupMail =  (firstName,lastName,password,email,OTP,res) =>{
//   console.table({myEMail,myPassword})
    let mailOptions = {
        from: 'diomadelacorano@gmail.com',
        to: `${email}`,
        subject: `Account Creation`,
        html: ` <div>
        <p>Dear Mister/Madam ${firstName} ${lastName}
        Your TDX Account has been created  </p>
        <p>here are your login credentials</p>
        <p>Email : <span>${email}</span></p>
        <p> Password : <span>${password}</span></p>
        <p>OTP code : ${OTP}</p>
        <p>kindly change your pasword , after the first login</p>
        </div> ,
        `,
       
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return  res.json(err);
        }
      });
} 
export const ResendOTPMail =  (email,OTP,res) =>{
    let mailOptions = {
        from: 'diomadelacorano@gmail.com',
        to: `${email}`,
        subject: `OTP`,
        html: ` <div>
        <p>OTP code : ${OTP}</p>
        </div> ,
        `,
       
      };
      
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return  res.json(err);
        }
      });
}

