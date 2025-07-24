import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import LocalTime from "./DatenTime";
import Playlist from "./Playlist";
import { Play, Leaf, Cloud, Sun, Star, Music, Gamepad2, Clock, Heart, Sparkles, Code, Zap } from "lucide-react";
import Skills from "./Skills";
import Footer from "./Footer";
import GitHubStats from "./GitHubStats";

const Container = () => {
  const [petals, setPetals] = useState([]);
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [floatingElements, setFloatingElements] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate magical floating sakura petals
    const petalArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 25 + Math.random() * 20,
      size: 0.4 + Math.random() * 1.8,
      type: Math.random() > 0.6 ? 'sparkle' : 'petal',
      rotation: Math.random() * 360,
    }));
    setPetals(petalArray);

    // Generate neon geometric floating elements
    const elementArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 30,
      duration: 40 + Math.random() * 25,
      size: 0.3 + Math.random() * 0.8,
      type: ['hexagon', 'diamond', 'star', 'triangle'][Math.floor(Math.random() * 4)],
      color: ['white', 'gray'][Math.floor(Math.random() * 2)],
    }));
    setFloatingElements(elementArray);

    // Generate magical light particles
    const particleArray = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 25,
      size: 0.2 + Math.random() * 0.6,
      opacity: 0.3 + Math.random() * 0.7,
    }));
    setParticles(particleArray);

    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      setTimeOfDay('day');
    } else if (hour >= 18 && hour < 22) {
      setTimeOfDay('sunset');
    } else {
      setTimeOfDay('night');
    }
  }, []);

  return (
    <div
      className="min-h-screen relative w-full flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><defs><linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%23f0f0f0;stop-opacity:1" /><stop offset="100%" style="stop-color:%23d0d0d0;stop-opacity:1" /></linearGradient></defs><rect width="1920" height="1080" fill="url(%23skyGrad)"/><g opacity="0.3"><path d="M0,600 Q200,500 400,600 T800,600 T1200,600 T1600,600 T1920,600 L1920,1080 L0,1080 Z" fill="%23b0b0b0"/><path d="M0,700 Q300,600 600,700 T1200,700 T1920,700 L1920,1080 L0,1080 Z" fill="%23a0a0a0"/><path d="M0,800 Q400,700 800,800 T1920,800 L1920,1080 L0,1080 Z" fill="%23909090"/></g><g opacity="0.2"><circle cx="1600" cy="200" r="80" fill="%23ffffff" opacity="0.8"/><g transform="translate(200,150)"><path d="M0,0 Q10,20 20,0 Q30,20 40,0" stroke="%23c0c0c0" stroke-width="3" fill="none" opacity="0.6"/><circle cx="5" cy="15" r="2" fill="%23e0e0e0"/><circle cx="15" cy="15" r="2" fill="%23e0e0e0"/><circle cx="25" cy="15" r="2" fill="%23e0e0e0"/><circle cx="35" cy="15" r="2" fill="%23e0e0e0"/></g><g transform="translate(400,100)"><path d="M0,0 Q15,30 30,0 Q45,30 60,0" stroke="%23c0c0c0" stroke-width="4" fill="none" opacity="0.7"/><circle cx="7" cy="20" r="3" fill="%23e0e0e0"/><circle cx="22" cy="20" r="3" fill="%23e0e0e0"/><circle cx="37" cy="20" r="3" fill="%23e0e0e0"/><circle cx="52" cy="20" r="3" fill="%23e0e0e0"/></g><g transform="translate(800,80)"><path d="M0,0 Q20,40 40,0 Q60,40 80,0" stroke="%23c0c0c0" stroke-width="5" fill="none" opacity="0.8"/><circle cx="10" cy="25" r="4" fill="%23e0e0e0"/><circle cx="30" cy="25" r="4" fill="%23e0e0e0"/><circle cx="50" cy="25" r="4" fill="%23e0e0e0"/><circle cx="70" cy="25" r="4" fill="%23e0e0e0"/></g></g><g opacity="0.15"><rect x="1400" y="300" width="200" height="400" fill="%23a0a0a0"/><rect x="1420" y="320" width="160" height="360" fill="%23b0b0b0"/><rect x="1440" y="340" width="120" height="320" fill="%23c0c0c0"/><rect x="1450" y="350" width="20" height="30" fill="%23808080"/><rect x="1480" y="350" width="20" height="30" fill="%23808080"/><rect x="1510" y="350" width="20" height="30" fill="%23808080"/><rect x="1540" y="350" width="20" height="30" fill="%23808080"/></g></svg>')`,
        backgroundColor: '#000000',
      }}
    >
      {/* Anime-style gradient overlay with monochrome undertones */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/80 to-black/90 backdrop-blur-[2px] z-0" />
      
      {/* Magical ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-transparent to-white/3 z-0" />

      {/* Animated magical light rays */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent animate-pulse" 
             style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-gray-300/10 to-transparent animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '6s' }} />
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-white/8 to-transparent animate-pulse" 
             style={{ animationDelay: '4s', animationDuration: '5s' }} />
      </div>

      {/* Magical floating sakura petals */}
      <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute"
            style={{
              left: `${petal.x}%`,
              top: `${petal.y}%`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              transform: `scale(${petal.size}) rotate(${petal.rotation}deg)`,
            }}
          >
            {petal.type === 'sparkle' ? (
              <Sparkles
                className="w-4 h-4 text-white/50 animate-pulse"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))',
                  animation: `sakura-drift ${petal.duration}s infinite linear`,
                }}
              />
            ) : (
              <div
                className="w-5 h-5 opacity-60"
                style={{
                  borderRadius: '50% 80% 50% 80%',
                  background: 'linear-gradient(135deg, #ffffff, #e5e5e5, #f5f5f5)',
                  animation: `sakura-drift ${petal.duration}s infinite linear`,
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.3), inset 0 0 5px rgba(255, 255, 255, 0.2)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Anime-style geometric floating elements */}
      <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
              transform: `scale(${element.size})`,
              animation: `float-anime ${element.duration}s infinite ease-in-out`,
            }}
          >
            {element.type === 'hexagon' && (
              <div 
                className={`w-4 h-4 border-2 ${element.color === 'white' ? 'border-white/60' : 'border-gray-400/60'} opacity-70`}
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  filter: `drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))`,
                }}
              />
            )}
            {element.type === 'diamond' && (
              <div 
                className={`w-4 h-4 border-2 ${element.color === 'white' ? 'border-white/60' : 'border-gray-400/60'} rotate-45 opacity-70`}
                style={{
                  filter: `drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))`
                }}
              />
            )}
            {element.type === 'star' && (
              <Star 
                className={`w-4 h-4 ${element.color === 'white' ? 'text-white/70' : 'text-gray-400/70'}`}
                style={{
                  filter: `drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))`
                }}
              />
            )}
            {element.type === 'triangle' && (
              <div 
                className={`w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent ${element.color === 'white' ? 'border-b-white/60' : 'border-b-gray-400/60'} opacity-70`}
                style={{
                  filter: `drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))`
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Magical light particles */}
      <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-white/30 to-gray-200/40"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size * 4}px`,
              height: `${particle.size * 4}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              opacity: particle.opacity,
              animation: `particle-float ${particle.duration}s infinite ease-in-out`,
              filter: 'blur(1px)',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            }}
          />
        ))}
      </div>

      {/* Anime-style ambient decorative icons */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-16 left-16 opacity-40">
          <Code className="w-6 h-6 text-white/80 animate-pulse" 
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))' }} />
        </div>
        <div className="absolute top-24 right-24 opacity-40">
          <Music className="w-6 h-6 text-white/80 animate-pulse" 
                 style={{ animationDelay: '2s', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))' }} />
        </div>
        <div className="absolute bottom-40 left-20 opacity-40">
          <Star className="w-5 h-5 text-gray-300/80 animate-pulse" 
                style={{ animationDelay: '4s', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))' }} />
        </div>
        <div className="absolute bottom-20 right-28 opacity-40">
          <Heart className="w-6 h-6 text-white/80 animate-pulse" 
                 style={{ animationDelay: '6s', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))' }} />
        </div>
        <div className="absolute top-1/3 left-8 opacity-30">
          <Zap className="w-5 h-5 text-gray-200/70 animate-bounce" 
               style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))' }} />
        </div>
        <div className="absolute top-2/3 right-12 opacity-30">
          <Gamepad2 className="w-5 h-5 text-white/70 animate-bounce" 
                    style={{ animationDelay: '3s', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))' }} />
        </div>
      </div>

      {/* Main Container with advanced anime-style glassmorphism */}
      <div className="w-full max-w-4xl min-h-screen relative z-10 mx-6 py-12">
        <div 
          className="backdrop-blur-2xl bg-gradient-to-br from-white/[0.12] via-gray-100/[0.06] to-white/[0.12] border border-white/30 shadow-2xl rounded-3xl text-white overflow-hidden relative" 
          style={{
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.8), 
                       0 0 100px rgba(255, 255, 255, 0.1),
                       0 0 60px rgba(255, 255, 255, 0.05),
                       inset 0 1px 0 rgba(255, 255, 255, 0.2),
                       inset 0 -1px 0 rgba(255, 255, 255, 0.1)`,
          }}
        >
          
          {/* Animated anime-style border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 via-gray-300/20 via-white/20 to-gray-300/20 opacity-60 animate-spin-slow pointer-events-none"
               style={{ animation: 'border-glow-anime 8s ease-in-out infinite alternate' }}></div>
          
          {/* Inner anime glow effect */}
          <div className="absolute inset-2 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-gray-200/5 pointer-events-none"></div>
          
          {/* Magical status indicators - anime style */}
          <div className="absolute top-6 right-6 flex gap-3 z-20">
            <div className="relative">
              <div className="w-3 h-3 bg-white/80 rounded-full animate-pulse">
                <div className="absolute inset-0 bg-white/60 rounded-full animate-ping"></div>
              </div>
              <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm"></div>
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-gray-300/70 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 bg-gray-300/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="absolute -inset-1 bg-gray-300/20 rounded-full blur-sm"></div>
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="absolute inset-0 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm"></div>
            </div>
          </div>

          {/* Avatar Section with magical anime aura */}
          <div className="relative px-8 py-10">
            <div className="flex justify-center">
              <div className="relative">
                {/* Multiple magical aura rings - anime style */}
                <div className="absolute -inset-16 border border-white/15 rounded-full animate-pulse" style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                  filter: 'blur(2px)',
                  animation: 'aura-rotate 15s linear infinite',
                }}></div>
                <div className="absolute -inset-12 border border-gray-300/20 rounded-full animate-pulse" style={{
                  animationDelay: '0.5s',
                  background: 'conic-gradient(from 180deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
                  filter: 'blur(1px)',
                  animation: 'aura-rotate 12s linear infinite reverse',
                }}></div>
                <div className="absolute -inset-8 border border-white/25 rounded-full animate-pulse" style={{
                  animationDelay: '1s',
                  background: 'conic-gradient(from 90deg, transparent, rgba(255, 255, 255, 0.12), transparent)',
                  animation: 'aura-rotate 10s linear infinite',
                }}></div>
                <Avatar />
                
                {/* Floating anime sparkles around avatar */}
                <div className="absolute -top-4 -right-4">
                  <Sparkles className="w-5 h-5 text-white/70 animate-pulse" 
                           style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' }} />
                </div>
                <div className="absolute -bottom-4 -left-4">
                  <Star className="w-4 h-4 text-gray-300/70 animate-pulse" 
                        style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section with enhanced anime glassmorphism */}
          <div className="relative px-8 pb-8">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                <div className="relative">
                  <Sparkles className="w-5 h-5 text-white/80 animate-pulse" 
                           style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }} />
                  <div className="absolute -inset-2 bg-white/10 rounded-full blur-sm animate-pulse"></div>
                </div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent via-gray-300/60 to-transparent"></div>
              </div>
              
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/[0.15] to-gray-100/[0.08] border border-white/30 rounded-2xl p-8 mx-auto max-w-2xl relative overflow-hidden" style={{
                boxShadow: '0 0 40px rgba(255, 255, 255, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.05)',
              }}>
                {/* Inner magical glow - anime style */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-gray-200/5 to-white/5 rounded-2xl"></div>
                
                <div className="space-y-6 text-center relative z-10">
                  <h3 className="text-white text-xl font-medium tracking-wide mb-4 relative" style={{ 
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)' 
                  }}>
                    私について・About Me
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                  </h3>
                  <p className="text-base font-light leading-relaxed text-gray-100">
                    I'm a <span className="font-medium bg-gradient-to-r from-white/30 to-gray-200/20 px-3 py-1 rounded-xl border border-white/30 mx-1 backdrop-blur-sm" style={{
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)',
                    }}>21-year-old</span> junior full-stack developer and CS student. Starting as a self-taught developer and have been coding since 2021, my expertise focuses mainly on web & app development.
                  </p>
                  <p className="text-base font-light leading-relaxed text-gray-100">
                    I love <span className="font-medium bg-gradient-to-r from-gray-300/30 to-white/20 px-3 py-1 rounded-xl border border-gray-300/30 mx-1 backdrop-blur-sm" style={{
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)',
                    }}>roguelike games</span> and music like
                    <span className="italic font-medium bg-gradient-to-r from-white/30 to-gray-200/20 px-3 py-1 rounded-xl border border-white/30 mx-1 backdrop-blur-sm" style={{
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)',
                    }}>Cubibibibism</span>
                    and enjoy playing rougelite and hack-n-slash games and listening to whatever doesn't make my ears bleed. You can see the songs I'm listening to or the games I'm playing on the top of the page.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="relative px-8 py-6">
            <Skills />
          </div>

          {/* Playlist Section */}
          <div className="relative px-8 py-6">
            <Playlist />
          </div>

          {/* Footer Section */}
          <div className="relative px-8 py-6">
            <Footer />
          </div>

          {/* Bottom magical decoration - anime style */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 via-gray-300/40 to-transparent"></div>
          
          {/* Corner magical elements - anime style */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/30 opacity-60 rounded-tl-lg"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-gray-300/30 opacity-60 rounded-br-lg"></div>
          
          {/* Floating corner sparkles - anime style */}
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{
              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))',
              animation: 'float-gentle 3s ease-in-out infinite',
            }}></div>
          </div>
          <div className="absolute bottom-2 left-2">
            <div className="w-2 h-2 bg-gray-300/60 rounded-full animate-pulse" style={{
              animationDelay: '1.5s',
              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))',
              animation: 'float-gentle 3s ease-in-out infinite',
            }}></div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS animations - anime style */}
      <style jsx>{`
        @keyframes sakura-magical {
          0% {
            transform: translateY(-10vh) rotate(0deg) scale(var(--scale, 1));
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) scale(var(--scale, 1));
            opacity: 0.7;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) scale(var(--scale, 1));
            opacity: 0;
          }
        }
        
        @keyframes float-anime {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(var(--scale, 1)); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-30px) rotate(0deg) scale(calc(var(--scale, 1) * 1.1)); 
            opacity: 0.8;
          }
        }
        
        @keyframes particle-float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: var(--opacity, 0.3);
          }
          50% { 
            transform: translateY(-15px) translateX(5px) scale(1.2); 
            opacity: calc(var(--opacity, 0.3) * 2);
          }
        }
        
        @keyframes sakura-drift {
          0% {
            transform: translateY(-10vh) translateX(0px) rotate(0deg) scale(var(--scale, 1));
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) translateX(50px) rotate(180deg) scale(var(--scale, 1));
            opacity: 0;
          }
        }
        
        @keyframes aura-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes border-glow-anime {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.9; 
            transform: scale(1.02);
          }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Container;