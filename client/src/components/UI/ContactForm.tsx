import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { gsap } from 'gsap';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactData) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Reset form and show success animation
      setFormData({ name: '', email: '', subject: '', message: '' });
      gsap.to('.success-message', { opacity: 1, duration: 0.5 });
      setTimeout(() => {
        gsap.to('.success-message', { opacity: 0, duration: 0.5 });
      }, 3000);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="contact-form-container">
      <div className="terminal-header">
        <div className="terminal-title">SECURE COMMUNICATION TERMINAL</div>
        <div className="terminal-status">STATUS: ENCRYPTED</div>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="name">IDENTITY:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">COMM_CHANNEL:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group full-width">
            <label htmlFor="subject">SUBJECT_LINE:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Enter subject"
            />
          </div>

          <div className="input-group full-width">
            <label htmlFor="message">MESSAGE_PAYLOAD:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Enter your encrypted message..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={contactMutation.isPending}
        >
          {contactMutation.isPending ? 'TRANSMITTING...' : 'SEND_MESSAGE'}
        </button>

        {contactMutation.isError && (
          <div className="error-message">
            TRANSMISSION_ERROR: Failed to send message. Please try again.
          </div>
        )}

        <div className="success-message" style={{ opacity: 0 }}>
          MESSAGE_SENT: Your communication has been received successfully.
        </div>
      </form>

      <div className="contact-info">
        <div className="info-section">
          <h3>DIRECT_CHANNELS:</h3>
          <p>EMAIL: cybersec.professional@secure.com</p>
          <p>PHONE: +1 (555) 123-CYBER</p>
          <p>LOCATION: Secure Server Farm, Digital Realm</p>
        </div>

        <div className="info-section">
          <h3>SOCIAL_NETWORKS:</h3>
          <p>LINKEDIN: /in/cybersecurity-expert</p>
          <p>GITHUB: /cyber-professional</p>
          <p>TWITTER: @CyberSecPro</p>
        </div>
      </div>
    </div>
  );
}
