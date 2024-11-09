import React, { useState } from 'react';
import styles from '../Styles/ContactUs.module.css';
import emailjs from 'emailjs-com';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace these values with your own from Email.js
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const userId = 'YOUR_USER_ID';

    // Construct email template parameters
    const templateParams = {
      name,
      email,
      subject,
      message,
    };

    // Send email
    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        alert('Your message has been sent!');
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.contactTitle}>Contact Us</h2>
      <p className={styles.contactSubtitle}>We'd love to hear from you!</p>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textArea}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Send Message</button>
      </form>
    </div>
  );
}

export default ContactUs;
