import React from 'react';
import { motion } from 'framer-motion';

const DomainCard = ({ domain, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[4/3]"
    >
      {/* Background Image */}
      <img
        src={domain.image}
        alt={domain.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-aether-900/90 via-aether-900/40 to-aether-900/20 group-hover:from-aether-900/80 transition-all duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        <span className="text-[10px] tracking-[0.3em] uppercase text-cyan-500 font-bold mb-1 shadow-sm">
          {domain.subtitle}
        </span>
        <h3 className="font-serif text-xl md:text-2xl text-white font-bold tracking-widest uppercase">
          {domain.title}
        </h3>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-500/30 transition-all duration-500" />
    </motion.div>
  );
};

export default DomainCard;
