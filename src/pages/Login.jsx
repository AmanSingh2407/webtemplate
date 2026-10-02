import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Mail, Lock, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/home';

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);

      if (res.success) {
        addToast(`Welcome back, ${res.user.name}!`, 'success');
        navigate(from, { replace: true });
      } else {
        setErrors({ form: res.message });
      }
    }, 400);
  };

  const handleDemoFill = () => {
    setEmail('demo@example.com');
    setPassword('Demo@123');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer backdrop-blur-md z-20"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Logo Header */}
      <Link to="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
          <LayoutGrid className="w-5 h-5" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-white">
          Template<span className="text-blue-500">Craft</span>
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-[#101010] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-white mb-2">Welcome Back</h2>
          <p className="text-xs text-neutral-400">Log in to manage your templates and projects</p>
        </div>

        {/* Form Error Banner */}
        {errors.form && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* Demo Login Quick Fill Button */}
        <div className="mb-6 p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
          <div className="text-xs text-blue-300">
            <strong className="block font-semibold">Try Demo Account:</strong>
            demo@example.com / Demo@123
          </div>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            Auto Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
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
                  errors.email ? 'border-red-500' : 'border-white/10'
                } focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-300">Password</label>
              <Link to="/forgot-password" className="text-xs text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-[#161616] border ${
                  errors.password ? 'border-red-500' : 'border-white/10'
                } focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors`}
              />
            </div>
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded bg-[#161616] border-white/20 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember-me" className="ml-2 text-xs text-neutral-400 cursor-pointer">
              Remember me on this device
            </label>
          </div>

          {/* Submit */}
          <Button type="submit" variant="primary" fullWidth disabled={loading} icon={ArrowRight}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>

          {/* Google SSO Demo Button */}
          <button
            type="button"
            onClick={() => {
              handleDemoFill();
              addToast('Google SSO demo filled credentials', 'info');
            }}
            className="w-full flex items-center justify-center gap-3 bg-[#161616] hover:bg-[#202020] border border-white/10 rounded-xl py-2.5 text-xs font-semibold text-neutral-300 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 10.03 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            Continue with Google
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-neutral-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-blue-400 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
