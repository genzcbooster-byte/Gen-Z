import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, ArrowRight, Sparkles, Send, Download, MessageSquare,
  Database, Lock, ShieldCheck, RefreshCw, ExternalLink, FileSpreadsheet,
  AlertTriangle, Trash2, Check, UserCheck
} from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { FAQ } from '../components/FAQ';
import { 
  googleSignIn, logout, initAuth, findSpreadsheet, createSpreadsheet, 
  appendApplication, fetchApplicationsFromSheet, getAccessToken
} from '../lib/googleSheets';
import { User } from 'firebase/auth';

export const JoinNow = () => {
  useSEO({
    title: "Join Now | Become a Part of Genzverse",
    description: "Submit your application to join India's premium student-first marketing ecosystem. Gain access to paid brand gigs, ambassador programs, and creator opportunities.",
    keywords: "join genzverse, student ambassador, student gig economy, creator application"
  });

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    collegeName: '',
    collegeYear: '1st Year',
    subjects: '',
    whyJoin: '',
    whatsapp: '',
    instagram: '',
    superpower: 'Paid Gigs & Micro-tasks',
    heardAboutUs: 'Friend'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form Validation State
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    whatsapp: '',
    age: ''
  });

  // Organizer Portal State
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [spreadsheetId, setSpreadsheetId] = useState<string>(localStorage.getItem('genzverse_spreadsheet_id') || '');
  const [sheetApplications, setSheetApplications] = useState<any[]>([]);
  const [isLoadingSheet, setIsLoadingSheet] = useState(false);
  const [sheetError, setSheetError] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');

  // Setup Firebase Auth State Change Subscriber
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setAdminUser(user);
        setAccessToken(token);
        setIsAdmin(true);
        if (spreadsheetId) {
          loadApplicationsFromSheet(token, spreadsheetId);
        } else {
          autoConnectSpreadsheet(token);
        }
      },
      () => {
        setIsAdmin(false);
        setAdminUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, [spreadsheetId]);

  const autoConnectSpreadsheet = async (token: string) => {
    try {
      const foundId = await findSpreadsheet(token);
      if (foundId) {
        setSpreadsheetId(foundId);
        localStorage.setItem('genzverse_spreadsheet_id', foundId);
        loadApplicationsFromSheet(token, foundId);
      }
    } catch (err) {
      console.error('Error auto-connecting spreadsheet:', err);
    }
  };

  const loadApplicationsFromSheet = async (token: string, sheetId: string) => {
    setIsLoadingSheet(true);
    setSheetError('');
    try {
      const apps = await fetchApplicationsFromSheet(token, sheetId);
      setSheetApplications(apps);
    } catch (err) {
      setSheetError('Failed to fetch applications from Google Sheet. Please check your network or permissions.');
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const handleAdminLogin = async () => {
    setIsLoadingSheet(true);
    setSheetError('');
    try {
      const result = await googleSignIn();
      if (result) {
        setAdminUser(result.user);
        setAccessToken(result.accessToken);
        setIsAdmin(true);
        
        let activeSheetId = spreadsheetId;
        if (!activeSheetId) {
          const foundId = await findSpreadsheet(result.accessToken);
          if (foundId) {
            activeSheetId = foundId;
          } else {
            setSyncStatus('Initializing Google Sheet in your Drive...');
            activeSheetId = await createSpreadsheet(result.accessToken);
          }
          setSpreadsheetId(activeSheetId);
          localStorage.setItem('genzverse_spreadsheet_id', activeSheetId);
        }
        
        loadApplicationsFromSheet(result.accessToken, activeSheetId);
        setSyncStatus('Connected with Google Sheets successfully!');
        setTimeout(() => setSyncStatus(''), 4000);
      }
    } catch (err: any) {
      setSheetError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const handleAdminLogout = async () => {
    await logout();
    setIsAdmin(false);
    setAdminUser(null);
    setAccessToken(null);
    setSheetApplications([]);
  };

  const getUnsyncedCount = () => {
    const localApps = JSON.parse(localStorage.getItem('genzverse_applications') || '[]');
    return localApps.filter((app: any) => !app.synced).length;
  };

  const handleSyncPending = async () => {
    const currentToken = accessToken || getAccessToken();
    if (!currentToken || !spreadsheetId) {
      setSheetError('Sign in with Google to sync pending submissions.');
      return;
    }
    
    setIsSyncing(true);
    setSyncStatus('Syncing offline submissions to Google Sheet...');
    setSheetError('');

    try {
      const localApps = JSON.parse(localStorage.getItem('genzverse_applications') || '[]');
      const unsyncedApps = localApps.filter((app: any) => !app.synced);
      
      let successCount = 0;
      for (const app of unsyncedApps) {
        const success = await appendApplication(currentToken, spreadsheetId, app);
        if (success) {
          app.synced = true;
          successCount++;
        }
      }

      localStorage.setItem('genzverse_applications', JSON.stringify(localApps));
      await loadApplicationsFromSheet(currentToken, spreadsheetId);
      
      setSyncStatus(`Successfully synced ${successCount} applications to Google Sheet!`);
      setTimeout(() => setSyncStatus(''), 4000);
    } catch (err) {
      setSheetError('Sync failed. Please check your network or Google Sheets settings.');
    } finally {
      setIsSyncing(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { email: '', whatsapp: '', age: '' };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email ID is compulsory.';
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g., advait@gmail.com).';
      isValid = false;
    }

    // Phone Validation (must contain exactly 10 digits)
    const digitsOnly = formData.whatsapp.replace(/\D/g, '');
    if (!formData.whatsapp.trim()) {
      errors.whatsapp = 'Phone / WhatsApp number is compulsory.';
      isValid = false;
    } else if (digitsOnly.length !== 10) {
      errors.whatsapp = 'Phone number must contain exactly 10 digits (e.g., 9316106151).';
      isValid = false;
    }

    // Age validation
    const parsedAge = parseInt(formData.age, 10);
    if (!formData.age.trim()) {
      errors.age = 'Age is compulsory.';
      isValid = false;
    } else if (isNaN(parsedAge) || parsedAge < 15 || parsedAge > 30) {
      errors.age = 'Please enter a valid age between 15 and 30.';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error dynamically on user typing
    if (name === 'email' || name === 'whatsapp' || name === 'age') {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    const submissionId = Math.random().toString(36).substr(2, 9);
    const newApp = {
      ...formData,
      id: submissionId,
      submittedAt: new Date().toLocaleString(),
      synced: false
    };
    
    const currentToken = accessToken || getAccessToken();
    if (currentToken && spreadsheetId) {
      const success = await appendApplication(currentToken, spreadsheetId, newApp);
      if (success) {
        newApp.synced = true;
      }
    }

    // Simulate premium visual delay for submission feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      const savedApps = JSON.parse(localStorage.getItem('genzverse_applications') || '[]');
      savedApps.push(newApp);
      localStorage.setItem('genzverse_applications', JSON.stringify(savedApps));

      if (currentToken && spreadsheetId) {
        loadApplicationsFromSheet(currentToken, spreadsheetId);
      }
    }, 1500);
  };

  // Generate a pre-filled WhatsApp link to easily text their application details to the organizers!
  const getWhatsAppLink = () => {
    const text = `Hi Genzverse! 🚀 I just submitted my student application to join the community.

*Name:* ${formData.fullName}
*Age:* ${formData.age}
*Email:* ${formData.email}
*College:* ${formData.collegeName} (${formData.collegeYear})
*Subjects:* ${formData.subjects || 'N/A'}
*Superpower:* ${formData.superpower}
*Instagram:* ${formData.instagram || 'N/A'}

*Why I want to join:* ${formData.whyJoin || 'N/A'}`;
    return `https://wa.me/9316106151?text=${encodeURIComponent(text)}`;
  };

  // Export current application to text format for safe keeping
  const handleDownloadCopy = () => {
    const textContent = `GENZVERSE STUDENT APPLICATION RECEIPT
==========================================
Full Name: ${formData.fullName}
Age: ${formData.age}
Email ID: ${formData.email}
College Name: ${formData.collegeName}
College Year: ${formData.collegeYear}
Subjects/Course: ${formData.subjects || 'N/A'}
Primary Interest/Superpower: ${formData.superpower}
Instagram Handle: ${formData.instagram || 'N/A'}
WhatsApp Number: ${formData.whatsapp}
Heard About Us: ${formData.heardAboutUs}

Why Join Genzverse?:
${formData.whyJoin || 'N/A'}

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
    <div className="bg-white dark:bg-[#0a0a0a] text-black dark:text-white min-h-screen py-[6rem] px-[1.5em] md:px-[5em] relative overflow-hidden flex flex-col items-center transition-colors duration-300">
      {/* Background Liquid Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-10%] w-[30rem] h-[30rem] bg-zinc-200/50 dark:bg-zinc-800/10 blur-[8rem] rounded-full animate-liquid-morph-1" />
        <div className="absolute bottom-[15%] right-[-10%] w-[35rem] h-[35rem] bg-zinc-100/40 dark:bg-zinc-900/10 blur-[9rem] rounded-full animate-liquid-morph-2" />
      </div>

      <div className="w-full max-w-[42rem] relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-black/5 dark:bg-white/5 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-6 text-[0.7rem] md:text-[0.75rem] font-soehne font-bold uppercase tracking-widest backdrop-blur-md transition-colors">
            // JOIN THE FORCE
          </div>
          <h1 className="font-canela text-[3rem] md:text-[4rem] font-bold tracking-tight text-black dark:text-white mb-4 leading-none transition-colors">
            Join the <span className="italic text-zinc-600 dark:text-zinc-400 font-normal transition-colors">Community</span>
          </h1>
          <p className="font-soehne text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-[32rem] mx-auto leading-relaxed transition-colors">
            Ready to monetize your influence, represent major brands, and unlock paid opportunities? Fill out your details below and step into India's premier student-first portal.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-liquid-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border border-black/5 dark:border-white/10"
            >
              <div className="absolute top-0 right-0 w-[12rem] h-[12rem] bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[4rem] pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name & Age */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Advait Sharma"
                      className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 font-soehne text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
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
                      className={`w-full bg-zinc-50 dark:bg-white/5 border rounded-2xl px-5 py-4 font-soehne text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors duration-300 ${validationErrors.age ? 'border-red-500/50 focus:border-red-500' : 'border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30'}`}
                    />
                    {validationErrors.age && (
                      <p className="text-red-500 text-xs font-soehne mt-2 tracking-wide font-medium">
                        {validationErrors.age}
                      </p>
                    )}
                  </div>
                </div>

                {/* College Name */}
                <div>
                  <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
                    College/University Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="e.g. Delhi University, HR College"
                    className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 font-soehne text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors duration-300"
                  />
                </div>

                {/* College Year & Subjects */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
                      College Year
                    </label>
                    <div className="relative">
                      <select
                        name="collegeYear"
                        value={formData.collegeYear}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 font-soehne text-black dark:text-white focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors duration-300 appearance-none"
                      >
                        <option value="1st Year" className="bg-white dark:bg-zinc-900 text-black dark:text-white">1st Year</option>
                        <option value="2nd Year" className="bg-white dark:bg-zinc-900 text-black dark:text-white">2nd Year</option>
                        <option value="3rd Year" className="bg-white dark:bg-zinc-900 text-black dark:text-white">3rd Year</option>
                        <option value="4th Year" className="bg-white dark:bg-zinc-900 text-black dark:text-white">4th Year</option>
                        <option value="Post-Graduate" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Post-Graduate</option>
                        <option value="Other" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Other</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 dark:text-zinc-400">▼</div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
                      Subjects / Stream of Study (Optional)
                    </label>
                    <input
                      type="text"
                      name="subjects"
                      value={formData.subjects}
                      onChange={handleChange}
                      placeholder="e.g. Commerce, Design, B.Tech CSE"
                      className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 font-soehne text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className={`w-full bg-zinc-50 dark:bg-white/5 border rounded-2xl px-5 py-4 font-soehne text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors duration-300 ${validationErrors.whatsapp ? 'border-red-500/50 focus:border-red-500' : 'border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30'}`}
                    />
                    {validationErrors.whatsapp && (
                      <p className="text-red-500 text-xs font-soehne mt-2 tracking-wide font-medium">
                        {validationErrors.whatsapp}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
                      Email ID *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. advait@gmail.com"
                      className={`w-full bg-zinc-50 dark:bg-white/5 border rounded-2xl px-5 py-4 font-soehne text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors duration-300 ${validationErrors.email ? 'border-red-500/50 focus:border-red-500' : 'border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30'}`}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs font-soehne mt-2 tracking-wide font-medium">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Social & Superpower */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
                      Instagram Handle / Social Link (Optional)
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="e.g. @advait_sharma"
                      className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 font-soehne text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
                      Your Primary Superpower (Optional)
                    </label>
                    <div className="relative">
                      <select
                        name="superpower"
                        value={formData.superpower}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 font-soehne text-black dark:text-white focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors duration-300 appearance-none"
                      >
                        <option value="Paid Gigs & Micro-tasks" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Paid Gigs & Micro-tasks</option>
                        <option value="Content Creation & Video" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Content Creation & Video</option>
                        <option value="Campus Activations & Leaders" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Campus Activations & Leaders</option>
                        <option value="Graphic Design / Art" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Graphic Design / Art</option>
                        <option value="Event Planning & Volunteers" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Event Planning & Volunteers</option>
                        <option value="Social Impact / Community" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Social Impact / Community</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 dark:text-zinc-400">▼</div>
                    </div>
                  </div>
                </div>

                {/* Discovery Source */}
                <div>
                  <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
                    How did you hear about Genzverse? (Optional)
                  </label>
                  <div className="relative">
                    <select
                      name="heardAboutUs"
                      value={formData.heardAboutUs}
                      onChange={handleChange}
                      className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 font-soehne text-black dark:text-white focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors duration-300 appearance-none"
                    >
                      <option value="Friend" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Friend / Word of mouth</option>
                      <option value="Instagram" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Instagram</option>
                      <option value="LinkedIn" className="bg-white dark:bg-zinc-900 text-black dark:text-white">LinkedIn</option>
                      <option value="Campus Ambassador" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Campus Ambassador</option>
                      <option value="College Event" className="bg-white dark:bg-zinc-900 text-black dark:text-white">College Event / Fest</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 dark:text-zinc-400">▼</div>
                  </div>
                </div>

                {/* Why join Genzverse */}
                <div>
                  <label className="block font-soehne text-[0.75rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-2 transition-colors">
                    Why do you want to join Genzverse? (Optional)
                  </label>
                  <textarea
                    name="whyJoin"
                    rows={4}
                    value={formData.whyJoin}
                    onChange={handleChange}
                    placeholder="Tell us what excites you about being part of our student network, your previous experience (if any), or how you can add value."
                    className="w-full bg-zinc-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 font-soehne text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors duration-300 resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-soehne font-bold uppercase tracking-widest text-[0.95rem] flex items-center justify-center gap-3 transition-transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer transition-colors duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
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
              className="glass-liquid-card rounded-[2.5rem] p-10 md:p-14 text-center relative overflow-hidden border border-black/5 dark:border-white/10"
            >
              <div className="absolute top-0 right-0 w-[14rem] h-[14rem] bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[4rem] pointer-events-none" />
              
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-full">
                  <CheckCircle size="2.5rem" className="animate-pulse" />
                </div>
              </div>

              <h2 className="font-canela text-[2.4rem] md:text-[3rem] font-bold text-black dark:text-white tracking-tight mb-4 transition-colors">
                Application Received!
              </h2>
              <p className="font-soehne text-zinc-500 dark:text-zinc-400 max-w-[28rem] mx-auto text-sm md:text-base leading-relaxed mb-10 transition-colors">
                You have successfully registered on our portal. Our student leaders and operations team review applications daily and will reach out to you via WhatsApp shortly!
              </p>

              {/* Action Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[28rem] mx-auto">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600/20 dark:bg-emerald-500/10 hover:bg-emerald-600/30 dark:hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 py-4 px-6 rounded-2xl font-soehne font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all duration-300"
                >
                  <MessageSquare size="1rem" />
                  PING US ON WHATSAPP
                </a>

                <button
                  onClick={handleDownloadCopy}
                  className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white py-4 px-6 rounded-2xl font-soehne font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer"
                >
                  <Download size="1rem" />
                  DOWNLOAD RECEIPT
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-soehne uppercase tracking-wider transition-colors">
                <Sparkles size="0.9rem" />
                Welcome to the student-first force
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <FAQ />

        {/* Organizer Portal & Google Sheets Sync */}
        <div className="mt-16 w-full glass-liquid-card rounded-[2.5rem] p-8 md:p-12 border border-black/5 dark:border-white/10 relative overflow-hidden transition-all">
          <div className="absolute top-0 left-0 w-[14rem] h-[14rem] bg-zinc-500/5 dark:bg-zinc-100/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-[4rem] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-black/10 dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full px-3.5 py-1 mb-3 text-[0.65rem] font-soehne font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                <Database size="0.8rem" className="text-zinc-600 dark:text-zinc-400" />
                ORGANIZER PORTAL
              </div>
              <h2 className="font-canela text-[1.8rem] md:text-[2.2rem] font-bold text-black dark:text-white tracking-tight leading-none">
                Google Sheets <span className="italic text-zinc-600 dark:text-zinc-400 font-normal">Database Connection</span>
              </h2>
              <p className="font-soehne text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-2 max-w-[28rem] leading-relaxed">
                Connect your workspace to view, manage, and verify student applications directly in your Google Spreadsheet.
              </p>
            </div>

            <div className="flex-shrink-0">
              {!isAdmin ? (
                <button
                  onClick={handleAdminLogin}
                  disabled={isLoadingSheet}
                  className="w-full sm:w-auto hover:bg-zinc-100 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-3.5 font-soehne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-sm cursor-pointer bg-white dark:bg-transparent text-black dark:text-white"
                >
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                  <span>Connect Google Sheets</span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  {adminUser?.photoURL && (
                    <img 
                      src={adminUser.photoURL} 
                      alt={adminUser.displayName || 'Admin'} 
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10"
                    />
                  )}
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-soehne font-bold text-black dark:text-white leading-tight">
                      {adminUser?.displayName || 'Organizer'}
                    </p>
                    <p className="text-[0.65rem] font-soehne text-zinc-500">Connected</p>
                  </div>
                  <button
                    onClick={handleAdminLogout}
                    className="bg-black/5 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 border border-black/10 dark:border-white/10 hover:border-red-500/20 rounded-xl px-3 py-1.5 font-soehne font-bold text-[0.65rem] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>

          {syncStatus && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-4 flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-soehne text-xs font-medium tracking-wide">
              <CheckCircle size="1.1rem" className="text-emerald-500 flex-shrink-0" />
              <span>{syncStatus}</span>
            </div>
          )}

          {sheetError && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 flex items-center gap-3 text-red-600 dark:text-red-400 font-soehne text-xs font-medium tracking-wide">
              <AlertTriangle size="1.1rem" className="text-red-500 flex-shrink-0" />
              <span>{sheetError}</span>
            </div>
          )}

          {isAdmin ? (
            <div className="space-y-6">
              {/* Spreadsheet Metadata Card */}
              <div className="bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-2xl">
                    <FileSpreadsheet size="1.6rem" />
                  </div>
                  <div>
                    <h3 className="font-soehne font-bold text-sm text-black dark:text-white flex items-center gap-2">
                      Genzverse Applications
                      <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    </h3>
                    <p className="font-soehne text-zinc-500 text-xs mt-1">
                      Target Spreadsheet connected and verified in Google Drive.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black dark:bg-white text-white dark:text-black hover:opacity-95 rounded-xl px-4 py-2.5 font-soehne font-bold text-[0.7rem] uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
                  >
                    Open Google Sheet
                    <ExternalLink size="0.8rem" />
                  </a>
                  <button
                    onClick={() => loadApplicationsFromSheet(accessToken!, spreadsheetId)}
                    disabled={isLoadingSheet}
                    className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl p-2.5 transition-all text-black dark:text-white disabled:opacity-50 cursor-pointer"
                    title="Refresh data"
                  >
                    <RefreshCw size="1rem" className={isLoadingSheet ? "animate-spin" : ""} />
                  </button>
                </div>
              </div>

              {/* Sync Status block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-6">
                  <h4 className="font-soehne text-[0.7rem] text-zinc-400 font-bold uppercase tracking-widest mb-1">
                    Google Sheets Sync status
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    {getUnsyncedCount() > 0 ? (
                      <>
                        <div>
                          <p className="font-canela text-xl md:text-2xl font-bold text-amber-600 dark:text-amber-400 leading-tight">
                            {getUnsyncedCount()} Pending
                          </p>
                          <p className="font-soehne text-zinc-500 text-[0.65rem] mt-0.5">
                            Submissions saved offline waiting to sync.
                          </p>
                        </div>
                        <button
                          onClick={handleSyncPending}
                          disabled={isSyncing}
                          className="bg-amber-600/20 hover:bg-amber-600/30 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 border border-amber-500/20 text-amber-700 dark:text-amber-400 px-4 py-2.5 rounded-xl font-soehne font-bold text-[0.65rem] uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <RefreshCw size="0.8rem" className={isSyncing ? "animate-spin" : ""} />
                          Sync Now
                        </button>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="font-canela text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 leading-tight">
                            Fully Synced
                          </p>
                          <p className="font-soehne text-zinc-500 text-[0.65rem] mt-0.5">
                            All local student applications match the spreadsheet.
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                          <Check size="1rem" />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-6">
                  <h4 className="font-soehne text-[0.7rem] text-zinc-400 font-bold uppercase tracking-widest mb-1">
                    TOTAL REGISTERED
                  </h4>
                  <p className="font-canela text-xl md:text-2xl font-bold text-black dark:text-white mt-3 leading-tight">
                    {sheetApplications.length} Candidates
                  </p>
                  <p className="font-soehne text-zinc-500 text-[0.65rem] mt-0.5">
                    Applications safely retrieved from Google Sheets.
                  </p>
                </div>
              </div>

              {/* Data Table Preview */}
              <div className="border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden bg-zinc-50 dark:bg-[#0c0c0c]">
                <div className="px-6 py-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
                  <h4 className="font-soehne text-[0.75rem] text-black dark:text-white font-bold uppercase tracking-widest">
                    Live Applications Table
                  </h4>
                  <span className="text-[0.65rem] font-soehne text-zinc-500 uppercase tracking-widest">
                    Verified Sheet Rows
                  </span>
                </div>

                <div className="overflow-x-auto">
                  {isLoadingSheet ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
                      <p className="font-soehne text-zinc-500 text-xs tracking-wider uppercase">
                        Loading spreadsheet rows...
                      </p>
                    </div>
                  ) : sheetApplications.length === 0 ? (
                    <div className="p-12 text-center text-zinc-400 font-soehne text-xs">
                      No student application rows found in Genzverse Applications Google Sheet.
                    </div>
                  ) : (
                    <table className="w-full text-left font-soehne text-xs border-collapse">
                      <thead>
                        <tr className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5 text-[0.65rem] font-bold text-zinc-500 uppercase tracking-wider">
                          <th className="px-6 py-3.5">Name</th>
                          <th className="px-6 py-3.5">Email</th>
                          <th className="px-6 py-3.5">Phone</th>
                          <th className="px-6 py-3.5 font-normal">College</th>
                          <th className="px-6 py-3.5 font-normal">Superpower</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 dark:divide-white/5 text-zinc-700 dark:text-zinc-300">
                        {sheetApplications.map((app) => (
                          <tr key={app.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-bold text-black dark:text-white">{app.fullName}</td>
                            <td className="px-6 py-4 font-mono">{app.email}</td>
                            <td className="px-6 py-4">{app.whatsapp}</td>
                            <td className="px-6 py-4">
                              {app.collegeName} <span className="text-zinc-500 text-[10px]">({app.collegeYear})</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-block bg-black/5 dark:bg-white/10 rounded-full px-2.5 py-1 text-[10px] font-medium border border-black/10 dark:border-white/10">
                                {app.superpower}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 px-6 bg-zinc-50 dark:bg-[#0c0c0c] border border-dashed border-black/10 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center">
              <Lock className="text-zinc-400 mb-3" size="2rem" />
              <h3 className="font-soehne font-bold text-sm text-black dark:text-white uppercase tracking-wider mb-2">
                Organizer Authentication Required
              </h3>
              <p className="font-soehne text-zinc-500 text-xs max-w-[22rem] leading-relaxed mb-6">
                Sign in with the authorized Genzverse administrator Google account to connect, check, and edit the backend Google Sheet.
              </p>
              <button
                onClick={handleAdminLogin}
                className="hover:opacity-90 rounded-2xl px-6 py-3.5 font-soehne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer bg-black dark:bg-white text-white dark:text-black border border-transparent"
              >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>Sign in as Organizer</span>
              </button>
            </div>
          )}
        </div>

        <FAQ />
      </div>
    </div>
  );
};
