import React from 'react';

interface LogoProps {
  className?: string;
}

export const HTML5Logo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#E44D26" d="M18.8 112L9 2h110l-9.8 110L64 126l-45.2-14z"/>
    <path fill="#F16529" d="M64 116.8l37.2-11.5 8.3-93.3H64v104.8z"/>
    <path fill="#EBEBEB" d="M64 50H45.8l-1.3-14.7H64V21.4H28.6l.4 4.3 3.6 40H64V50zM64 88.5l-.2.1-15.5-4.2-1-11.2H32.5l1.9 21.8L64 103.5v-15z"/>
    <path fill="#FFFFFF" d="M64 50h18.2l-1.7 19.3L64 73.5V88.5l18.6-5 2.5-27.8.4-4.3.4-4.3H64V50zM64 21.4h37.4l-.4 4.3-.4 4.3H64V21.4z"/>
  </svg>
);

export const CSS3Logo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#1572B6" d="M18.8 112L9 2h110l-9.8 110L64 126l-45.2-14z"/>
    <path fill="#33A9DC" d="M64 116.8l37.2-11.5 8.3-93.3H64v104.8z"/>
    <path fill="#EBEBEB" d="M64 50H45.8l-1.3-14.7H64V21.4H28.6l.4 4.3 3.6 40H64V50zM64 88.5l-.2.1-15.5-4.2-1-11.2H32.5l1.9 21.8L64 103.5v-15z"/>
    <path fill="#FFFFFF" d="M64 50h18.2l-1.7 19.3L64 73.5H64v15l18.6-5 2.5-27.8.4-4.3.4-4.3H64V50zM64 21.4h37.4l-.4 4.3-.4 4.3H64V21.4z"/>
  </svg>
);

export const JSLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="16" fill="#F7DF1E"/>
    <path d="M67.3 100.8c3.2 5.1 7.6 8.5 15.6 8.5 6.6 0 10.9-3.3 10.9-8 0-5.5-4.4-7.6-11.8-10.9l-4.1-1.8c-11.9-5.1-19.8-11.5-19.8-25.1 0-13.4 10.4-23.7 26.6-23.7 11.6 0 19.8 4.2 25.5 14.1l-10.9 7c-3.4-6-7.1-8.3-14.4-8.3-5.5 0-9.2 3.1-9.2 7.3 0 4.9 3.5 6.9 10.9 10.1l4.1 1.8c14.2 6.1 21.1 12.3 21.1 26.1 0 15.3-12 24.6-29.8 24.6-15.9 0-25.8-7.7-31.5-17.7l10.8-7zM25 101.4c2.8 4.7 6.4 8.2 12.9 8.2 6.6 0 10.7-2.6 10.7-12.8V41h14.5v56.5c0 17.7-10.4 25.3-26.6 25.3-12.7 0-20.6-6.1-24.3-15.1l12.8-6.3z" fill="#000000"/>
  </svg>
);

export const ReactLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="10" fill="#00D8FF" />
    <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00D8FF" strokeWidth="4" />
    <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00D8FF" strokeWidth="4" transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00D8FF" strokeWidth="4" transform="rotate(120 50 50)" />
  </svg>
);

export const TailwindLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#38BDF8" d="M64 24c-17.7 0-28.7 8.8-33 26.5 6.6-8.8 14.3-12.1 23.1-9.9 5 1.3 8.6 4.9 12.6 9 6.4 6.5 13.9 14.1 30.3 14.1 17.7 0 28.7-8.8 33-26.5-6.6 8.8-14.3 12.1-23.1 9.9-5-1.3-8.6-4.9-12.6-9C87.9 31.6 80.4 24 64 24zM31 63.7c-17.7 0-28.7 8.8-33 26.5 6.6-8.8 14.3-12.1 23.1-9.9 5 1.3 8.6 4.9 12.6 9 6.4 6.5 13.9 14.1 30.3 14.1 17.7 0 28.7-8.8 33-26.5-6.6 8.8-14.3 12.1-23.1 9.9-5-1.3-8.6-4.9-12.6-9-6.4-6.5-13.9-14.1-30.3-14.1z"/>
  </svg>
);

export const ThreeJSLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 12L12 42v44l52 30 52-30V42L64 12z" stroke="#00F0FF" strokeWidth="6" fill="none" />
    <path d="M64 12v104M12 42l52 30 52-30" stroke="#00F0FF" strokeWidth="5" fill="none" />
    <circle cx="64" cy="42" r="6" fill="#00F0FF" />
    <circle cx="38" cy="84" r="6" fill="#00F0FF" />
    <circle cx="90" cy="84" r="6" fill="#00F0FF" />
  </svg>
);

export const GSAPLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="16" fill="#0B132B" stroke="#88CE02" strokeWidth="4"/>
    <path d="M30 64c0-18.8 15.2-34 34-34s34 15.2 34 34-15.2 34-34 34" stroke="#88CE02" strokeWidth="12" strokeLinecap="round"/>
    <circle cx="64" cy="64" r="12" fill="#88CE02"/>
  </svg>
);

export const LaravelLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FF2D20" d="M102.7 28.5L78.1 14.3c-1.3-.8-3-.8-4.3 0L49.2 28.5c-1.3.8-2.1 2.2-2.1 3.7v28.4L22.5 46.4c-1.3-.8-3-.8-4.3 0L4 54.6c-1.3.8-2.1 2.2-2.1 3.7v55.5c0 1.5.8 2.9 2.1 3.7l24.6 14.2c.7.4 1.4.6 2.1.6s1.5-.2 2.1-.6l49.2-28.4c1.3-.8 2.1-2.2 2.1-3.7V71.2l24.6-14.2c1.3-.8 2.1-2.2 2.1-3.7V32.2c.1-1.5-.7-2.9-2-3.7z"/>
  </svg>
);

export const MySQLLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#00758F" d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52S92.7 12 64 12zm28.2 68.8c-3.1 4.5-9 7.2-16 7.2-11.4 0-19.4-7.5-19.4-18.2 0-11 8.2-18.5 19.8-18.5 6.5 0 12.1 2.4 15.2 6.6l-5.6 4.3c-2.1-2.9-5.7-4.4-9.8-4.4-7.7 0-13 4.8-13 12 0 7.3 5.2 11.9 12.8 11.9 4.3 0 8.1-1.7 10.3-4.7l5.7 3.8z"/>
    <path fill="#F29111" d="M84 48l-8 16 12 8z"/>
  </svg>
);

export const SupabaseLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="url(#supabase-grad-1)" d="M69.6 124.7c-2.4 3-7.2.8-6.6-3l11.4-65.7H20.6c-4.1 0-6.4-4.7-3.9-7.9L65.1 3.3c2.4-3 7.2-.8 6.6 3L60.3 72h53.8c4.1 0 6.4 4.7 3.9 7.9l-48.4 44.8z"/>
    <defs>
      <linearGradient id="supabase-grad-1" x1="16.7" y1="3.3" x2="114.1" y2="124.7" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3ECF8E"/>
        <stop offset="1" stopColor="#00F0FF"/>
      </linearGradient>
    </defs>
  </svg>
);

export const GitLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#F05032" d="M122.7 57.5L70.5 5.3c-3.6-3.6-9.4-3.6-13 0L37.1 25.7l16.4 16.4c3.8-1.3 8.3-.4 11.3 2.6 3.1 3.1 3.9 7.6 2.5 11.4l15.8 15.8c3.8-1.4 8.3-.5 11.4 2.5 4.3 4.3 4.3 11.3 0 15.6-4.3 4.3-11.3 4.3-15.6 0-3.3-3.3-4-8.2-2.1-12.2L62.2 62.3v24.2c1.2.6 2.3 1.5 3.1 2.4 4.3 4.3 4.3 11.3 0 15.6-4.3 4.3-11.3 4.3-15.6 0-4.3-4.3-4.3-11.3 0-15.6.9-.9 2-1.8 3.1-2.4V61.1c-1.2-.6-2.3-1.5-3.1-2.4-3.2-3.2-3.9-8.1-2.1-12.1L31.2 31.5 5.3 57.5c-3.6 3.6-3.6 9.4 0 13l52.2 52.2c3.6 3.6 9.4 3.6 13 0l52.2-52.2c3.6-3.6 3.6-9.4 0-13z"/>
  </svg>
);

export const FigmaLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#F24E1E" d="M43 128c11.6 0 21-9.4 21-21V86H43c-11.6 0-21 9.4-21 21s9.4 21 21 21z"/>
    <path fill="#FF7262" d="M22 64c0-11.6 9.4-21 21-21h21v42H43c-11.6 0-21-9.4-21-21z"/>
    <path fill="#F24E1E" d="M22 21C22 9.4 31.4 0 43 0h21v42H43c-11.6 0-21-9.4-21-21z"/>
    <path fill="#1ABCFE" d="M64 0h21c11.6 0 21 9.4 21 21s-9.4 21-21 21H64V0z"/>
    <path fill="#0ACF83" d="M106 64c0 11.6-9.4 21-21 21H64V43h21c11.6 0 21 9.4 21 21z"/>
  </svg>
);
