import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import axios from 'axios';
import { LogOut, Trash2, Download, Mail, Calendar, User, FileText, Info, Loader2, ArrowLeft } from 'lucide-react';

const Dashboard = () => {
  const { logout, user } = useAdmin();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [downloadingFile, setDownloadingFile] = useState(null);

  // Fetch inquiries from backend
  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/messages');
      if (response.data.success) {
        setMessages(response.data.messages);
      } else {
        setError('Failed to fetch inquiries.');
      }
    } catch (err) {
      console.error('Fetch Messages Error:', err);
      setError(err.response?.data?.error || 'Failed to connect to messages service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message permanently?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await axios.delete(`/api/messages/${id}`);
      if (response.data.success) {
        setMessages(prev => prev.filter(msg => msg._id !== id));
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      } else {
        alert(response.data.error || 'Failed to delete message.');
      }
    } catch (err) {
      console.error('Delete message error:', err);
      alert('Error connecting to deletion service.');
    } finally {
      setDeletingId(null);
    }
  };

  // Secure attachment download using binary blob conversion
  const handleDownload = async (attachment) => {
    const filename = attachment.path.split(/[\\/]/).pop(); // Extract filename from local uploads path
    setDownloadingFile(attachment._id);
    
    try {
      const response = await axios.get(`/api/messages/attachments/${filename}`, {
        responseType: 'blob' // Force response as binary data blob
      });

      // Create download anchor trigger
      const blob = new Blob([response.data], { type: attachment.mimetype });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', attachment.filename);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup DOM
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Secure download failure:', err);
      alert('Secure download failed. Session might have expired or file has been deleted.');
    } finally {
      setDownloadingFile(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-bg text-text-main flex flex-col">
      {/* Top Navbar */}
      <header className="h-[70px] sticky top-0 left-0 w-full border-b border-navbar-border z-50 flex items-center glass">
        <div className="w-full max-w-[1200px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-primary flex items-center"><Info size={18} /></span>
            <h1 className="text-lg font-bold text-text-main">Inquiry Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs font-semibold text-text-secondary bg-primary-light px-3 py-1.5 rounded-full">{user?.email || 'Administrator'}</span>
            <button className="btn btn-secondary py-2 px-4 text-xs cursor-pointer" onClick={() => navigate('/')}>
              <ArrowLeft size={14} /> Portfolio
            </button>
            <button className="btn btn-primary py-2 px-4 text-xs cursor-pointer" onClick={handleLogout}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1200px] mx-auto px-6 flex-grow pt-6 pb-10">
        {error && (
          <div className="flex items-center justify-between gap-2 p-4 rounded-md text-sm border bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)] text-danger mb-4">
            <span>{error}</span>
            <button className="btn btn-secondary btn-sm py-1.5 px-3" onClick={fetchMessages}>Retry</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:h-[calc(100vh-120px)]">
          {/* Messages list */}
          <div className="flex flex-col h-full">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-2">Inbox Inquiries ({messages.length})</h2>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-text-secondary gap-4">
                <Loader2 className="animate-spin" size={32} />
                <p>Retrieving secure logs...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-text-muted gap-2 border border-dashed border-card-border rounded-xl bg-card">
                <Mail size={48} className="text-card-border" />
                <p>No messages received yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 overflow-y-auto pr-1 flex-grow lg:max-h-[calc(100vh-160px)]">
                {messages.map((msg) => (
                  <div 
                    key={msg._id} 
                    className={`p-4 cursor-pointer flex flex-col gap-1 border rounded-xl bg-card text-left transition-all duration-150 ${selectedMessage?._id === msg._id ? 'border-primary bg-primary-light shadow-sm' : 'border-card-border hover:border-primary shadow-sm hover:shadow'}`}
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <div className="flex justify-between text-[0.7rem] text-text-muted">
                      <span className="flex items-center gap-0.5 font-semibold text-text-secondary"><User size={12} /> {msg.name}</span>
                      <span className="flex items-center gap-0.5"><Calendar size={12} /> {formatDate(msg.createdAt)}</span>
                    </div>
                    <span className="text-sm font-bold text-text-main truncate">{msg.subject}</span>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{msg.message}</p>
                    
                    <div className="flex justify-between items-center mt-1">
                      {msg.attachments?.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[0.65rem] bg-card-border text-text-secondary px-1.5 py-0.5 rounded">
                          <Download size={10} /> {msg.attachments.length} attachment(s)
                        </span>
                      )}
                      <button 
                        className="text-text-muted p-1 rounded hover:text-danger hover:bg-[rgba(239,68,68,0.08)] ml-auto transition-all duration-150 cursor-pointer" 
                        disabled={deletingId === msg._id}
                        onClick={(e) => { e.stopPropagation(); handleDelete(msg._id); }}
                        aria-label="Delete message"
                      >
                        {deletingId === msg._id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Detail view */}
          <div className="flex flex-col h-full">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-2">Inquiry Inspector</h2>
            {selectedMessage ? (
              <div className="p-6 border border-card-border rounded-xl bg-card shadow-sm flex flex-col gap-6 text-left overflow-y-auto lg:max-h-[calc(100vh-160px)] lg:sticky lg:top-[90px] glass">
                <div className="flex flex-col gap-1.5 border-b border-card-border pb-4">
                  <div className="flex text-sm">
                    <span className="w-20 font-semibold text-text-secondary">From:</span>
                    <span className="text-text-main break-all">{selectedMessage.name} &lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="w-20 font-semibold text-text-secondary">Date:</span>
                    <span className="text-text-main break-all">{formatDate(selectedMessage.createdAt)}</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="w-20 font-semibold text-text-secondary">Subject:</span>
                    <span className="text-text-main break-all font-bold text-primary">{selectedMessage.subject}</span>
                  </div>
                  {selectedMessage.ipAddress && (
                    <div className="flex text-sm">
                      <span className="w-20 font-semibold text-text-secondary">Sender IP:</span>
                      <span className="text-text-main break-all text-text-muted">{selectedMessage.ipAddress}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1"><FileText size={14} /> Message Content</h4>
                  <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap bg-bg p-4 rounded-md border border-card-border">{selectedMessage.message}</p>
                </div>

                {selectedMessage.attachments?.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1"><Download size={14} /> Attachments</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedMessage.attachments.map((file) => (
                        <div key={file._id} className="flex items-center px-4 py-2 rounded-md bg-bg border border-card-border text-xs w-full">
                          <span className="text-text-main font-medium flex-grow truncate" title={file.filename}>{file.filename}</span>
                          <span className="text-text-muted ml-1 mr-4">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          <button 
                            className="text-primary hover:text-primary-hover flex items-center justify-center p-1 cursor-pointer"
                            disabled={downloadingFile === file._id}
                            onClick={() => handleDownload(file)}
                            aria-label={`Download ${file.filename}`}
                          >
                            {downloadingFile === file._id ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow py-20 px-6 text-text-muted text-center gap-4 border border-dashed border-card-border rounded-xl bg-card glass lg:max-h-[calc(100vh-160px)] lg:sticky lg:top-[90px]">
                <Mail size={40} className="text-card-border" />
                <p>Select an inquiry from the inbox to inspect details and download attachments.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
