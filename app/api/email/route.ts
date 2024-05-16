import { type NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
    
    const data = await request.json()
    const { email, name, message } = data;

    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });
  
    const mailOptions: Mail.Options = {
      from: process.env.MY_EMAIL,
      to: 'stacey@shesthefronz.com',
      // cc: email, (uncomment this line if you want to send a copy to the sender)
      subject: `Fronz Query from ${name} (${email})`,
      text: message,
    };
  
    const sendMailPromise = () =>
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err) {
          if (!err) {
            resolve('Email sent');
          } else {
            console.log(err.message)
            reject(err.message);
          }
        });
      });
  
    try {
      await sendMailPromise();
      return NextResponse.json({ message: 'Email sent' });
    } catch (err) {
      return NextResponse.json({ error: err }, { status: 500 });
    }
}