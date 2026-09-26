'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or contact us directly.');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-charcoal text-offwhite border-t border-offwhite/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Copy */}
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <span className="text-gold tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Next Steps</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-offwhite mb-8">Begin the Dialogue</h2>
            <p className="text-offwhite/70 text-lg leading-relaxed mb-12 max-w-md">
              Register your interest to receive comprehensive floor plans, pricing details, and an invitation for a private site tour.
            </p>
            
            <div className="space-y-6 text-sm tracking-widest uppercase text-offwhite/60">
              <div>
                <strong className="block text-offwhite mb-1">Sales Gallery</strong>
                142 Luxury Avenue, Financial District
              </div>
              <div>
                <strong className="block text-offwhite mb-1">Contact</strong>
                +1 (800) 555-0199<br />
                enquiries@swasharealty.com
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-offwhite text-charcoal p-8 md:p-12 relative overflow-hidden h-full flex flex-col justify-center min-h-[500px]">
              
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center flex flex-col items-center"
                >
                  <CheckCircle2 className="text-gold mb-6" size={48} strokeWidth={1.5} />
                  <h3 className="font-serif text-3xl mb-4">Thank You</h3>
                  <p className="text-charcoal/70 leading-relaxed max-w-sm">
                    Your enquiry has been received. A dedicated representative will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 border border-red-200 text-sm">
                      {errorMessage}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-semibold tracking-widest uppercase text-charcoal/60">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-charcoal/20 py-3 text-lg focus:outline-none focus:border-gold transition-colors placeholder:text-charcoal/30"
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-semibold tracking-widest uppercase text-charcoal/60">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-charcoal/20 py-3 text-lg focus:outline-none focus:border-gold transition-colors placeholder:text-charcoal/30"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs font-semibold tracking-widest uppercase text-charcoal/60">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-charcoal/20 py-3 text-lg focus:outline-none focus:border-gold transition-colors placeholder:text-charcoal/30"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="interest" className="block text-xs font-semibold tracking-widest uppercase text-charcoal/60">Residence of Interest</label>
                    <select 
                      id="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-charcoal/20 py-3 text-lg focus:outline-none focus:border-gold transition-colors appearance-none"
                    >
                      <option value="">Select a residence</option>
                      <option value="2bhk">2 BHK Residence</option>
                      <option value="3bhk">3 BHK Signature</option>
                      <option value="penthouse">Penthouse Collection</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group w-full py-5 bg-charcoal text-offwhite font-semibold tracking-widest uppercase text-sm hover:bg-gold hover:text-charcoal transition-colors duration-300 flex items-center justify-center gap-4 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Enquire Now'}
                    {status !== 'submitting' && (
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
