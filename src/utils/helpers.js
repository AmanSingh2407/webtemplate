// Helper functions for date formatting, ID generation, filtering

export const generateId = (prefix = 'id') => {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
};

export const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTimeAgo = (isoString) => {
  if (!isoString) return 'recently';
  const now = new Date();
  const past = new Date(isoString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(isoString);
};

export const getCategoryColorClasses = (colorName) => {
  const map = {
    blue: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/20',
      hoverBorder: 'hover:border-blue-500/50',
      iconBg: 'bg-blue-500/20 text-blue-400',
      badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    },
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/20',
      hoverBorder: 'hover:border-purple-500/50',
      iconBg: 'bg-purple-500/20 text-purple-400',
      badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30'
    },
    green: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20',
      hoverBorder: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    },
    orange: {
      bg: 'bg-orange-500/10',
      text: 'text-orange-400',
      border: 'border-orange-500/20',
      hoverBorder: 'hover:border-orange-500/50',
      iconBg: 'bg-orange-500/20 text-orange-400',
      badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30'
    },
    pink: {
      bg: 'bg-pink-500/10',
      text: 'text-pink-400',
      border: 'border-pink-500/20',
      hoverBorder: 'hover:border-pink-500/50',
      iconBg: 'bg-pink-500/20 text-pink-400',
      badge: 'bg-pink-500/15 text-pink-400 border-pink-500/30'
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/20',
      hoverBorder: 'hover:border-cyan-500/50',
      iconBg: 'bg-cyan-500/20 text-cyan-400',
      badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
    },
    yellow: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/20',
      hoverBorder: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-500/20 text-amber-400',
      badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
    },
    violet: {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-400',
      border: 'border-indigo-500/20',
      hoverBorder: 'hover:border-indigo-500/50',
      iconBg: 'bg-indigo-500/20 text-indigo-400',
      badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
    }
  };

  return map[colorName] || map.blue;
};
