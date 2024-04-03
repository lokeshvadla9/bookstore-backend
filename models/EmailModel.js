const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key
sgMail.setApiKey('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');


const sendEmail= async (recipient, subject,html) => {
  const msg = {
    to:recipient, // Replace with the recipient's email address
    from: 'bookstoreuta@gmail.com', // Replace with your verified sender email address
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

