import React from 'react';
import { Music, Play, Headphones } from 'lucide-react';

const Playlist = () => {
  return (
    <div className="flex flex-col items-center px-6 pt-8 pb-8 space-y-8">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-white text-2xl font-bold tracking-wide" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>
          My Playlists
        </h2>
        <p className="text-white/60 text-sm mt-2 tracking-widest">音楽コレクション・Music Collection</p>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-8 items-center justify-center">
        {/* First Playlist */}
        <div className="w-full group/playlist relative">
          {/* Floating anime-style glow effect */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-white/10 via-gray-300/10 to-white/10 blur-xl opacity-0 group-hover/playlist:opacity-100 transition-opacity duration-700"></div>

          <div className="relative backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl p-6 shadow-2xl transition-all duration-500 group-hover/playlist:scale-[1.02] group-hover/playlist:border-white/60 group-hover/playlist:bg-white/20">
            
            {/* Playlist Header */}
            <div className="flex items-center gap-3 mb-4 group/header">
              <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-white/30 shadow-lg flex items-center justify-center transition-all duration-300 group-hover/header:scale-110">
                <Music className="w-5 h-5 text-black animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg tracking-wide" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.4)' }}>
                  Playlist 01
                </h3>
                <p className="text-white/70 text-sm">メインプレイリスト・Main Collection</p>
              </div>
              <div className="opacity-0 group-hover/playlist:opacity-100 transition-all duration-300">
                <div className="w-8 h-8 bg-gray-300/80 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-black ml-0.5" />
                </div>
              </div>
            </div>

            {/* Spotify Embed */}
            <div className="relative overflow-hidden rounded-xl">
              {/* Anime-style shine effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/playlist:translate-x-full transition-transform duration-1000 z-10"></div>
              
              <iframe
                style={{ 
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  filter: 'grayscale(0.3) contrast(1.1)'
                }}
                src="https://open.spotify.com/embed/playlist/3Q1yOfOOFGysfaaM13OmYR?utm_source=generator&theme=0"
                width="100%"
                height="400"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="shadow-xl transition-all duration-500 group-hover/playlist:shadow-white/20"
              />
            </div>

            {/* Decorative anime elements */}
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-white/40 rounded-full opacity-0 group-hover/playlist:opacity-100 transition-all duration-300">
              <div className="absolute inset-1 bg-white/60 rounded-full animate-ping"></div>
            </div>
            
            {/* Additional anime decorative corner */}
            <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-white/30 opacity-50 group-hover/playlist:opacity-80 transition-all duration-300"></div>
          </div>
        </div>

        {/* Second Playlist */}
        <div className="w-full group/playlist relative">
          {/* Floating anime-style glow effect */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-gray-300/10 via-white/10 to-gray-300/10 blur-xl opacity-0 group-hover/playlist:opacity-100 transition-opacity duration-700"></div>

          <div className="relative backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl p-6 shadow-2xl transition-all duration-500 group-hover/playlist:scale-[1.02] group-hover/playlist:border-gray-300/60 group-hover/playlist:bg-white/20">
            
            {/* Playlist Header */}
            <div className="flex items-center gap-3 mb-4 group/header">
              <div className="w-10 h-10 bg-gray-300/80 backdrop-blur-sm rounded-xl border-2 border-white/30 shadow-lg flex items-center justify-center transition-all duration-300 group-hover/header:scale-110">
                <Headphones className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg tracking-wide" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.4)' }}>
                  Playlist 02
                </h3>
                <p className="text-gray-200/70 text-sm">サウンドトラック・Soundtrack</p>
              </div>
              <div className="opacity-0 group-hover/playlist:opacity-100 transition-all duration-300">
                <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-black ml-0.5" />
                </div>
              </div>
            </div>

            {/* Spotify Embed */}
            <div className="relative overflow-hidden rounded-xl">
              {/* Anime-style shine effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/playlist:translate-x-full transition-transform duration-1000 z-10"></div>
              
              <iframe
                style={{ 
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  filter: 'grayscale(0.3) contrast(1.1)'
                }}
                src="https://open.spotify.com/embed/playlist/3awZfV65V1nMVs5zzE0wCh?utm_source=generator"
                width="100%"
                height="400"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="shadow-xl transition-all duration-500 group-hover/playlist:shadow-gray-300/20"
              />
            </div>

            {/* Decorative anime elements */}
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-gray-300/40 rounded-full opacity-0 group-hover/playlist:opacity-100 transition-all duration-300">
              <div className="absolute inset-1 bg-gray-300/60 rounded-full animate-ping"></div>
            </div>
            
            {/* Additional anime decorative corner */}
            <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-gray-300/30 opacity-50 group-hover/playlist:opacity-80 transition-all duration-300"></div>
          </div>
        </div>

        {/* Anime-style floating decorative elements */}
        <div className="absolute top-16 right-8 opacity-20">
          <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse" style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))',
            animation: 'float-gentle 4s ease-in-out infinite',
          }}></div>
        </div>
        
        <div className="absolute bottom-16 left-8 opacity-15">
          <div className="w-2 h-2 bg-gray-300/60 rounded-full animate-pulse" style={{
            animationDelay: '2s',
            filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))',
            animation: 'float-gentle 3s ease-in-out infinite',
          }}></div>
        </div>
      </div>

      {/* Enhanced CSS animations for anime aesthetic */}
      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default Playlist;