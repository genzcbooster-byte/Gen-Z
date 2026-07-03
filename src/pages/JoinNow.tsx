import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ArrowRight, Sparkles, Send, Download, MessageSquare } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { FAQ } from '../components/FAQ';

export const JoinNow = () => {
  useSEO({
    title: "Join Now | Become a Part of Genzverse",
    description: "Submit your application to join India's premium student-first marketing ecosystem. Gain access to paid brand gigs, ambassador programs, and creator opportunities.",
    keywords: "join genzverse, student ambassador, student gig economy, creator application"
  });

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    collegeName: '',
    collegeYear: '1st Year',
    subjects: '',
    whyJoin: '',
    whatsapp: '',
    instagram: '',
    superpower: 'Paid Gigs',
    heardAboutUs: 'Friend'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a premium modern API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Persist in localStorage so the application is saved locally on their device
      const savedApps = JSON.parse(localStorage.getItem('genzverse_applications') || '[]');
      savedApps.push({
        ...formData,
        submittedAt: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      });
      localStorage.setItem('genzverse_applications', JSON.stringify(savedApps));
    }, 1500);
  };

  // Generate a pre-filled WhatsApp link to easily text their application details to the organizers!
  const getWhatsAppLink = () => {
    const text = `Hi Genzverse! 🚀 I just submitted my student application to join the ecosystem.

*Name:* ${formData.fullName}
*Age:* ${formData.age}
*College:* ${formData.collegeName} (${formData.collegeYear})
*Subjects:* ${formData.subjects}
*Superpower:* ${formData.superpower}
*Instagram:* ${formData.instagram}

*Why I want to join:* ${formData.whyJoin}`;
    return `https://wa.me/9316106151?text=${encodeURIComponent(text)}`;
  };

  // Export current application to text format for safe keeping
  const handleDownloadCopy = () => {
    const textContent = `GENZVERSE STUDENT APPLICATION RECEIPT
==========================================
Full Name: ${formData.fullName}
Age: ${formData.age}
College Name: ${formData.collegeName}
College Year: ${formData.collegeYear}
Subjects/Course: ${formData.subjects}
Primary Interest/Superpower: ${formData.superpower}
Instagram Handle: ${formData.instagram}
WhatsApp Number: ${formData.whatsapp}
Heard About Us: ${formData.heardAboutUs}

Why Join Genzverse?:
${formData.whyJoin}

Submitted on: ${new Date().toLocaleDateString()}
Status: Received & Pending Verification
==========================================`;
    
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Genzverse_Receipt_${formData.fullName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-black text-white min-h-screen py-[6rem] px-[1.5em] md:px-[5em] relative overflow-hidden flex flex-col items-center">
      {/* Background Liquid Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-10%] w-[30rem] h-[30rem] bg-zinc-800/10 blur-[8rem] rounded-full animate-liquid-morph-1" />
        <div className="absolute bottom-[15%] right-[-10%] w-[35rem] h-[35rem] bg-zinc-900/15 blur-[9rem] rounded-full animate-liquid-morph-2" />
      </div>

      <div className="w-full max-w-[42rem] relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-white/10 text-white border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[0.7rem] md:text-[0.75rem] font-soehne font-bold uppercase tracking-widest backdrop-blur-md">
            // JOIN THE FORCE
          </div>
          <h1 className="font-canela text-[3rem] md:text-[4rem] font-bold tracking-tight mb-4 leading-none">
            Join the <span className="italic text-zinc-400 font-normal">Ecosystem</span>
          </h1>
          <p className="font-soehne text-zinc-400 text-sm md:text-base max-w-[32rem] mx-auto leading-relaxed">
            Ready to monetize your influence, represent major brands, and unlock paid opportunities? Fill out your details below and step into India's premier student-first portal.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-liquid-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[12rem] h-[12rem] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[4rem] pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name & Age */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block font-soehne text-[0.75rem] text-zinc-400 font-bold uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Advait Sharma"
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 font-soehne text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-400 font-bold uppercase tracking-widest mb-2">
                      Age *
                    </label>
                    <input
                      required
                      type="number"
                      name="age"
                      min="15"
                      max="30"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 19"
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 font-soehne text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                {/* College Name */}
                <div>
                  <label className="block font-soehne text-[0.75rem] text-zinc-400 font-bold uppercase tracking-widest mb-2">
                    College/University Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="e.g. Delhi University, HR College"
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 font-soehne text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                {/* College Year & Subjects */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-400 font-bold uppercase tracking-widest mb-2">
                      College Year *
                    </label>
                    <div className="relative">
                      <select
                        name="collegeYear"
                        value={formData.collegeYear}
                        onChange={handleChange}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 font-soehne text-white focus:outline-none focus:border-white/40 transition-colors appearance-none"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Post-Graduate">Post-Graduate</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▼</div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-soehne text-[0.75rem] text-zinc-400 font-bold uppercase tracking-widest mb-2">
                      Subjects / Stream of Study *
                    </label>
                    <input
                      required
                      type="text"
                      name="subjects"
                      value={formData.subjects}
                      onChange={handleChange}
                      placeholder="e.g. Commerce, Design, B.Tech CSE"
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 font-soehne text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-400 font-bold uppercase tracking-widest mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      required
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 font-soehne text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-400 font-bold uppercase tracking-widest mb-2">
                      Instagram Handle / Social Link *
                    </label>
                    <input
                      required
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="e.g. @advait_sharma"
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 font-soehne text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Primary Superpower / Core Interest */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-400 font-bold uppercase tracking-widest mb-2">
                      Your Primary Superpower *
                    </label>
                    <div className="relative">
                      <select
                        name="superpower"
                        value={formData.superpower}
                        onChange={handleChange}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 font-soehne text-white focus:outline-none focus:border-white/40 transition-colors appearance-none"
                      >
                        <option value="Paid Gigs & Micro-tasks">Paid Gigs & Micro-tasks</option>
                        <option value="Content Creation & Video">Content Creation & Video</option>
                        <option value="Campus Activations & Leaders">Campus Activations & Leaders</option>
                        <option value="Graphic Design / Art">Graphic Design / Art</option>
                        <option value="Event Planning & Volunteers">Event Planning & Volunteers</option>
                        <option value="Social Impact / Community">Social Impact / Community</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▼</div>
                    </div>
                  </div>
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-400 font-bold uppercase tracking-widest mb-2">
                      How did you hear about Genzverse?
                    </label>
                    <div className="relative">
                      <select
                        name="heardAboutUs"
                        value={formData.heardAboutUs}
                        onChange={handleChange}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 font-soehne text-white focus:outline-none focus:border-white/40 transition-colors appearance-none"
                      >
                        <option value="Friend">Friend / Word of mouth</option>
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Campus Ambassador">Campus Ambassador</option>
                        <option value="College Event">College Event / Fest</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▼</div>
                    </div>
                  </div>
                </div>

                {/* Why join Genzverse */}
                <div>
                  <label className="block font-soehne text-[0.75rem] text-zinc-400 font-bold uppercase tracking-widest mb-2">
                    Why do you want to join Genzverse? *
                  </label>
                  <textarea
                    required
                    name="whyJoin"
                    rows={4}
                    value={formData.whyJoin}
                    onChange={handleChange}
                    placeholder="Tell us what excites you about being part of our student network, your previous experience (if any), or how you can add value."
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 font-soehne text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black py-5 rounded-2xl font-soehne font-bold uppercase tracking-widest text-[0.95rem] flex items-center justify-center gap-3 transition-transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      PROCESSING APPLICATION...
                    </>
                  ) : (
                    <>
                      SUBMIT APPLICATION
                      <Send size="1.1rem" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-liquid-card rounded-[2.5rem] p-10 md:p-14 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[14rem] h-[14rem] bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[4rem] pointer-events-none" />
              
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center rounded-full">
                  <CheckCircle size="2.5rem" className="animate-pulse" />
                </div>
              </div>

              <h2 className="font-canela text-[2.4rem] md:text-[3rem] font-bold text-white tracking-tight mb-4">
                Application Received!
              </h2>
              <p className="font-soehne text-zinc-400 max-w-[28rem] mx-auto text-sm md:text-base leading-relaxed mb-10">
                You have successfully registered on our portal. Our student leaders and operations team review applications daily and will reach out to you via WhatsApp shortly!
              </p>

              {/* Action Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[28rem] mx-auto">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 py-4 px-6 rounded-2xl font-soehne font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all duration-300"
                >
                  <MessageSquare size="1rem" />
                  PING US ON WHATSAPP
                </a>

                <button
                  onClick={handleDownloadCopy}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 px-6 rounded-2xl font-soehne font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer"
                >
                  <Download size="1rem" />
                  DOWNLOAD RECEIPT
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-2 text-zinc-500 text-xs font-soehne uppercase tracking-wider">
                <Sparkles size="0.9rem" />
                Welcome to the student-first force
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <FAQ />
      </div>
    </div>
  );
};
