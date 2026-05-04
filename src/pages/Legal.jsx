import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Truck, ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Legal = () => {
  const location = useLocation();
  const path = location.pathname.substring(1);
  
  const content = {
    privacy: {
      title: 'Privacy Protocol',
      subtitle: 'Data Integrity & Sovereignty',
      icon: Shield,
      text: 'At GLACIER, your data is treated with the same reverence as our physical artifacts. We implement near-atomic level encryption and never share your identity with third-party entities without explicit diplomatic clearance.'
    },
    terms: {
      title: 'Terms of Sovereignty',
      subtitle: 'The Artifact Acquisition Accord',
      icon: FileText,
      text: 'By accessing the GLACIER vault, you agree to respect the intellectual property of our artisans. All acquisitions are final once the blockchain verification is complete.'
    },
    shipping: {
      title: 'Logistics & Deployment',
      subtitle: 'Global Artifact Transit',
      icon: Truck,
      text: 'We utilize white-glove, climate-controlled transport for all deliveries. Artifacts are insured at 200% of their valuation from the moment they leave our vault until they are secured in yours.'
    }
  };

  const active = content[path] || content.privacy;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold text-cyan-500 uppercase tracking-[0.3em] mb-12 hover:gap-4 transition-all">
        <ChevronLeft className="w-4 h-4" /> Return to Origins
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 md:p-20 space-y-12"
      >
        <header className="space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <active.icon className="w-8 h-8 text-cyan-500" />
          </div>
          <p className="text-cyan-500 text-[10px] tracking-[0.5em] uppercase font-bold">{active.subtitle}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-text-primary italic">{active.title}</h1>
        </header>

        <div className="space-y-8 text-text-secondary leading-relaxed uppercase tracking-[0.15em] text-[13px] font-medium opacity-80">
          <p>{active.text}</p>
          <p>This is a placeholder for the complete {active.title} documentation. In a production environment, this would contain detailed legal clauses governing the relationship between the GLACIER Luxury Group and its distinguished clientele.</p>
          
          <div className="pt-10 border-t border-glass-border">
            <p className="text-[10px] text-text-muted">Last Updated: May 2024</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Legal;
