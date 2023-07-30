import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const send = async ({ to, subject, html }: Record<string, string>) => {
  try {
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', 
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.log(error);
  }
};
