import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useTemplates } from '../context/TemplateContext';

export const TemplateSearch = ({ placeholder = 'Search templates, categories, tags...', value, onChange }) => {
  const navigate = useNavigate();
  const { templates } = useTemplates();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const searchTerm = value || '';

  // Suggestions based on search input
  const suggestions = searchTerm.trim().length >= 2
    ? templates.filter((t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-neutral-400 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full bg-[#101010] border border-white/10 focus:border-blue-500 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-neutral-500 shadow-inner focus:outline-none transition-all duration-200"
        />
        {searchTerm && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 text-neutral-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl z-40 overflow-hidden backdrop-blur-xl animate-fade-in divide-y divide-white/5">
          <div className="px-4 py-2 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider bg-black/40">
            Suggested Templates
          </div>
          {suggestions.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                setShowSuggestions(false);
                navigate(`/template/${t.id}/preview`);
              }}
              className="flex items-center justify-between p-3.5 hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-lg object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {t.name}
                  </h4>
                  <span className="text-xs text-neutral-400">{t.categoryName}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  Preview
                </span>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
