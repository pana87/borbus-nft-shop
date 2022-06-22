import nodemailer from "nodemailer"

export async function sendConfirmationEmail(body) {

  let transporter = nodemailer.createTransport({
    host: "mx2fa8.netcup.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'p.tsivelekidis@get-your.de',
      pass: '8~$n4po^YttF^k5NX%ViX~pUc6BJvh%b'
    }
  });

  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  // });

  var mailOptions = {
    from: '"Pana Boo 👻" <p.tsivelekidis@get-your.de>',
    to: 'p.tsivelekidis@gmail.com, f.steck@get-your.de',
    subject: 'Damn. Ein Kleidchen wurde verkauft.',
    html: `<div>${body}</div>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}
// sendConfirmationEmail("hi")
