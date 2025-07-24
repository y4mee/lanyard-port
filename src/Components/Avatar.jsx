import React, { useEffect, useState } from "react";
import { Music, Gamepad2, Clock } from "lucide-react";
import DatenTime from "./DatenTime";

// Enhanced Lanyard API handler with proper decoration support
const fetchLanyardData = async (userId = "1102123627438153738") => {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data = await response.json();

    if (data.success) {
      const user = data.data;

      // Enhanced avatar URL construction
      const getAvatarUrl = (avatar, userId, size = 256) => {
        if (!avatar) {
          return `https://cdn.discordapp.com/embed/avatars/${(parseInt(user.discord_user.discriminator) || 0) % 5}.png`;
        }
        const format = avatar.startsWith('a_') ? 'gif' : 'webp';
        return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${format}?size=${size}`;
      };

      // Enhanced decoration URL handling with animation support
      const getDecorationUrls = () => {
        const decoration = user.discord_user?.avatar_decoration_data;
        if (!decoration?.asset) return null;

        const baseUrl = 'https://cdn.discordapp.com/avatar-decoration-presets';
        const isAnimated = decoration.asset.startsWith('a_');

        return {
          primary: `${baseUrl}/${decoration.asset}.${isAnimated ? 'gif' : 'webp'}`,
          fallback: `${baseUrl}/${decoration.asset}.png`,
          isAnimated: isAnimated
        };
      };

      return {
        user: {
          id: user.discord_user.id,
          username: user.discord_user.username,
          display_name: user.discord_user.display_name || user.discord_user.global_name || user.discord_user.username,
          avatar_url: getAvatarUrl(user.discord_user.avatar, user.discord_user.id),
          decoration: getDecorationUrls()
        },
        status: user.discord_status,
        activities: user.activities || [],
        spotify: user.spotify,
        listening_to_spotify: user.listening_to_spotify
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch Lanyard data:", error);
    return null;
  }
};

// Status indicator component
const StatusIndicator = ({ status }) => {
  const statusConfig = {
    online: { color: 'bg-emerald-400', ring: 'ring-emerald-400/40', shadow: 'shadow-emerald-400/30' },
    idle: { color: 'bg-amber-400', ring: 'ring-amber-400/40', shadow: 'shadow-amber-400/30' },
    dnd: { color: 'bg-rose-400', ring: 'ring-rose-400/40', shadow: 'shadow-rose-400/30' },
    offline: { color: 'bg-slate-500', ring: 'ring-slate-500/30', shadow: 'shadow-slate-500/20' }
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <div className={`absolute -bottom-2 -right-2 w-7 h-7 ${config.color} rounded-full border-3 border-black/50 ring-3 ${config.ring} ${config.shadow} shadow-lg`}>
      <div className={`absolute inset-0 ${config.color} rounded-full animate-ping opacity-40`}></div>
    </div>
  );
};

const Avatar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [decorationLoaded, setDecorationLoaded] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchLanyardData();
      setData(result);
      setLoading(false);
    };

    loadData();
    const interval = setInterval(() => {
      loadData();
      setTime(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center my-8">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/20 border-t-pink-400 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-2 border-white/10 border-b-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center my-8">
        <div className="text-white/60 text-center">
          <p className="text-sm mb-1">接続に失敗しました</p>
          <p className="text-xs opacity-60">Connection failed</p>
        </div>
      </div>
    );
  }

  const currentActivity = data.activities?.[0];
  const isListening = data.listening_to_spotify && data.spotify;

  return (
<div className="flex flex-col items-center px-6 pt-10 pb-8 space-y-6">
      {/* Avatar with status and decorations */}
      <div className="relative group/avatar mb-4">
        <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-700"></div>

        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-3 border-white/30 shadow-2xl transition-all duration-500 group-hover/avatar:scale-110 group-hover/avatar:border-pink-400/60">
            <img
              src={data.user.avatar_url}
              alt="Discord Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://cdn.discordapp.com/embed/avatars/0.png";
              }}
            />
            <div className="absolute top-4 left-4 w-5 h-5 bg-white/60 rounded-full blur-sm"></div>
            <div className="absolute top-2 left-2 w-3 h-3 bg-white/80 rounded-full"></div>
          </div>

          {data.user.decoration && (
            <div className="absolute -inset-4 flex items-center justify-center pointer-events-none">
              <img
                src={data.user.decoration.primary}
                alt="Avatar Decoration"
                className={`w-40 h-40 object-contain transition-all duration-700 ${
                  decorationLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } group-hover/avatar:scale-110`}
                style={{
                  imageRendering: data.user.decoration.isAnimated ? 'auto' : 'crisp-edges'
                }}
                onLoad={() => setDecorationLoaded(true)}
                onError={(e) => {
                  if (e.target.src === data.user.decoration.primary) {
                    e.target.src = data.user.decoration.fallback;
                  } else {
                    e.target.style.display = 'none';
                  }
                }}
              />
            </div>
          )}

          <StatusIndicator status={data.status} />

          {currentActivity && (
            <div className="absolute -top-3 -left-3 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 scale-75 group-hover/avatar:scale-100">
              <div className="w-9 h-9 bg-indigo-500/80 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
            </div>
          )}

          {isListening && (
            <div className="absolute -top-3 -right-3 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 scale-75 group-hover/avatar:scale-100">
              <div className="w-9 h-9 bg-green-500/80 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom message */}
      <h2 className="text-white text-2xl font-bold mt-6 tracking-wide text-center" style={{ textShadow: '0 0 20px rgba(255, 192, 203, 0.5)' }}>
        Hi, I'm Jatin!
      </h2>

      {/* Date and time component */}
      <h4 className="text-white  font-bold mt-4 tracking-wide text-center" style={{ textShadow: '0 0 20px rgba(255, 192, 203, 0.5)' }}>
        Local Time:
      </h4>
      <div className="">
        <DatenTime />
      </div>

      {/* Activities */}
      <div className="space-y-3 w-full max-w-sm">
        {currentActivity && (
          <div className="backdrop-blur-sm bg-indigo-500/20 border border-indigo-400/30 rounded-2xl p-3 hover:bg-indigo-500/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-indigo-400/20">
                <Gamepad2 className="w-4 h-4 text-indigo-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{currentActivity.name}</p>
                <p className="text-indigo-200 text-xs">遊んでいる・Playing</p>
              </div>
            </div>
          </div>
        )}

        {isListening && (
          <div className="backdrop-blur-sm bg-green-500/20 border border-green-400/30 rounded-2xl p-3 hover:bg-green-500/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/20">
                <Music className="w-4 h-4 text-green-300 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{data.spotify.song}</p>
                <p className="text-green-200 text-xs truncate">by {data.spotify.artist}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
