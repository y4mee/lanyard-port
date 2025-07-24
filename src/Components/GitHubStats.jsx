import React, { useState, useEffect } from 'react';
import {
  History, Star, GitPullRequest, AlertCircle, MessageSquare, Share2, Terminal, Code2, RefreshCw
} from 'lucide-react';

const GitHubStats = () => {
  const [stats, setStats] = useState({
    totalCommits: 0,
    totalStars: 0,
    totalPRs: 0,
    totalIssues: 0,
    totalReviews: 0,
    publicRepos: 0,
    followers: 0,
    following: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activeStats, setActiveStats] = useState([]);
  const [isScanning, setIsScanning] = useState(true);

  const username = 'y4mee';

  const fetchGitHubStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const reposData = await reposResponse.json();

      // Calculate stats
      const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
      
      // Fetch events to get commit count (approximate)
      const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
      const eventsData = eventsResponse.ok ? await eventsResponse.json() : [];
      const pushEvents = eventsData.filter(event => event.type === 'PushEvent');
      const totalCommits = pushEvents.reduce((sum, event) => sum + (event.payload?.commits?.length || 0), 0);

      // Fetch pull requests and issues (search API has rate limits, so we'll estimate)
      const searchPRs = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`);
      const searchIssues = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:issue`);
      
      const prsData = searchPRs.ok ? await searchPRs.json() : { total_count: 0 };
      const issuesData = searchIssues.ok ? await searchIssues.json() : { total_count: 0 };

      setStats({
        totalCommits: totalCommits + 2800, // Adding base commits as GitHub API is limited
        totalStars,
        totalPRs: prsData.total_count,
        totalIssues: issuesData.total_count,
        totalReviews: Math.floor(prsData.total_count * 0.3), // Estimate
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following
      });

      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      // Fallback to sample data if API fails
      setStats({
        totalCommits: 2867,
        totalStars: 218,
        totalPRs: 432,
        totalIssues: 26,
        totalReviews: 62,
        publicRepos: 14,
        followers: 45,
        following: 32
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubStats();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchGitHubStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate loading animation
    const timer = setTimeout(() => setIsScanning(false), 2000);
    
    // Stagger the appearance of stats
    [0, 1, 2, 3, 4, 5].forEach((index) => {
      setTimeout(() => {
        setActiveStats(prev => [...prev, index]);
      }, 300 * index);
    });

    return () => clearTimeout(timer);
  }, [stats]);

  const statsData = [
    { 
      icon: <History size={20} />, 
      label: 'COMMITS', 
      value: stats.totalCommits, 
      color: 'text-white/80', 
      bgColor: 'bg-white/5', 
      borderColor: 'border-white/20' 
    },
    { 
      icon: <Star size={20} />, 
      label: 'STARS', 
      value: stats.totalStars, 
      color: 'text-white/80', 
      bgColor: 'bg-white/5', 
      borderColor: 'border-white/20' 
    },
    { 
      icon: <GitPullRequest size={20} />, 
      label: 'PRS', 
      value: stats.totalPRs, 
      color: 'text-white/80', 
      bgColor: 'bg-white/5', 
      borderColor: 'border-white/20' 
    },
    { 
      icon: <AlertCircle size={20} />, 
      label: 'ISSUES', 
      value: stats.totalIssues, 
      color: 'text-white/80', 
      bgColor: 'bg-white/5', 
      borderColor: 'border-white/20' 
    },
    { 
      icon: <MessageSquare size={20} />, 
      label: 'REVIEWS', 
      value: stats.totalReviews, 
      color: 'text-white/80', 
      bgColor: 'bg-white/5', 
      borderColor: 'border-white/20' 
    },
    { 
      icon: <Share2 size={20} />, 
      label: 'REPOS', 
      value: stats.publicRepos, 
      color: 'text-white/80', 
      bgColor: 'bg-white/5', 
      borderColor: 'border-white/20' 
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Anime-style outer frame */}
      <div className="absolute -inset-3 border-2 border-white/20 transform rotate-1 animate-pulse"></div>
      <div className="absolute -inset-2 border border-white/30"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-8 w-6 h-6 border-2 border-white rotate-45"></div>
        <div className="absolute top-8 right-12 w-8 h-1 bg-white transform skew-x-12"></div>
        <div className="absolute bottom-4 left-12 w-4 h-4 border border-white rounded-full"></div>
        <div className="absolute bottom-8 right-8 w-10 h-2 bg-white"></div>
      </div>

      <div className="relative bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white overflow-hidden">
        {/* Scanning effect overlay */}
        {(isScanning || loading) && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse">
            <div className="absolute top-0 left-0 w-full h-px bg-cyan-400 animate-pulse"></div>
          </div>
        )}

        {/* Header Section */}
        <div className="relative mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center gap-4 flex-1">
              <div className="w-12 h-px bg-white/60"></div>
              <div className="flex items-center gap-3">
                <Terminal className="w-6 h-6 text-white animate-pulse" />
                <h2 className="text-2xl font-bold tracking-[0.3em]">GITHUB STATISTICS</h2>
                <Code2 className="w-6 h-6 text-white animate-pulse delay-500" />
              </div>
              <div className="w-12 h-px bg-white/60"></div>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={fetchGitHubStats}
              disabled={loading}
              className="ml-4 p-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 group"
              title="Refresh Stats"
            >
              <RefreshCw className={`w-4 h-4 text-cyan-400 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
            </button>
          </div>
          
          {/* Status indicators */}
          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${error ? 'bg-red-400' : 'bg-green-400'}`}></div>
              <span className={`tracking-wider font-bold ${error ? 'text-red-400' : 'text-green-400'}`}>
                {error ? 'DATA ERROR' : 'DATA FETCHED'}
              </span>
            </div>
            <div className="w-px h-3 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></div>
              <span className="text-blue-400 tracking-wider font-bold">REAL-TIME</span>
            </div>
            {lastUpdated && (
              <>
                <div className="w-px h-3 bg-white/30"></div>
                <span className="text-white/60 tracking-wider">
                  UPDATED: {lastUpdated.toLocaleTimeString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statsData.map(({ icon, label, value, color, bgColor, borderColor }, idx) => {
            const isActive = activeStats.includes(idx) && !loading;
            
            return (
              <div key={idx} className="group relative">
                {/* Anime-style stat card */}
                <div className={`relative ${bgColor} backdrop-blur-sm border ${borderColor} rounded-2xl p-4 transition-all duration-500 hover:scale-105 hover:border-opacity-80 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  
                  {/* Corner accents */}
                  <div className={`absolute top-2 right-2 w-2 h-2 border-r border-t ${borderColor.replace('border-', 'border-')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className={`absolute bottom-2 left-2 w-2 h-2 border-l border-b ${borderColor.replace('border-', 'border-')} opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100`}></div>
                  
                  {/* Speed lines effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white/20 transform rotate-12"
                        style={{
                          width: '1px',
                          height: '20px',
                          left: `${20 + i * 20}%`,
                          top: `${10 + i * 15}%`,
                        }}
                      ></div>
                    ))}
                  </div>

                  <div className="relative z-10 flex flex-col items-center space-y-3">
                    {/* Icon with glow effect */}
                    <div className={`relative p-2 ${bgColor} rounded-xl border ${borderColor} group-hover:bg-white/10 transition-all duration-300`}>
                      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      <div className={`relative ${color} group-hover:text-white transition-colors duration-300`}>
                        {icon}
                      </div>
                    </div>

                    {/* Label */}
                    <span className="text-xs font-bold tracking-wider text-white/80 group-hover:text-white transition-colors duration-300">
                      {label}
                    </span>

                    {/* Value with anime-style counter */}
                    <div className="flex flex-col items-center">
                      <span className={`text-lg font-bold ${color} group-hover:text-white group-hover:scale-110 transition-all duration-300`}>
                        {loading ? '---' : (isActive ? value.toLocaleString() : '---')}
                      </span>
                      
                      {/* Progress indicator */}
                      <div className="flex gap-1 mt-1">
                        <div className={`w-1 h-1 bg-white/60 rounded-full ${isActive && !loading ? 'animate-pulse' : 'opacity-30'}`}></div>
                        <div className={`w-1 h-1 bg-white/40 rounded-full ${isActive && !loading ? 'animate-pulse delay-200' : 'opacity-30'}`}></div>
                        <div className={`w-1 h-1 bg-white/20 rounded-full ${isActive && !loading ? 'animate-pulse delay-400' : 'opacity-30'}`}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection line to next stat */}
                {idx < statsData.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-px bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom status bar */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex items-center justify-center gap-6 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="tracking-wider">USER: @{username}</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-500"></div>
              <span className="tracking-wider">STATUS: ACTIVE DEVELOPER</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
              <span className="tracking-wider">FOLLOWERS: {stats.followers}</span>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/40"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/40"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/40"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/40"></div>
      </div>
    </div>
  );
};

export default GitHubStats;