import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent successfully! We'll be in touch soon.");
      setFormData({ name: '', email: '', message: '' });
      setLoading(false);
    }, 1200);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-slate-400">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-dark-800 p-8 rounded-2xl border border-dark-700">
              <h3 className="text-xl font-semibold text-white mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-slate-300">
                  <Mail className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <p className="font-medium text-slate-200">Email</p>
                    <a href="mailto:support@luxe.com" className="hover:text-primary transition-colors">support@luxe.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-slate-300">
                  <Phone className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <p className="font-medium text-slate-200">Phone</p>
                    <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-slate-300">
                  <MapPin className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <p className="font-medium text-slate-200">Location</p>
                    <p className="mt-1 leading-relaxed">123 Elegance Blvd<br />Beverly Hills, CA 90210</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-dark-800 p-8 rounded-2xl border border-dark-700 space-y-6 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input 
                  label="Your Name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <Input 
                  label="Your Email" 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-slate-300">Your Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6" 
                  required
                  className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-200 transition-colors placeholder:text-slate-500 resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <Button type="submit" variant="primary" className="w-full py-3 text-lg" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
