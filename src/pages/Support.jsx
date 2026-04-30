import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "How do I track my luxury delivery?",
    answer: "Once your order is dispatched, you will receive a tracking link via email. Our White Glove Delivery service provides real-time updates and secure handover."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days for unworn, pristine items in their original packaging. Custom and engraved pieces are non-refundable."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship globally via insured premium couriers. Taxes and duties are calculated at checkout."
  },
  {
    question: "How can I book a private viewing?",
    answer: "Private viewings for Haute Joaillerie and limited collections can be scheduled through your dedicated concierge or by contacting support."
  }
];

const Support = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 max-w-5xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <p className="text-[10px] tracking-[0.3em] uppercase text-cyan-500 mb-4 font-bold">Client Care</p>
        <h1 className="font-serif text-4xl md:text-5xl text-text-primary tracking-wide uppercase font-bold">How can we assist you?</h1>
        <p className="text-text-muted text-sm mt-6 max-w-lg mx-auto leading-relaxed font-bold uppercase tracking-widest text-[11px] opacity-80">
          Our dedicated concierge team is available 24/7 to provide exceptional service and guidance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-10 text-center hover:bg-aether-800 transition-all border-glass-border shadow-xl group">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:bg-cyan-500/10 transition-colors">
            <MessageSquare className="w-6 h-6 text-cyan-500" />
          </div>
          <h3 className="text-lg font-serif text-text-primary mb-3 uppercase tracking-widest font-bold">Live Concierge</h3>
          <p className="text-xs text-text-secondary mb-8 leading-relaxed font-bold uppercase tracking-widest text-[10px] opacity-70">Chat instantly with our luxury specialists for immediate assistance.</p>
          <button className="text-[10px] font-bold tracking-[0.3em] text-cyan-500 uppercase hover:text-cyan-400 transition-colors">Start Chat</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-10 text-center hover:bg-aether-800 transition-all border-glass-border shadow-xl group">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:bg-cyan-500/10 transition-colors">
            <Phone className="w-6 h-6 text-cyan-500" />
          </div>
          <h3 className="text-lg font-serif text-text-primary mb-3 uppercase tracking-widest font-bold">Direct Line</h3>
          <p className="text-xs text-text-secondary mb-8 leading-relaxed font-bold uppercase tracking-widest text-[10px] opacity-70">Call our global support center for inquiries requiring immediate attention.</p>
          <button className="text-[10px] font-bold tracking-[0.3em] text-cyan-500 uppercase hover:text-cyan-400 transition-colors">+41 22 000 00 00</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-10 text-center hover:bg-aether-800 transition-all border-glass-border shadow-xl group">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:bg-cyan-500/10 transition-colors">
            <Mail className="w-6 h-6 text-cyan-500" />
          </div>
          <h3 className="text-lg font-serif text-text-primary mb-3 uppercase tracking-widest font-bold">Email Support</h3>
          <p className="text-xs text-text-secondary mb-8 leading-relaxed font-bold uppercase tracking-widest text-[10px] opacity-70">Prefer to write? Send us an email and we will reply within 24 hours.</p>
          <Link to="/contact" className="text-[10px] font-bold tracking-[0.3em] text-cyan-500 uppercase hover:text-cyan-400 transition-colors">Send Email</Link>
        </motion.div>
      </div>

      <div className="glass-card p-10 md:p-16 border-glass-border shadow-2xl">
        <h2 className="text-2xl font-serif text-text-primary mb-12 flex items-center gap-4 uppercase tracking-widest font-bold">
          <FileText className="w-6 h-6 text-cyan-500" /> Frequently Asked Questions
        </h2>
        
        <div className="space-y-10">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-glass-border pb-10 last:border-0 last:pb-0">
              <h4 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">{faq.question}</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-bold uppercase tracking-widest opacity-80">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
