/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Briefcase, FileText, User, Home as HomeIcon, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

type Tab = 'home' | 'about' | 'articles' | 'works';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const navItems = [
    { id: 'home', label: '首页', icon: HomeIcon },
    { id: 'about', label: '关于我', icon: User },
    { id: 'articles', label: '我的文章', icon: FileText },
    { id: 'works', label: '我的作品', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-brand-yellow selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <div className="bg-white border-4 border-black rounded-full px-4 md:px-6 py-3 flex items-center justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
          
          
          <div className="flex md:hidden items-center justify-between w-full">
             <div className="flex items-center gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`font-bold text-xs uppercase tracking-wider transition-colors hover:text-brand-pink cursor-pointer ${
                    activeTab === item.id ? 'text-brand-pink underline underline-offset-4 decoration-2' : 'text-black'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button className="bg-black text-white p-2 rounded-lg hover:bg-brand-pink transition-colors cursor-pointer ml-2">
              <Mail size={16} />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`font-bold text-sm uppercase tracking-wider transition-colors hover:text-brand-pink cursor-pointer ${
                  activeTab === item.id ? 'text-brand-pink underline underline-offset-4 decoration-4' : 'text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="hidden md:block bg-black text-white p-2 rounded-lg hover:bg-brand-pink transition-colors cursor-pointer absolute right-6 top-1/2 -translate-y-1/2">
            <Mail size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav - Removed bottom nav since we show it on top now */}

      {/* Content */}
      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} />}
            {activeTab === 'about' && <AboutSection />}
            {activeTab === 'articles' && <ArticlesSection />}
            {activeTab === 'works' && <WorksSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="font-black text-2xl uppercase italic">John Carter</h3>
            <p className="text-gray-600 mt-2">© 2026 John Carter. Built with passion.</p>
          </div>
          <div className="flex gap-4">
            <SocialButton icon={Github} />
            <SocialButton icon={Twitter} />
            <SocialButton icon={Linkedin} />
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomeSection({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
      <div className="space-y-8">
        <h1 className="text-6xl md:text-8xl font-black leading-tight">
          I'm <span className="bg-brand-pink text-white px-4 inline-block transform -rotate-1">John Carter</span>,
          <br />
          a Web Designer from <span className="bg-brand-blue text-white px-4 inline-block transform rotate-1">New York</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-md leading-relaxed">
          Lacus, adipiscing lectus convallis purus aliquet cursus magnaol montes augue donec cras turpis ultrices nulla sed doler.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer">
            <Mail size={20} /> Get in touch
          </button>
          <button 
            onClick={() => setActiveTab('works')}
            className="bg-white text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 border-4 border-black hover:bg-brand-yellow transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            <Briefcase size={20} /> View portfolio
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="bg-brand-yellow border-4 border-black rounded-[40px] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-square flex items-end justify-center -mt-16 md:-mt-24">
          <img 
            src="https://picsum.photos/seed/avatar/800/800" 
            alt="Avatar" 
            className="w-full h-full object-cover rounded-2xl border-4 border-black grayscale hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-pink border-4 border-black rounded-full"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-blue border-4 border-black rotate-12"></div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-16 py-12">
      <div className="max-w-3xl">
        <h2 className="text-5xl font-black uppercase mb-8 italic underline decoration-brand-yellow decoration-8 underline-offset-8">About Me</h2>
        <p className="text-2xl leading-relaxed text-gray-700">
          I am a multidisciplinary designer and developer based in New York. With over 8 years of experience, I specialize in creating bold, functional, and memorable digital experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <SkillCard title="Design" description="UI/UX, Branding, Motion Graphics, Typography" color="bg-brand-pink" />
        <SkillCard title="Development" description="React, TypeScript, Tailwind, Node.js" color="bg-brand-blue" />
        <SkillCard title="Strategy" description="Product Thinking, User Research, SEO" color="bg-brand-yellow" />
      </div>

      <div className="bg-black text-white p-12 rounded-[40px] border-4 border-black shadow-[12px_12px_0px_0px_#FFD93D]">
        <h3 className="text-3xl font-black mb-6 uppercase">My Journey</h3>
        <div className="space-y-8">
          <TimelineItem year="2024 - Present" role="Senior Designer" company="Creative Agency" />
          <TimelineItem year="2021 - 2024" role="Product Designer" company="Tech Startup" />
          <TimelineItem year="2018 - 2021" role="Junior Designer" company="Design Studio" />
        </div>
      </div>
    </div>
  );
}

function ArticlesSection() {
  const articles = [
    { title: "The Future of Brutalist Web Design", date: "Mar 15, 2026", category: "Design", readTime: "5 min read" },
    { title: "Mastering Tailwind CSS v4", date: "Feb 28, 2026", category: "Dev", readTime: "8 min read" },
    { title: "Why Typography Matters More Than You Think", date: "Jan 12, 2026", category: "Typography", readTime: "12 min read" },
    { title: "Building Scalable React Applications", date: "Dec 05, 2025", category: "Dev", readTime: "15 min read" },
  ];

  return (
    <div className="space-y-12 py-12">
      <h2 className="text-5xl font-black uppercase italic underline decoration-brand-blue decoration-8 underline-offset-8">My Articles</h2>
      <div className="grid gap-6">
        {articles.map((article, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ x: 10 }}
            className="group cursor-pointer bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">{article.category}</span>
              <span className="text-gray-500 font-mono text-sm">{article.date}</span>
            </div>
            <h3 className="text-3xl font-black group-hover:text-brand-pink transition-colors">{article.title}</h3>
            <div className="mt-6 flex items-center gap-4 text-gray-500 font-bold text-sm">
              <span>{article.readTime}</span>
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              <span className="flex items-center gap-1">Read Article <ExternalLink size={14} /></span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WorksSection() {
  const works = [
    { title: "E-commerce Platform", category: "Web Design", image: "https://picsum.photos/seed/work1/800/600", color: "bg-brand-pink" },
    { title: "Banking App UI", category: "Mobile App", image: "https://picsum.photos/seed/work2/800/600", color: "bg-brand-blue" },
    { title: "Brand Identity", category: "Branding", image: "https://picsum.photos/seed/work3/800/600", color: "bg-brand-yellow" },
    { title: "SaaS Dashboard", category: "Web App", image: "https://picsum.photos/seed/work4/800/600", color: "bg-brand-pink" },
  ];
  const [customImages, setCustomImages] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('worksCustomImages');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('worksCustomImages', JSON.stringify(customImages));
    } catch {}
  }, [customImages]);
  useEffect(() => {
    const exts = ['png', 'jpg', 'jpeg', 'webp'];
    const checkAndSet = async (idx: number) => {
      for (const ext of exts) {
        const url = `/uploads/works-${idx}.${ext}`;
        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok) {
            setCustomImages((prev) => (prev[idx] ? prev : { ...prev, [idx]: url }));
            return;
          }
        } catch {}
      }
    };
    works.forEach((_, idx) => checkAndSet(idx));
  }, []);

  return (
    <div className="space-y-12 py-12">
      <h2 className="text-5xl font-black uppercase italic underline decoration-brand-pink decoration-8 underline-offset-8">My Works</h2>
      <div className="grid md:grid-cols-2 gap-12">
        {works.map((work, idx) => (
          <div key={idx} className="group">
            <div 
              className={`relative border-4 border-black rounded-[32px] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all md:group-hover:shadow-none md:group-hover:translate-x-2 md:group-hover:translate-y-2`}
            >
              <img 
                src={customImages[idx] ?? work.image} 
                alt={work.title} 
                className="w-full aspect-[4/3] object-cover grayscale md:group-hover:grayscale-0 active:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
                onClick={(e) => {
                  // On mobile, toggle grayscale on click by temporarily adding a class
                  const img = e.currentTarget;
                  img.classList.toggle('grayscale-0');
                  img.classList.toggle('grayscale');
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none md:pointer-events-auto">
                <label className="bg-white text-black px-6 py-3 rounded-full font-black flex items-center gap-2 cursor-pointer pointer-events-auto">
                  更换图片 <ExternalLink size={18} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = async () => {
                          const dataUrl = reader.result as string;
                          try {
                            const res = await fetch(`/api/upload/works/${idx}`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ dataUrl }),
                            });
                            const json = await res.json();
                            if (json?.ok && json?.path) {
                              setCustomImages((prev) => ({ ...prev, [idx]: json.path }));
                            } else {
                              setCustomImages((prev) => ({ ...prev, [idx]: dataUrl }));
                            }
                          } catch {
                            setCustomImages((prev) => ({ ...prev, [idx]: dataUrl }));
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="mt-6">
              <span className="text-sm font-black uppercase tracking-widest text-gray-500">{work.category}</span>
              <h3 className="text-3xl font-black mt-1">{work.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillCard({ title, description, color }: { title: string; description: string; color: string }) {
  return (
    <div className={`p-8 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${color}`}>
      <h4 className="text-2xl font-black uppercase mb-4">{title}</h4>
      <p className="font-bold leading-relaxed">{description}</p>
    </div>
  );
}

function TimelineItem({ year, role, company }: { year: string; role: string; company: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 border-l-4 border-white pl-6 relative">
      <div className="absolute -left-[10px] top-0 w-4 h-4 bg-brand-yellow rounded-full border-2 border-black"></div>
      <span className="font-mono text-brand-yellow font-bold">{year}</span>
      <div className="flex-1">
        <h4 className="text-xl font-black">{role}</h4>
        <p className="text-gray-400">{company}</p>
      </div>
    </div>
  );
}

function SocialButton({ icon: Icon }: { icon: any }) {
  return (
    <button className="w-12 h-12 border-4 border-black rounded-xl flex items-center justify-center hover:bg-brand-yellow transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer">
      <Icon size={20} />
    </button>
  );
}
