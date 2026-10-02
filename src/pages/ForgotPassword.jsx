import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <Link to="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
          <LayoutGrid className="w-5 h-5" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-white">
          Template<span className="text-blue-500">Craft</span>
        </span>
      </Link>

      <div className="w-full max-w-md bg-[#101010] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-white mb-2">Reset Password</h2>
          <p className="text-xs text-neutral-400">Enter your account email to receive a password reset link</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Reset Link Sent!</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We have sent password reset instructions to <strong className="text-white">{email}</strong>. Please check your inbox or spam folder.
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)} fullWidth>
              Try Another Email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full bg-[#161616] border ${
                    error ? 'border-red-500' : 'border-white/10'
                  } focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors`}
                />
              </div>
              {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
            </div>

            <Button type="submit" variant="primary" fullWidth>
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="mt-8 text-center text-xs text-neutral-400">
          <Link to="/login" className="inline-flex items-center gap-1 font-semibold text-neutral-300 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
