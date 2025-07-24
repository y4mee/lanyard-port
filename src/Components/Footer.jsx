import React, { useState } from 'react';
import { MessageSquareText } from 'lucide-react';

const contactLinks = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    href: 'mailto:jatinguptapvt@gmail.com',
    color: 'hover:text-red-400',
    name: 'Email'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    href: 'https://github.com/y4mee',
    color: 'hover:text-gray-300',
    name: 'GitHub'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: 'https://www.linkedin.com/in/jatin-gupta-34b5b7226/',
    color: 'hover:text-blue-400',
    name: 'LinkedIn'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
      </svg>
    ),
    href: 'https://discord.gg/svm7yjkeBp',
    color: 'hover:text-indigo-400',
    name: 'Discord'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.271-.04.407-.05-.302 2.26-1.408 6.062-1.708 7.156-.265 1.088.335 1.698.729 1.899.394.2.831.16 1.232-.03.401-.193 3.508-2.527 4.333-3.27zm7.098-7.235c-2.752 1.942-5.711 5.881-6.798 7.995l4.333 3.27c.825.743 3.93 3.077 4.333 3.27.401.19.838.23 1.232.03.394-.201.994-.811.729-1.899-.3-1.094-1.406-4.896-1.708-7.156.136.01.271.03.407.05 2.67.296 5.568-.628 6.383-3.364.246-.829.624-5.79.624-6.479 0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.301 1.24l-.332.246z"/>
      </svg>
    ),
    href: 'https://bsky.app/profile/y4meteeee.bsky.social',
    color: 'hover:text-cyan-400',
    name: 'Bluesky'
  }
];

const Petal = ({ delay = 0 }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      animation: `fall 3s ease-in-out ${delay}s infinite`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`
    }}
  >
    <div className="w-2 h-2 bg-gradient-to-br from-white/30 to-white/10 rounded-full blur-[0.5px]" />
  </div>
);

const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      
      <footer className="flex flex-col items-center px-8 py-16 space-y-12 relative overflow-hidden">
        {/* Petals Animation Container */}
        {hoveredIndex !== null && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <Petal key={i} delay={i * 0.2} />
            ))}
          </div>
        )}

        {/* Minimal Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-white text-2xl font-light tracking-wider">
            Connect me vai:
          </h2>
          <div className="w-8 h-px bg-white/30 mx-auto"></div>
        </div>

        {/* Icon Grid */}
        <div className="flex items-center justify-center gap-8">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-center w-12 h-12 text-white/70 transition-all duration-500 hover:scale-125 ${link.color}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon */}
              <div className="relative z-10 transition-all duration-300 group-hover:drop-shadow-lg">
                {link.icon}
              </div>
              
              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 text-white/50 text-xs tracking-wide">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
          <span>Available</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;