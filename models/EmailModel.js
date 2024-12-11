const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key
sgMail.setApiKey('API_KEY');


const sendEmail= async (recipient, subject,html) => {
  const msg = {
    to:recipient, 
    from: 'YOUR_EMAIL', 
    subject: subject,
    html:html
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    return false;
  }

};

module.exports = { sendEmail };

