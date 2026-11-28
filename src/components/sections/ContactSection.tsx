import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/SocialIcons';
import { submitContactMessage } from '../../lib/supabase';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToast({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    setIsSubmitting(true);
    setToast(null);
    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setToast({ type: 'success', text: res.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setToast({ type: 'error', text: 'Failed to send. Please try again.' });
      }
    } catch {
      setToast({ type: 'error', text: 'System error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const SOCIAL = [
    { label: 'GitHub', value: 'github.com/IqbalMaulMaul', href: 'https://github.com/IqbalMaulMaul', icon: GithubIcon },
    { label: 'LinkedIn', value: 'linkedin.com/in/iqbal-maulana-dhiti-537a173b2', href: 'https://www.linkedin.com/in/iqbal-maulana-dhiti-537a173b2/', icon: LinkedinIcon },
    { label: 'Email', value: 'iqbalmaulanadhiti05@gmail.com', href: 'mailto:iqbalmaulanadhiti05@gmail.com', icon: Mail },
    { label: 'Instagram', value: '@ibalmaumau', href: 'https://www.instagram.com/ibalmaumau/', icon: InstagramIcon },
  ];

  return (
    <section id="contact" className="page-section contact-section" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="section-heading contact-heading"><div><span className="section-index">05 / Contact</span><h2 id="contact-title">Let's Build<br />Something Together</h2></div><img className="contact-art" src="/images/connection-sage.webp" srcSet="/images/connection-sage-mobile.webp 240w, /images/connection-sage.webp 400w" sizes="(max-width: 639px) 80px, (max-width: 1023px) 150px, 230px" width="400" height="400" alt="" loading="lazy" decoding="async" /></div>
        <div className="contact-layout">
          <div className="contact-details">
            <p className="contact-lead">Feel free to reach out for collaboration, freelance opportunities, or just to say hi!</p>
            <div className="social-list">{SOCIAL.map(({ label, value, href, icon: Icon }) => <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noopener noreferrer'}><Icon className="social-icon" /><div><span>{label}</span><strong>{value}</strong></div><ArrowUpRight size={18} aria-hidden="true" /></a>)}</div>
            <p className="availability"><span className="status-dot" /><span>Currently Available<small>Open to freelance & collaboration</small></span></p>
          </div>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row"><label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={event => setFormData({ ...formData, name: event.target.value })} required /></label><label htmlFor="contact-email">Your email<input id="contact-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={event => setFormData({ ...formData, email: event.target.value })} required /></label></div>
            <label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" rows={5} value={formData.message} onChange={event => setFormData({ ...formData, message: event.target.value })} required /></label>
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}<ArrowUpRight size={18} aria-hidden="true" /></button>
            {toast && <div className={`form-feedback ${toast.type}`} role={toast.type === 'error' ? 'alert' : 'status'}>{toast.type === 'success' ? <CheckCircle2 size={20} aria-hidden="true" /> : <AlertCircle size={20} aria-hidden="true" />}<p>{toast.text}</p></div>}
          </form>
        </div>
      </div>
    </section>
  );
};
