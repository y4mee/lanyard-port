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
      color: ['cyan', 'pink', 'purple', 'blue'][Math.floor(Math.random() * 4)],
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
        backgroundImage: `url('/bg.jpg')`,
        backgroundColor: '#0a0118',
      }}
    >
      {/* Anime-style gradient overlay with neon undertones */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/60 to-cyan-900/70 backdrop-blur-[2px] z-0" />
      
      {/* Magical ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-500/5 z-0" />

      {/* Animated magical light rays */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-400/20 to-transparent animate-pulse" 
             style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '6s' }} />
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400/10 to-transparent animate-pulse" 
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
                className="w-4 h-4 text-pink-300/70 animate-spin"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 105, 180, 0.6)) drop-shadow(0 0 15px rgba(255, 105, 180, 0.3))',
                  animation: `sakura-magical ${petal.duration}s infinite linear`,
                }}
              />
            ) : (
              <div
                className="w-5 h-5 opacity-80"
                style={{
                  borderRadius: '50% 80% 50% 80%',
                  background: 'linear-gradient(135deg, #ff69b4, #ff1493, #ffc0cb)',
                  animation: `sakura-magical ${petal.duration}s infinite linear`,
                  boxShadow: '0 0 15px rgba(255, 105, 180, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.3)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Neon geometric floating elements */}
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
              animation: `float-neon ${element.duration}s infinite ease-in-out`,
            }}
          >
            {element.type === 'hexagon' && (
              <div 
                className={`w-4 h-4 border-2 border-${element.color}-400/60 opacity-70`}
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  filter: `drop-shadow(0 0 8px rgba(${element.color === 'cyan' ? '34, 211, 238' : element.color === 'pink' ? '236, 72, 153' : element.color === 'purple' ? '168, 85, 247' : '59, 130, 246'}, 0.6))`,
                }}
              />
            )}
            {element.type === 'diamond' && (
              <div 
                className={`w-4 h-4 border-2 border-${element.color}-400/60 rotate-45 opacity-70`}
                style={{
                  filter: `drop-shadow(0 0 8px rgba(${element.color === 'cyan' ? '34, 211, 238' : element.color === 'pink' ? '236, 72, 153' : element.color === 'purple' ? '168, 85, 247' : '59, 130, 246'}, 0.6))`
                }}
              />
            )}
            {element.type === 'star' && (
              <Star 
                className={`w-4 h-4 text-${element.color}-400/70`}
                style={{
                  filter: `drop-shadow(0 0 10px rgba(${element.color === 'cyan' ? '34, 211, 238' : element.color === 'pink' ? '236, 72, 153' : element.color === 'purple' ? '168, 85, 247' : '59, 130, 246'}, 0.8))`
                }}
              />
            )}
            {element.type === 'triangle' && (
              <div 
                className={`w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-${element.color}-400/60 opacity-70`}
                style={{
                  filter: `drop-shadow(0 0 6px rgba(${element.color === 'cyan' ? '34, 211, 238' : element.color === 'pink' ? '236, 72, 153' : element.color === 'purple' ? '168, 85, 247' : '59, 130, 246'}, 0.5))`
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
            className="absolute rounded-full bg-gradient-to-r from-white/30 to-cyan-200/40"
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
          <Code className="w-6 h-6 text-purple-300/80 animate-pulse" 
                style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))' }} />
        </div>
        <div className="absolute top-24 right-24 opacity-40">
          <Music className="w-6 h-6 text-pink-300/80 animate-pulse" 
                 style={{ animationDelay: '2s', filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))' }} />
        </div>
        <div className="absolute bottom-40 left-20 opacity-40">
          <Star className="w-5 h-5 text-cyan-300/80 animate-pulse" 
                style={{ animationDelay: '4s', filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' }} />
        </div>
        <div className="absolute bottom-20 right-28 opacity-40">
          <Heart className="w-6 h-6 text-pink-300/80 animate-pulse" 
                 style={{ animationDelay: '6s', filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))' }} />
        </div>
        <div className="absolute top-1/3 left-8 opacity-30">
          <Zap className="w-5 h-5 text-yellow-300/70 animate-bounce" 
               style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.6))' }} />
        </div>
        <div className="absolute top-2/3 right-12 opacity-30">
          <Gamepad2 className="w-5 h-5 text-blue-300/70 animate-bounce" 
                    style={{ animationDelay: '3s', filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' }} />
        </div>
      </div>

      {/* Main Container with advanced glassmorphism */}
      <div className="w-full max-w-4xl min-h-screen relative z-10 mx-6 py-12">
        <div 
          className="backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.08] border border-white/20 shadow-2xl rounded-3xl text-white overflow-hidden relative" 
          style={{
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 
                       0 0 100px rgba(139, 69, 233, 0.1),
                       0 0 60px rgba(236, 72, 153, 0.1),
                       inset 0 1px 0 rgba(255, 255, 255, 0.1),
                       inset 0 -1px 0 rgba(255, 255, 255, 0.05)`,
          }}
        >
          
          {/* Animated neon border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 via-cyan-500/20 to-pink-500/20 opacity-60 animate-spin-slow pointer-events-none"
               style={{ animation: 'border-glow 8s ease-in-out infinite alternate' }}></div>
          
          {/* Inner glow effect */}
          <div className="absolute inset-2 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
          
          {/* Magical status indicators */}
          <div className="absolute top-6 right-6 flex gap-3 z-20">
            <div className="relative">
              <div className="w-3 h-3 bg-pink-400/80 rounded-full animate-pulse">
                <div className="absolute inset-0 bg-pink-400/60 rounded-full animate-ping"></div>
              </div>
              <div className="absolute -inset-1 bg-pink-400/20 rounded-full blur-sm"></div>
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-purple-400/70 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 bg-purple-400/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="absolute -inset-1 bg-purple-400/20 rounded-full blur-sm"></div>
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-cyan-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="absolute inset-0 bg-cyan-400/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="absolute -inset-1 bg-cyan-400/20 rounded-full blur-sm"></div>
            </div>
          </div>

          {/* Avatar Section with magical aura */}
          <div className="relative px-8 py-10">
            <div className="flex justify-center">
              <div className="relative">
                {/* Multiple magical aura rings */}
                <div className="absolute -inset-16 border border-pink-400/15 rounded-full animate-pulse" style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(236, 72, 153, 0.1), transparent)',
                  filter: 'blur(2px)',
                  animation: 'aura-rotate 15s linear infinite',
                }}></div>
                <div className="absolute -inset-12 border border-purple-400/20 rounded-full animate-pulse" style={{
                  animationDelay: '0.5s',
                  background: 'conic-gradient(from 180deg, transparent, rgba(168, 85, 247, 0.08), transparent)',
                  filter: 'blur(1px)',
                  animation: 'aura-rotate 12s linear infinite reverse',
                }}></div>
                <div className="absolute -inset-8 border border-cyan-400/25 rounded-full animate-pulse" style={{
                  animationDelay: '1s',
                  background: 'conic-gradient(from 90deg, transparent, rgba(34, 211, 238, 0.12), transparent)',
                  animation: 'aura-rotate 10s linear infinite',
                }}></div>
                <Avatar />
                
                {/* Floating sparkles around avatar */}
                <div className="absolute -top-4 -right-4">
                  <Sparkles className="w-5 h-5 text-pink-300/70 animate-pulse" 
                           style={{ filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))' }} />
                </div>
                <div className="absolute -bottom-4 -left-4">
                  <Star className="w-4 h-4 text-cyan-300/70 animate-pulse" 
                        style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section with enhanced glassmorphism */}
          <div className="relative px-8 pb-8">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400/60 to-transparent"></div>
                <div className="relative">
                  <Sparkles className="w-5 h-5 text-pink-400/80 animate-pulse" 
                           style={{ filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.8))' }} />
                  <div className="absolute -inset-2 bg-pink-400/10 rounded-full blur-sm animate-pulse"></div>
                </div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent via-purple-400/60 to-transparent"></div>
              </div>
              
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/[0.12] to-white/[0.06] border border-white/20 rounded-2xl p-8 mx-auto max-w-2xl relative overflow-hidden" style={{
                boxShadow: '0 0 40px rgba(139, 69, 233, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.05)',
              }}>
                {/* Inner magical glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-cyan-500/5 rounded-2xl"></div>
                
                <div className="space-y-6 text-center relative z-10">
                  <h3 className="text-white text-xl font-medium tracking-wide mb-4 relative" style={{ 
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(168, 85, 247, 0.2)' 
                  }}>
                    私について・About Me
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-pink-400/60 to-transparent"></div>
                  </h3>
                  <p className="text-base font-light leading-relaxed text-gray-100">
                    I'm a <span className="font-medium bg-gradient-to-r from-pink-500/30 to-pink-400/20 px-3 py-1 rounded-xl border border-pink-400/30 mx-1 backdrop-blur-sm" style={{
                      boxShadow: '0 0 15px rgba(236, 72, 153, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)',
                    }}>21-year-old</span> junior full-stack developer and CS student. Starting as a self-taught developer and have been coding since 2021, my expertise focuses mainly on web & app development.
                  </p>
                  <p className="text-base font-light leading-relaxed text-gray-100">
                    I love <span className="font-medium bg-gradient-to-r from-purple-500/30 to-purple-400/20 px-3 py-1 rounded-xl border border-purple-400/30 mx-1 backdrop-blur-sm" style={{
                      boxShadow: '0 0 15px rgba(147, 51, 234, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)',
                    }}>roguelike games</span> and music like
                    <span className="italic font-medium bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 px-3 py-1 rounded-xl border border-cyan-400/30 mx-1 backdrop-blur-sm" style={{
                      boxShadow: '0 0 15px rgba(6, 182, 212, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)',
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

          {/* Bottom magical decoration */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 via-pink-400/40 to-transparent"></div>
          
          {/* Corner magical elements */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-pink-400/30 opacity-60 rounded-tl-lg"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400/30 opacity-60 rounded-br-lg"></div>
          
          {/* Floating corner sparkles */}
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-pink-400/60 rounded-full animate-pulse" style={{
              filter: 'drop-shadow(0 0 4px rgba(236, 72, 153, 0.8))',
              animation: 'float-gentle 3s ease-in-out infinite',
            }}></div>
          </div>
          <div className="absolute bottom-2 left-2">
            <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" style={{
              animationDelay: '1.5s',
              filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.8))',
              animation: 'float-gentle 3s ease-in-out infinite',
            }}></div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes sakura-magical {
          0% {
            transform: translateY(-10vh) rotate(0deg) scale(var(--scale, 1));
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) scale(var(--scale, 1));
            opacity: 0.6;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) scale(var(--scale, 1));
            opacity: 0;
          }
        }
        
        @keyframes float-neon {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(var(--scale, 1)); 
            opacity: 0.4;
          }
          25% { 
            opacity: 0.8;
            transform: translateY(-40px) rotate(90deg) scale(var(--scale, 1));
          }
          50% { 
            transform: translateY(-80px) rotate(180deg) scale(var(--scale, 1)); 
            opacity: 0.6;
          }
          75% { 
            opacity: 0.9;
            transform: translateY(-40px) rotate(270deg) scale(var(--scale, 1));
          }
        }
        
        @keyframes particle-float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: var(--opacity, 0.5);
          }
          33% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: calc(var(--opacity, 0.5) * 1.5);
          }
          66% { 
            transform: translateY(-10px) translateX(-10px); 
            opacity: var(--opacity, 0.5);
          }
        }
        
        @keyframes aura-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes border-glow {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.8; 
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