/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Briefcase, FileText, User, Home as HomeIcon, Github, Twitter, Linkedin, ExternalLink, Copy, Check, ShoppingBag, ShoppingCart } from 'lucide-react';

type Tab = 'home' | 'about' | 'articles' | 'works' | 'products';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showEmailModal, setShowEmailModal] = useState(false);

  const navItems = [
    { id: 'home', label: '首页', icon: HomeIcon },
    { id: 'about', label: '关于我', icon: User },
    { id: 'articles', label: '我的文章', icon: FileText },
    { id: 'works', label: '我的作品', icon: Briefcase },
    { id: 'products', label: '商品', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-brand-yellow selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <div className="bg-white border-4 border-black rounded-full px-4 md:px-6 py-3 flex items-center justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
          
          
          <div className="flex md:hidden items-center justify-between w-full overflow-x-auto pb-1 -mb-1 hide-scrollbar">
             <div className="flex items-center gap-4 px-2 whitespace-nowrap">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-colors hover:text-brand-pink cursor-pointer flex-shrink-0 ${
                    activeTab === item.id ? 'text-brand-pink underline underline-offset-4 decoration-2' : 'text-black'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowEmailModal(true)}
              className="bg-black text-white p-2 rounded-lg hover:bg-brand-pink transition-colors cursor-pointer ml-2 flex-shrink-0 sticky right-0"
            >
              <Mail size={16} />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`font-bold text-sm uppercase tracking-wider transition-colors hover:text-brand-pink cursor-pointer whitespace-nowrap ${
                  activeTab === item.id ? 'text-brand-pink underline underline-offset-4 decoration-4' : 'text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setShowEmailModal(true)}
            className="hidden md:flex items-center justify-center bg-black text-white p-2 rounded-lg hover:bg-brand-pink transition-colors cursor-pointer absolute right-6 top-1/2 -translate-y-1/2"
          >
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
            {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} setShowEmailModal={setShowEmailModal} />}
            {activeTab === 'about' && <AboutSection />}
            {activeTab === 'articles' && <ArticlesSection />}
            {activeTab === 'works' && <WorksSection />}
            {activeTab === 'products' && <ProductsSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="font-black text-2xl uppercase italic">朔先生</h3>
            <p className="text-gray-600 mt-2">© 2026 朔先生. 用心构建.</p>
          </div>
          <div className="flex gap-4">
            <SocialButton icon={Github} />
            <SocialButton icon={Twitter} />
            <SocialButton icon={Linkedin} />
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showEmailModal && (
          <EmailModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function EmailModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const email = "1146472544@qq.com";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border-4 border-black rounded-[32px] p-8 w-full max-w-md shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-black rounded-full hover:bg-brand-pink transition-colors cursor-pointer"
        >
          ✕
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-yellow border-4 border-black rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
            <Mail size={32} />
          </div>
          <h3 className="text-2xl font-black uppercase">联系方式</h3>
          <p className="text-gray-600 mt-2">选择您喜欢的方式联系我</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black rounded-xl">
            <span className="font-mono font-bold text-lg select-all">{email}</span>
            <button 
              onClick={handleCopy}
              className="bg-white border-2 border-black p-2 rounded-lg hover:bg-brand-blue transition-colors cursor-pointer flex items-center gap-2"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span className="text-sm font-bold">{copied ? '已复制' : '复制'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <a 
              href={`mailto:${email}`}
              className="bg-[#005FF9] text-white p-4 rounded-xl border-2 border-black font-bold flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <span>默认邮件客户端</span>
            </a>
            <a 
              href={`https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=${email}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#FFE100] text-black p-4 rounded-xl border-2 border-black font-bold flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <span>网页版 QQ 邮箱</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function HomeSection({ setActiveTab, setShowEmailModal }: { setActiveTab: (tab: Tab) => void, setShowEmailModal: (show: boolean) => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
      <div className="space-y-8">
        <h1 className="text-6xl md:text-8xl font-black leading-tight">
          我是 <span className="bg-brand-pink text-white px-4 inline-block transform -rotate-1">朔先生</span>,
          <br />
          一名来自 <span className="bg-brand-blue text-white px-4 inline-block transform rotate-1">中国</span> 的网页设计师
        </h1>
        <p className="text-xl text-gray-600 max-w-md leading-relaxed">
          专注于打造独特、有趣且富有表现力的数字体验。擅长前端开发与视觉设计。
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setShowEmailModal(true)}
            className="bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            <Mail size={20} /> 联系我
          </button>
          <button 
            onClick={() => setActiveTab('works')}
            className="bg-white text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 border-4 border-black hover:bg-brand-yellow transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            <Briefcase size={20} /> 查看作品
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="bg-brand-yellow border-4 border-black rounded-[40px] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-square flex items-end justify-center -mt-16 md:-mt-24 group">
          <img 
            src="https://picsum.photos/seed/avatar/800/800" 
            alt="Avatar" 
            className="w-full h-full object-cover rounded-2xl border-4 border-black grayscale md:group-hover:grayscale-0 transition-all duration-500 cursor-pointer md:cursor-default"
            referrerPolicy="no-referrer"
            onClick={(e) => {
              // 手机端点击切换黑白和彩色
              const img = e.currentTarget;
              if (window.innerWidth < 768) {
                img.classList.toggle('grayscale-0');
                img.classList.toggle('grayscale');
              }
            }}
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
        <h2 className="text-5xl font-black uppercase mb-8 italic underline decoration-brand-yellow decoration-8 underline-offset-8">关于我</h2>
        <p className="text-2xl leading-relaxed text-gray-700">
          我是一名跨领域的设计师与开发者。拥有多年的行业经验，擅长将创意与技术结合，打造令人印象深刻的互联网产品。
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <SkillCard title="设计" description="UI/UX设计, 品牌包装, 动效设计, 排版" color="bg-brand-pink" />
        <SkillCard title="开发" description="React, TypeScript, Tailwind, Node.js" color="bg-brand-blue" />
        <SkillCard title="策略" description="产品思维, 用户研究, 搜索引擎优化" color="bg-brand-yellow" />
      </div>

      <div className="bg-black text-white p-12 rounded-[40px] border-4 border-black shadow-[12px_12px_0px_0px_#FFD93D]">
        <h3 className="text-3xl font-black mb-6 uppercase">我的经历</h3>
        <div className="space-y-8">
          <TimelineItem year="2024 - 至今" role="高级设计师" company="创意数字机构" />
          <TimelineItem year="2021 - 2024" role="产品设计师" company="科技初创公司" />
          <TimelineItem year="2018 - 2021" role="初级设计师" company="独立设计工作室" />
        </div>
      </div>
    </div>
  );
}

function ArticlesSection() {
  const articles = [
    { title: "粗野主义网页设计的未来", date: "2026年3月15日", category: "设计", readTime: "5 分钟阅读" },
    { title: "精通 Tailwind CSS v4", date: "2026年2月28日", category: "开发", readTime: "8 分钟阅读" },
    { title: "为什么排版比你想象的更重要", date: "2026年1月12日", category: "排版", readTime: "12 分钟阅读" },
    { title: "构建可扩展的 React 应用", date: "2025年12月05日", category: "开发", readTime: "15 分钟阅读" },
  ];

  return (
    <div className="space-y-12 py-12">
      <h2 className="text-5xl font-black uppercase italic underline decoration-brand-blue decoration-8 underline-offset-8">我的文章</h2>
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
              <span className="flex items-center gap-1">阅读文章 <ExternalLink size={14} /></span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProductsSection() {
  const products = [
    { id: 1, title: "设计系统模板", price: "¥199", description: "包含 500+ 组件的 Figma 高级设计系统，助你快速搭建企业级应用。", image: "https://picsum.photos/seed/prod1/800/600", tag: "热卖", color: "bg-brand-yellow" },
    { id: 2, title: "前端开发实战课程", price: "¥299", description: "从零开始带你使用 React 和 Tailwind 构建现代化商业网站。", image: "https://picsum.photos/seed/prod2/800/600", tag: "上新", color: "bg-brand-pink" },
    { id: 3, title: "个人简历网页源码", price: "¥99", description: "一套可以直接部署的响应式个人作品集源码，支持暗黑模式。", image: "https://picsum.photos/seed/prod3/800/600", tag: "基础", color: "bg-brand-blue" },
  ];

  return (
    <div className="space-y-12 py-12">
      <div className="flex justify-between items-end">
        <h2 className="text-5xl font-black uppercase italic underline decoration-brand-yellow decoration-8 underline-offset-8">数字商品</h2>
        <div className="hidden md:flex items-center gap-2 font-bold text-gray-500">
          <ShoppingCart size={20} />
          <span>安全支付保障</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white border-4 border-black rounded-[32px] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
            <div className={`h-48 ${product.color} relative border-b-4 border-black p-4 flex items-center justify-center overflow-hidden`}>
              <span className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase rounded-full z-10">
                {product.tag}
              </span>
              <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-black leading-tight">{product.title}</h3>
              </div>
              <p className="text-gray-600 font-medium mb-6 flex-grow">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-dashed border-gray-200">
                <span className="text-3xl font-black text-brand-pink">{product.price}</span>
                <button 
                  onClick={() => alert('提示：接入真实微信/支付宝支付需要企业资质和商户号。目前为展示效果。')}
                  className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-yellow hover:text-black border-2 border-transparent hover:border-black transition-colors"
                >
                  立即购买
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 border-4 border-black p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-black mb-2">需要定制化开发？</h4>
          <p className="text-gray-600">承接企业级官网、小程序及内部管理系统开发，欢迎邮件联系咨询报价。</p>
        </div>
        <button className="bg-white text-black border-4 border-black px-8 py-3 rounded-full font-bold whitespace-nowrap hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1">
          获取报价
        </button>
      </div>
    </div>
  );
}

function WorksSection() {
  const works = [
    { title: "电商平台", category: "网页设计", image: "https://picsum.photos/seed/work1/800/600", color: "bg-brand-pink" },
    { title: "银行App界面", category: "移动应用", image: "https://picsum.photos/seed/work2/800/600", color: "bg-brand-blue" },
    { title: "品牌视觉识别", category: "品牌设计", image: "https://picsum.photos/seed/work3/800/600", color: "bg-brand-yellow" },
    { title: "SaaS数据看板", category: "Web应用", image: "https://picsum.photos/seed/work4/800/600", color: "bg-brand-pink" },
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
      <h2 className="text-5xl font-black uppercase italic underline decoration-brand-pink decoration-8 underline-offset-8">我的作品</h2>
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
