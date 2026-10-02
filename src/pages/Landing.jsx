import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Layers,
  Star,
  CheckCircle2,
  Check
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { CategoryCard } from '../components/CategoryCard';
import { TemplateCard } from '../components/TemplateCard';
import { CATEGORIES } from '../data/categories';
import { TEMPLATES } from '../data/templates';

export const Landing = () => {
  const navigate = useNavigate();

  const popularCategories = CATEGORIES.slice(0, 6);
  const featuredTemplates = TEMPLATES.filter((t) => t.isPopular).slice(0, 6);

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'CEO at ModernPulse',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: 'TemplateCraft cut our web project launch time from 6 weeks to just 2 days. The customization dashboard is absurdly smooth!'
    },
    {
      name: 'David Chen',
      role: 'Founder, TechNexus',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'The quality of these templates feels like a $20,000 custom agency build. Handing off projects to clients has never been easier.'
    },
    {
      name: 'Elena Rostova',
      role: 'Product Lead, Orbit SaaS',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      comment: 'We used the AI SaaS template and created our app dashboard in minutes. Best developer tool I’ve used all year.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      <Navbar isPublic={true} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-center">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-blue-400 mb-8 backdrop-blur-md animate-fade-in shadow-inner">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Introducing TemplateCraft 2.0 Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 max-w-5xl mx-auto">
          Build Something Great.{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Start With the Right Template.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-10">
          Choose a category, explore professionally designed templates, and turn your idea into a ready-to-customize project in seconds.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate('/templates')}
            icon={ArrowRight}
            className="w-full sm:w-auto text-base px-8"
          >
            Explore Templates
          </Button>
          <Button
            size="lg"
            variant="dark"
            onClick={() => navigate('/signup')}
            icon={Sparkles}
            className="w-full sm:w-auto text-base px-8"
          >
            Get Started Free
          </Button>
        </div>

        {/* Visual Template Cards Hero Showcase */}
        <div className="relative mt-8 rounded-3xl p-3 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="rounded-2xl overflow-hidden bg-[#0d0d0d] p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTemplates.slice(0, 3).map((template) => (
              <div
                key={template.id}
                onClick={() => navigate(`/template/${template.id}/preview`)}
                className="group relative bg-[#121212] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer text-left"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                    {template.categoryName}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    {template.name}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-1">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. Popular Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
              Browse Verticals
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Explore Popular Categories
            </h3>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate('/categories')}
            icon={ArrowRight}
            className="mt-4 md:mt-0"
          >
            View All 12 Categories
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 2. Featured Templates Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-[#080808]/60 rounded-3xl border border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
              Handpicked Designs
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Featured Templates
            </h3>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate('/templates')}
            icon={ArrowRight}
            className="mt-4 md:mt-0"
          >
            Explore Marketplace
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center w-full">
        <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
          Simple 3-Step Process
        </h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-16">
          How TemplateCraft Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 rounded-2xl bg-[#101010] border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-extrabold text-xl mb-6">
              1
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Select Your Category</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Choose from 12 specialized industry categories ranging from eCommerce and Mobile Apps to SaaS and Enterprise ERP.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#101010] border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-extrabold text-xl mb-6">
              2
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Preview & Test Drive</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Experience full interactive live website previews before making a decision. Test responsive layouts and UI components.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#101010] border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold text-xl mb-6">
              3
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Customize & Launch</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Click "Use This Template" to start a new project. Edit branding, colors, logos, and hero content in our live builder.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
              Why TemplateCraft
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              Engineered for Speed, Beauty, and High Conversions
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Don’t start from a blank canvas. Our templates are crafted by senior UI architects using modern design principles, dark mode aesthetics, and clean component architecture.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">100% Production Ready</h4>
                  <p className="text-xs text-neutral-400">
                    Clean, modular layout structures compatible with modern React standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Real-Time Customization Engine</h4>
                  <p className="text-xs text-neutral-400">
                    Instantly tweak colors, text, logos, and navigation without touching code.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Mobile-First Responsive Grids</h4>
                  <p className="text-xs text-neutral-400">
                    Flawless experience across 1440px desktop displays down to 375px mobile screens.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl -z-10" />
            <div className="bg-[#101010] border border-white/10 rounded-3xl p-6 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
                alt="Dashboard showcase"
                className="rounded-2xl border border-white/10 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
          Flexible Pricing
        </h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-16">
          Simple, Transparent Plans
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Starter */}
          <div className="p-8 rounded-3xl bg-[#101010] border border-white/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Starter</h4>
              <p className="text-xs text-neutral-400 mb-6">Perfect for personal projects & experiments.</p>
              <div className="text-4xl font-extrabold text-white mb-6">
                $0 <span className="text-xs text-neutral-500 font-normal">/ forever</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Access to 10+ Free Templates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> 3 Active Custom Projects
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Basic Customization Panel
                </li>
              </ul>
            </div>
            <Button variant="outline" onClick={() => navigate('/signup')} fullWidth>
              Get Started Free
            </Button>
          </div>

          {/* Pro */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#141420] to-[#101010] border-2 border-blue-500 relative flex flex-col justify-between shadow-2xl shadow-blue-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Pro Creator</h4>
              <p className="text-xs text-neutral-400 mb-6">For freelancers and growing startups.</p>
              <div className="text-4xl font-extrabold text-white mb-6">
                $29 <span className="text-xs text-neutral-500 font-normal">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Access to ALL 30+ Templates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Unlimited Custom Projects
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Live Responsive Device Preview
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Priority Support & Updates
                </li>
              </ul>
            </div>
            <Button variant="primary" onClick={() => navigate('/signup')} fullWidth>
              Start 14-Day Free Trial
            </Button>
          </div>

          {/* Enterprise */}
          <div className="p-8 rounded-3xl bg-[#101010] border border-white/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Agency & Team</h4>
              <p className="text-xs text-neutral-400 mb-6">For agencies managing client accounts.</p>
              <div className="text-4xl font-extrabold text-white mb-6">
                $89 <span className="text-xs text-neutral-500 font-normal">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Everything in Pro Creator
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Team Collaboration Tools
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> White-label Export Options
                </li>
              </ul>
            </div>
            <Button variant="outline" onClick={() => navigate('/signup')} fullWidth>
              Contact Enterprise
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-xs font-bold text-center text-blue-400 uppercase tracking-widest mb-2">
          Loved by Creators
        </h2>
        <h3 className="text-3xl font-extrabold text-center text-white mb-16">
          What Designers & Founders Say
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#101010] border border-white/10 flex flex-col justify-between"
            >
              <div className="mb-6">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-neutral-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call To Action (CTA) Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="relative p-12 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/30 overflow-hidden shadow-2xl backdrop-blur-xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Ready to Build Your Next Project?
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of developers, agencies, and entrepreneurs building with TemplateCraft today.
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate('/signup')}
            icon={Sparkles}
            className="px-8"
          >
            Get Started Now - Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
