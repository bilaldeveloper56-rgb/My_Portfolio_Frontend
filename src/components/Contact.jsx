import React, { useState, useRef } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { Upload, X, Send, AlertTriangle, CheckCircle, File, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    username_hp: '' // Honeypot field
  });
  
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Constants
  const MAX_FILES = 3;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = [
    'image/jpeg', 'image/png', 'image/webp',
    'application/pdf', 'application/zip', 'application/x-zip-compressed'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'File type not allowed. Only JPG, PNG, WEBP, PDF, and ZIP are allowed.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 5MB limit.';
    }
    return null;
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    if (files.length + newFiles.length > MAX_FILES) {
      setErrorMessage(`Maximum of ${MAX_FILES} attachments allowed.`);
      setStatus('error');
      return;
    }

    const validFiles = [];
    for (let file of newFiles) {
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
        setStatus('error');
        return;
      }
      validFiles.push(file);
    }

    setFiles(prev => [...prev, ...validFiles]);
    setErrorMessage('');
    if (status === 'error') setStatus('idle');
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side fields validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage('All text fields are required.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    // Anti-spam Honeypot Check
    if (formData.username_hp) {
      // Quietly succeed to deceive bots
      setTimeout(() => {
        setStatus('success');
        triggerConfetti();
        resetForm();
      }, 1000);
      return;
    }

    // Determine Provider (EmailJS vs. Backend API)
    let provider = import.meta.env.VITE_CONTACT_PROVIDER || 'emailjs';

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS keys are present and are not the default template placeholders
    const isEmailJSConfigured = serviceId && templateId && userId &&
      serviceId !== 'your_service_id_here' &&
      templateId !== 'your_template_id_here' &&
      userId !== 'your_public_key_here' &&
      serviceId.trim() !== '' &&
      templateId.trim() !== '' &&
      userId.trim() !== '';

    if (provider === 'emailjs' && !isEmailJSConfigured) {
      console.warn('EmailJS keys are not configured or are placeholders. Automatically falling back to backend REST API.');
      provider = 'backend';
    }

    try {
      if (provider === 'emailjs') {
        // Option 1: EmailJS submission
        const templateParams = {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
          attachments_count: files.length
        };

        // Dynamically load emailjs SDK if emailjs is chosen
        const emailjs = await import('@emailjs/browser');
        await emailjs.send(serviceId, templateId, templateParams, userId);
      } else {
        // Option 2: Backend REST API
        const formPayload = new FormData();
        formPayload.append('name', formData.name);
        formPayload.append('email', formData.email);
        formPayload.append('subject', formData.subject);
        formPayload.append('message', formData.message);
        formPayload.append('username_hp', formData.username_hp);
        
        files.forEach(file => {
          formPayload.append('attachments', file);
        });

        // POST multipart request to backend messages route
        await axios.post('/api/messages', formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      setStatus('success');
      triggerConfetti();
      resetForm();
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      const serverError = err.response?.data?.error || err.message || 'Submission failed. Please check network and try again.';
      setErrorMessage(serverError);
      setStatus('error');
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#4F46E5', '#6366F1', '#10B981']
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      username_hp: ''
    });
    setFiles([]);
  };

  return (
    <section className="py-16 md:py-24 relative" id="contact">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 max-w-[600px] mx-auto">
          <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-text-main to-primary bg-clip-text text-transparent">Get In Touch</h2>
          <p className="text-lg text-text-secondary">Have a project or opportunity? Shoot me a message.</p>
        </div>

        <div className="max-w-[680px] mx-auto">
          <form className="p-6 sm:p-10 border border-card-border rounded-xl bg-card shadow-sm flex flex-col gap-6 glass" onSubmit={handleSubmit}>
            {/* Honeypot field (hidden from users, exposed to screen readers) */}
            <div className="sr-only">
              <label htmlFor="username_hp">Leave this field blank if you are human</label>
              <input
                type="text"
                id="username_hp"
                name="username_hp"
                value={formData.username_hp}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 text-left">
                <label htmlFor="name" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md border border-card-border bg-bg text-text-main text-sm transition-all duration-150 focus:border-primary focus:shadow-glow focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label htmlFor="email" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md border border-card-border bg-bg text-text-main text-sm transition-all duration-150 focus:border-primary focus:shadow-glow focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-left">
              <label htmlFor="subject" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="Project Scope Proposal"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md border border-card-border bg-bg text-text-main text-sm transition-all duration-150 focus:border-primary focus:shadow-glow focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 text-left">
              <label htmlFor="message" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Hi Bilal, I would like to discuss..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md border border-card-border bg-bg text-text-main text-sm transition-all duration-150 focus:border-primary focus:shadow-glow focus:outline-none resize-vertical"
              ></textarea>
            </div>

            {/* Drag & Drop File Upload */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Attachments (Optional - max 3 files, 5MB each)</label>
              <div 
                className={`border-2 border-dashed border-card-border bg-bg rounded-xl p-6 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-150 ${dragActive ? 'border-primary bg-primary-light' : 'hover:border-primary hover:bg-primary-light'}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input 
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  multiple
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.webp,.pdf,.zip"
                />
                <Upload size={24} className="text-text-muted hover:text-primary transition-colors duration-150" />
                <p className="text-sm text-text-secondary">
                  Drag & Drop files here, or <span className="text-primary font-semibold underline">browse</span>
                </p>
                <span className="text-xs text-text-muted">Allowed formats: JPG, PNG, WEBP, PDF, ZIP</span>
              </div>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="flex flex-col gap-1.5 mt-1.5">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center px-4 py-2 rounded-md border border-card-border bg-card text-xs">
                      <File size={16} className="text-primary mr-1" />
                      <span className="text-text-main font-medium flex-grow truncate mr-4">{file.name}</span>
                      <span className="text-text-muted mr-4">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      <button 
                        type="button" 
                        className="flex items-center justify-center p-1 rounded-full text-text-secondary hover:bg-primary-light hover:text-danger cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                        aria-label="Remove attachment"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status alerts */}
            {status === 'success' && (
              <div className="flex items-center gap-2 p-4 rounded-md text-sm border bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.2)] text-success">
                <CheckCircle size={18} />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 p-4 rounded-md text-sm border bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)] text-danger">
                <AlertTriangle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary w-full py-3.5 cursor-pointer disabled:opacity-50" 
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" /> Sending Inquiry...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
