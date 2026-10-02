import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export const TemplateImage = ({ src, alt, className = '', aspectRatio = 'aspect-[16/10]' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${aspectRatio} ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-neutral-800/80 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-neutral-600 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center text-neutral-500 gap-2">
          <ImageOff className="w-8 h-8 opacity-60" />
          <span className="text-xs font-medium">Image Preview Unavailable</span>
        </div>
      ) : (
        <img
          src={src || fallbackImage}
          alt={alt || 'Template preview'}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          className={`w-full h-full object-cover object-top transition-all duration-500 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      )}
    </div>
  );
};
