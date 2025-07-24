import React from 'react';
import { Music, Play, Headphones } from 'lucide-react';

const Playlist = () => {
  return (
    <div className="flex flex-col items-center px-6 pt-8 pb-8 space-y-8">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-white text-2xl font-bold tracking-wide" style={{ textShadow: '0 0 20px rgba(255, 192, 203, 0.5)' }}>
          My Playlists
        </h2>
        <p className="text-white/60 text-sm mt-2 tracking-widest">音楽コレクション・Music Collection</p>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-8 items-center justify-center">
        {/* First Playlist */}
        <div className="w-full group/playlist relative">
          {/* Floating glow effect */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover/playlist:opacity-100 transition-opacity duration-700"></div>

          <div className="relative backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl p-6 shadow-2xl transition-all duration-500 group-hover/playlist:scale-[1.02] group-hover/playlist:border-pink-400/60 group-hover/playlist:bg-white/20">
            
            {/* Playlist Header */}
            <div className="flex items-center gap-3 mb-4 group/header">
              <div className="w-10 h-10 bg-pink-500/80 backdrop-blur-sm rounded-xl border-2 border-white/30 shadow-lg flex items-center justify-center transition-all duration-300 group-hover/header:scale-110">
                <Music className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg tracking-wide" style={{ textShadow: '0 0 15px rgba(255, 192, 203, 0.4)' }}>
                  Playlist 01
                </h3>
                <p className="text-pink-200 text-sm">メインプレイリスト・Main Collection</p>
              </div>
              <div className="opacity-0 group-hover/playlist:opacity-100 transition-all duration-300">
                <div className="w-8 h-8 bg-cyan-500/80 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Spotify Embed */}
            <div className="relative overflow-hidden rounded-xl">
              {/* Shine effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/playlist:translate-x-full transition-transform duration-1000 z-10"></div>
              
              <iframe
                style={{ 
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                src="https://open.spotify.com/embed/playlist/3Q1yOfOOFGysfaaM13OmYR?utm_source=generator&theme=0"
                width="100%"
                height="400"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="shadow-xl transition-all duration-500 group-hover/playlist:shadow-pink-400/20"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-pink-400/40 rounded-full opacity-0 group-hover/playlist:opacity-100 transition-all duration-300">
              <div className="absolute inset-1 bg-pink-400/60 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Second Playlist */}
        <div className="w-full group/playlist relative">
          {/* Floating glow effect */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover/playlist:opacity-100 transition-opacity duration-700"></div>

          <div className="relative backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl p-6 shadow-2xl transition-all duration-500 group-hover/playlist:scale-[1.02] group-hover/playlist:border-cyan-400/60 group-hover/playlist:bg-white/20">
            
            {/* Playlist Header */}
            <div className="flex items-center gap-3 mb-4 group/header">
              <div className="w-10 h-10 bg-cyan-500/80 backdrop-blur-sm rounded-xl border-2 border-white/30 shadow-lg flex items-center justify-center transition-all duration-300 group-hover/header:scale-110">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg tracking-wide" style={{ textShadow: '0 0 15px rgba(0, 255, 255, 0.4)' }}>
                  Playlist 02
                </h3>
                <p className="text-cyan-200 text-sm">サウンドトラック・Soundtrack</p>
              </div>
              <div className="opacity-0 group-hover/playlist:opacity-100 transition-all duration-300">
                <div className="w-8 h-8 bg-pink-500/80 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Spotify Embed */}
            <div className="relative overflow-hidden rounded-xl">
              {/* Shine effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/playlist:translate-x-full transition-transform duration-1000 z-10"></div>
              
              <iframe
                style={{ 
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                src="https://open.spotify.com/embed/playlist/3awZfV65V1nMVs5zzE0wCh?utm_source=generator"
                width="100%"
                height="400"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="shadow-xl transition-all duration-500 group-hover/playlist:shadow-cyan-400/20"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-cyan-400/40 rounded-full opacity-0 group-hover/playlist:opacity-100 transition-all duration-300">
              <div className="absolute inset-1 bg-cyan-400/60 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;