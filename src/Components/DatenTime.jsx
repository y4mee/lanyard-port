import React, { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";

const DatenTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = now.toLocaleTimeString(undefined, { hour12: true });
  const date = now.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-sm flex gap-5">
      {/* Date */}
      <div className="flex items-center bg-cyan-600/20 border border-cyan-400/30 rounded-2xl p-3 hover:bg-cyan-600/30 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500/30 rounded-xl flex items-center justify-center border border-cyan-400/20">
            <CalendarDays className="w-4 h-4 text-cyan-200" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{date}</p>
            <p className="text-cyan-200 text-xs">今日の日付・Date</p>
          </div>
        </div>
      </div>

      {/* Time */}
      <div className="flex items-center bg-yellow-400/20 border border-yellow-400/30 rounded-2xl p-3 hover:bg-yellow-400/30 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-400/30 rounded-xl flex items-center justify-center border border-yellow-400/20">
            <Clock className="w-4 h-4 text-yellow-200" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{time}</p>
            <p className="text-yellow-200 text-xs">現在時刻・Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatenTime;
