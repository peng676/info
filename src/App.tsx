/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Briefcase, FileText, User, Home as HomeIcon, Github, Twitter, Linkedin, ExternalLink, Copy, Check, ShoppingBag, ShoppingCart, MessageCircle, Play, Pause, SkipForward, Music, Maximize2, X, Eye, MessageSquare, FileAudio, Upload, Download, RefreshCw } from 'lucide-react';

type Tab = 'home' | 'about' | 'articles' | 'works' | 'products' | 'guestbook' | 'tools';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const playlist = [
    { title: "Alive", artist: "Blue", file: "/music/Alive-Blue-7245399-2000.mp3" },
    { title: "NO BATIDÃO", artist: "ZxKAI", file: "/music/NO_BATIDÃO_(Explicit)-ZxKAI_SLXUGHTER-496943468-2000.mp3" },
    { title: "超级冠军", artist: "鹿晗", file: "/music/超级冠军-鹿晗-6632534-2000.mp3" },
    { title: "江南", artist: "林俊杰", file: "/music/江南-林俊杰-93157-2000.mp3" },
    { title: "弱水三千", artist: "lucky小阳", file: "/music/弱水三千_(lucky小阳_Remix)-lucky小阳-310072876-320.mp3" }
  ];

  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (audio) {
      if (isPlaying) {
        audio.play().catch(e => console.log("Auto-play prevented", e));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <audio 
        id="bg-music" 
        src={currentSong.file} 
        onEnded={() => handleNext({ stopPropagation: () => {} } as any)} 
      />
      
      <motion.div 
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center cursor-pointer overflow-hidden transition-all ${isExpanded ? 'rounded-[24px] p-4 pr-6' : 'rounded-full p-3'}`}
      >
        <div className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-brand-yellow shrink-0 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
          <Music size={20} className="text-black" />
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{ width: 'auto', opacity: 1, marginLeft: 16 }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
              className="flex items-center gap-4 whitespace-nowrap"
            >
              <div className="flex flex-col">
                <span className="font-black text-sm max-w-[120px] truncate">{currentSong.title}</span>
                <span className="font-bold text-xs text-gray-500 max-w-[120px] truncate">{currentSong.artist}</span>
              </div>
              
              <div className="flex items-center gap-2 ml-2">
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-brand-pink transition-colors border-2 border-transparent hover:border-black"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-1" />}
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 bg-gray-100 text-black rounded-full flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors border-2 border-black"
                >
                  <SkipForward size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showEmailModal, setShowEmailModal] = useState(false);

  const navItems = [
    { id: 'home', label: '首页', icon: HomeIcon },
    { id: 'about', label: '关于我', icon: User },
    { id: 'articles', label: '我的文章', icon: FileText },
    { id: 'works', label: '我的作品', icon: Briefcase },
    { id: 'products', label: '商品', icon: ShoppingBag },
    { id: 'guestbook', label: '留言', icon: MessageSquare },
    { id: 'tools', label: '工具', icon: FileAudio },
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
            {activeTab === 'guestbook' && <GuestbookSection />}
            {activeTab === 'tools' && <ToolsSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <SiteFooter />

      <AnimatePresence>
        {showEmailModal && (
          <EmailModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
        )}
      </AnimatePresence>

      <MusicPlayer />
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
          我是 <span className="bg-brand-pink text-white px-4 inline-block transform -rotate-1">王朔</span>,
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
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const articles = [
    { 
      id: 'brutalism',
      title: "粗野主义网页设计的未来", 
      date: "2026年3月15日", 
      category: "设计", 
      readTime: "5 分钟阅读",
      content: (
        <>
          <p className="text-xl font-bold">在看惯了千篇一律的极简主义和圆角阴影后，网页设计正在经历一场“文艺复兴”——粗野主义（Brutalism）的强势回归。</p>
          <p>粗野主义一词来源于二战后的建筑风格，强调混凝土的原始质感和结构的裸露。在网页设计中，它表现为对传统美学的反叛：不加修饰的 HTML 元素、高对比度的色彩、夸张的排版以及打破常规的网格系统。</p>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-brand-pink pl-4">为什么我们需要粗野主义？</h3>
          <p>现在的网页越来越像，模板化的设计让互联网失去了个性。粗野主义并不是为了“丑”而丑，而是为了<strong>真实</strong>和<strong>直接</strong>。它去掉了伪装，让内容以最原始的力量冲击用户。</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>脱颖而出</strong>：在海量精致但无聊的网站中，粗野主义能瞬间抓住眼球。</li>
            <li><strong>诚实表达</strong>：不再用虚假的渐变和阴影欺骗视觉。</li>
            <li><strong>性能优势</strong>：由于去掉了大量复杂的 CSS 装饰，页面加载通常更快。</li>
          </ul>
          
          <div className="bg-gray-100 border-l-8 border-black p-6 my-8 font-mono text-sm">
            /* 粗野主义的核心 CSS 示例 */<br/>
            .brutal-card &#123;<br/>
            &nbsp;&nbsp;background: #FFD93D;<br/>
            &nbsp;&nbsp;border: 4px solid #000;<br/>
            &nbsp;&nbsp;box-shadow: 8px 8px 0px 0px #000;<br/>
            &nbsp;&nbsp;font-weight: 900;<br/>
            &nbsp;&nbsp;text-transform: uppercase;<br/>
            &#125;
          </div>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-brand-blue pl-4">如何平衡可用性？</h3>
          <p>纯粹的粗野主义可能会导致用户体验灾难（比如对比度过高导致刺眼，或者排版混乱导致找不到导航）。因此，“新粗野主义”（Neo-Brutalism）应运而生。它保留了大胆的配色和粗边框，但依然遵循现代的 UX 规范。比如你现在正在浏览的这个网站，就是新粗野主义的典型实践。</p>
          <p className="font-bold mt-8">未来，网页设计不应该只是冷冰冰的商业模版，它应该是有性格的、有情绪的、有态度的。而粗野主义，正是我们找回互联网初心的武器。</p>
        </>
      )
    },
    { 
      id: 'tailwind-v4',
      title: "精通 Tailwind CSS v4", 
      date: "2026年2月28日", 
      category: "开发", 
      readTime: "8 分钟阅读",
      content: (
        <>
          <p className="text-xl font-bold">Tailwind CSS 已经彻底改变了我们编写样式的方式。随着 v4 版本的发布，这个原子化 CSS 框架迎来了一次架构级的飞跃。</p>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-brand-blue pl-4">v4 的核心变革：Oxide 引擎</h3>
          <p>v4 版本最大的亮点是引入了全新的 <strong>Oxide 引擎</strong>。它不再依赖 Node.js，而是使用 Rust 重写，这让编译速度提升了惊人的 10 倍以上！对于大型项目来说，热更新（HMR）现在是真正的瞬间完成。</p>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-brand-yellow pl-4">告别配置文件</h3>
          <p>还记得以前庞大的 <code>tailwind.config.js</code> 吗？在 v4 中，配置被极大地简化了。现在，你可以直接在 CSS 文件中使用原生的 CSS 变量来定义主题：</p>
          
          <div className="bg-gray-100 border-l-8 border-black p-6 my-8 font-mono text-sm">
            @theme &#123;<br/>
            &nbsp;&nbsp;--color-brand-pink: #FF6B6B;<br/>
            &nbsp;&nbsp;--color-brand-blue: #4D96FF;<br/>
            &nbsp;&nbsp;--font-black: 900;<br/>
            &#125;
          </div>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-brand-pink pl-4">动态工具类与现代 CSS</h3>
          <p>v4 全面拥抱了现代 CSS 特性。你不再需要为特定的尺寸编写繁琐的插件，它支持完全动态的任意值，并且原生支持了 CSS 原生嵌套（Nesting）和容器查询（Container Queries）。</p>
          
          <p className="font-bold mt-8">总结来说，Tailwind v4 让开发者更加专注于 HTML 本身，它的性能提升和配置简化，使其成为了现代前端开发不可或缺的基石。</p>
        </>
      )
    },
    { 
      id: 'typography',
      title: "为什么排版比你想象的更重要", 
      date: "2026年1月12日", 
      category: "排版", 
      readTime: "12 分钟阅读",
      content: (
        <>
          <p className="text-xl font-bold">“网页设计有 95% 是排版。”这句话在设计圈广为流传，但真正理解并践行的人却不多。</p>
          
          <p>当你剥去网页上所有的图片、视频、色彩和动效，剩下的几乎全是文本。用户来到你的网站，主要是为了阅读信息，而不是欣赏你的 CSS 技巧。因此，文字的呈现方式直接决定了产品的生死。</p>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-black pl-4">排版的三个层级</h3>
          
          <ul className="space-y-6 mt-6">
            <li>
              <strong>1. 可读性 (Legibility)</strong><br/>
              这是最基础的要求。字号是否够大？行高（Line-height）是否舒适？对于正文，行高通常建议在 1.5 到 1.8 之间；行长控制在 60-80 个字符，否则眼睛在换行时容易疲劳。
            </li>
            <li>
              <strong>2. 易读性 (Readability)</strong><br/>
              通过层级结构（H1, H2, H3）引导用户的视线。好的排版能让用户在扫视时就能抓住重点。这需要巧妙运用字重（Font-weight）、颜色对比度和留白。
            </li>
            <li>
              <strong>3. 情感传达 (Emotion)</strong><br/>
              字体是有性格的。无衬线体（如 Inter, Roboto）传递现代、理性的感觉；衬线体（如 Playfair Display）带来优雅、传统的氛围；而手写体或粗野主义的超粗体，则在表达个性与张力。
            </li>
          </ul>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-brand-pink pl-4">留白：排版呼吸的空间</h3>
          <p>不要害怕空白。留白（Whitespace）不是空间的浪费，而是排版的灵魂。它能区分信息区块，减轻认知负荷。在现代设计中，“大字号 + 大留白”已经成为提升高级感的万能公式。</p>
          
          <p className="font-bold mt-8">下次设计网页时，试着先只用黑白两色和一种字体，把排版做到极致。你会发现，只要排版对了，设计就已经成功了 80%。</p>
        </>
      )
    },
    { 
      id: 'react-scalable',
      title: "构建可扩展的 React 应用", 
      date: "2025年12月05日", 
      category: "开发", 
      readTime: "15 分钟阅读",
      content: (
        <>
          <p className="text-xl font-bold">写出一个能跑的 React 应用很容易，但写出一个随着业务增长依然好维护的 React 应用，却是一门艺术。</p>
          
          <p>随着项目规模的扩大，组件变得臃肿，状态管理混乱，性能问题频发。如何从第一天起就为“可扩展性”打好基础？</p>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-brand-blue pl-4">1. 目录结构：按功能划分 (Feature-Sliced Design)</h3>
          <p>不要把所有的组件都扔进 <code>src/components</code>。更好的做法是按照业务功能（Feature）来组织代码。比如 <code>src/features/auth</code>，里面包含该功能专属的组件、Hooks、API 请求和类型定义。这样不仅高内聚，而且方便多人协作。</p>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-brand-yellow pl-4">2. 状态管理：不要滥用全局状态</h3>
          <p>不是所有的状态都需要放进 Redux 或 Zustand。遵循以下原则：</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>局部状态</strong>：表单输入、弹窗开关 -&gt; 用 <code>useState</code></li>
            <li><strong>服务器状态</strong>：从 API 获取的数据 -&gt; 用 <code>React Query</code> 或 <code>SWR</code></li>
            <li><strong>全局状态</strong>：用户登录信息、主题配置 -&gt; 用 <code>Context</code> 或 <code>Zustand</code></li>
          </ul>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-brand-pink pl-4">3. 自定义 Hooks 提取逻辑</h3>
          <p>如果一个组件的代码超过了 200 行，通常意味着 UI 逻辑和业务逻辑混在了一起。将业务逻辑（如数据获取、复杂计算）提取到 <code>useUserAuth()</code> 这样的自定义 Hook 中，组件只负责渲染，代码会变得极其清爽且易于测试。</p>
          
          <h3 className="text-2xl font-black mt-8 mb-4 border-l-8 border-black pl-4">4. 性能优化：按需引入</h3>
          <p>不要过早优化，但要养成好习惯：使用 <code>React.lazy()</code> 配合路由实现代码分割；在渲染大型列表时使用虚拟滚动；在传递复杂对象时合理使用 <code>useMemo</code> 和 <code>useCallback</code>。</p>
          
          <p className="font-bold mt-8">可扩展性不是一蹴而就的，它需要团队保持纪律性，在每次代码提交时都坚守架构原则。好的架构应该像树一样，主干清晰，枝叶繁茂却不互相缠绕。</p>
        </>
      )
    },
  ];

  return (
    <div className="space-y-12 py-12">
      <h2 className="text-5xl font-black uppercase italic underline decoration-brand-blue decoration-8 underline-offset-8">我的文章</h2>
      <div className="grid gap-6">
        {articles.map((article, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ x: 10 }}
            onClick={() => setSelectedArticle(article)}
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

      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              onClick={e => e.stopPropagation()}
              className="bg-white border-4 border-black rounded-[32px] w-full max-w-4xl max-h-full overflow-y-auto shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative flex flex-col"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border-4 border-black rounded-full hover:bg-brand-pink transition-colors cursor-pointer bg-white z-10"
              >
                <X size={20} />
              </button>
              <div className="p-8 md:p-12 border-b-4 border-black bg-brand-yellow/20">
                <span className="bg-black text-white px-3 py-1 text-sm font-bold uppercase tracking-widest rounded-full">{selectedArticle.category}</span>
                <h2 className="text-3xl md:text-5xl font-black mt-6 mb-4">{selectedArticle.title}</h2>
                <div className="flex items-center gap-4 text-gray-600 font-bold">
                  <span>{selectedArticle.date}</span>
                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>
              <div className="p-8 md:p-12 prose prose-lg max-w-none font-medium text-gray-800 leading-relaxed space-y-6">
                {selectedArticle.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PaymentModal({ isOpen, onClose, product }: { isOpen: boolean; onClose: () => void, product: any }) {
  if (!isOpen || !product) return null;

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
        
        <div className="text-center mb-6">
          <div className="inline-block bg-brand-yellow px-4 py-1 border-2 border-black rounded-full text-sm font-bold mb-4">
            人工发货
          </div>
          <h3 className="text-2xl font-black mb-2">{product.title}</h3>
          <p className="text-4xl font-black text-brand-pink">{product.price}</p>
        </div>

        <div className="bg-gray-50 border-2 border-black rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 font-medium mb-3">由于个人网站限制，请通过以下方式完成购买：</p>
          <ol className="text-sm font-bold space-y-2 list-decimal list-inside ml-2">
            <li>添加下方微信</li>
            <li>转账相应金额并备注您的邮箱</li>
            <li>我会在 12 小时内将商品发送到您的邮箱</li>
          </ol>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border-2 border-black rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#07C160] rounded-lg flex items-center justify-center text-white">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-500">微信号</p>
                <p className="font-black">y777777ol</p>
              </div>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('y777777ol');
                alert('微信号已复制！');
              }}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-pink transition-colors cursor-pointer"
            >
              复制
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
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
                  onClick={() => setSelectedProduct(product)}
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

      <AnimatePresence>
        {selectedProduct && (
          <PaymentModal 
            isOpen={!!selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            product={selectedProduct} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function WorksSection() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  
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
                  const img = e.currentTarget;
                  img.classList.toggle('grayscale-0');
                  img.classList.toggle('grayscale');
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 pointer-events-none md:pointer-events-auto">
                <button 
                  onClick={(e) => { e.stopPropagation(); setLightboxImg(customImages[idx] ?? work.image); }}
                  className="bg-brand-yellow text-black w-14 h-14 rounded-full font-black flex items-center justify-center cursor-pointer pointer-events-auto hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1"
                  title="放大查看"
                >
                  <Maximize2 size={24} />
                </button>
                <label className="bg-white text-black px-6 py-3 rounded-full font-black flex items-center gap-2 cursor-pointer pointer-events-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
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

      <AnimatePresence>
        {lightboxImg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setLightboxImg(null)}>
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border-4 border-white text-white rounded-full hover:bg-brand-pink transition-colors cursor-pointer z-10"
            >
              <X size={24} />
            </button>
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={lightboxImg} 
              alt="Fullscreen" 
              className="max-w-full max-h-[90vh] object-contain border-4 border-white rounded-[32px] shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)]"
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}
      </AnimatePresence>
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

function SiteFooter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    // 使用免费的 countapi 或者简单的随机数+缓存机制模拟（因为纯前端无法跨用户统计，这里使用一个免费的 API）
    fetch('https://api.counterapi.dev/v1/shuo_portfolio/visits/up')
      .then(res => res.json())
      .then(data => setVisits(data.count))
      .catch(() => setVisits(1337)); // 接口失败时的后备数字
  }, []);

  return (
    <footer className="border-t-4 border-black py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="font-black text-2xl uppercase italic">王朔</h3>
          <p className="text-gray-600 mt-2">© 2026 王朔. 用心构建.</p>
          <div className="flex items-center gap-2 mt-4 text-sm font-bold text-gray-500 bg-gray-100 w-fit px-4 py-2 rounded-full border-2 border-gray-200">
            <Eye size={16} />
            <span>本站已被访问 {visits !== null ? visits : '...'} 次</span>
          </div>
        </div>
        <div className="flex gap-4">
          <SocialButton icon={Github} />
          <SocialButton icon={Twitter} />
          <SocialButton icon={Linkedin} />
        </div>
      </div>
    </footer>
  );
}

function SocialButton({ icon: Icon }: { icon: any }) {
  return (
    <button className="w-12 h-12 border-4 border-black rounded-xl flex items-center justify-center hover:bg-brand-yellow transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer">
      <Icon size={20} />
    </button>
  );
}

function GuestbookSection() {
  const [messages, setMessages] = useState<{id: number, name: string, content: string, created_at: string}[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      console.log('📡 API响应:', data);
      if (data.ok) {
        setMessages(data.data);
        setError('');
      } else if (data.fallback) {
        setMessages(data.fallback);
        setError(data.error ? `错误: ${data.error}` : '使用演示数据（需要配置云数据库）');
      } else {
        setError('加载留言失败，使用本地数据');
        setMessages([
          { id: 1, name: "设计同行", content: "喜欢这种粗野主义的风格，排版很大胆，学习了！", created_at: "2026-03-21" },
          { id: 2, name: "访客A", content: "网站设计得很酷，音乐也很好听~", created_at: "2026-03-22" }
        ]);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setError('网络错误，使用本地数据');
      setMessages([
        { id: 1, name: "设计同行", content: "喜欢这种粗野主义的风格，排版很大胆，学习了！", created_at: "2026-03-21" },
        { id: 2, name: "访客A", content: "网站设计得很酷，音乐也很好听~", created_at: "2026-03-22" }
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content }),
      });
      
      const data = await res.json();
      
      if (data.ok) {
        setMessages([data.data, ...messages]);
        setName('');
        setContent('');
      } else {
        setError(data.error || '提交失败，请重试');
      }
    } catch (err) {
      console.error('Failed to submit message:', err);
      setError('网络错误，请确保后端服务器正在运行');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-12">
      <h2 className="text-5xl font-black uppercase italic underline decoration-brand-yellow decoration-8 underline-offset-8">留言板</h2>
      
      <div className="bg-white border-4 border-black p-8 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-bold mb-2 text-lg">你的昵称</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-4 border-black rounded-xl p-4 font-bold focus:outline-none focus:border-brand-blue transition-colors"
              placeholder="怎么称呼你？"
              maxLength={20}
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-2 text-lg">留言内容</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-4 border-black rounded-xl p-4 font-bold h-32 resize-none focus:outline-none focus:border-brand-pink transition-colors"
              placeholder="说点什么吧..."
              maxLength={200}
              required
            />
          </div>
          {error && (
            <div className="p-4 bg-brand-pink text-white rounded-xl border-2 border-black font-bold">
              {error}
            </div>
          )}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-8 py-4 rounded-xl font-bold border-4 border-black hover:bg-brand-yellow hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageSquare size={20} />
            {isSubmitting ? '提交中...' : '发表留言'}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className="bg-gray-50 border-4 border-black p-6 md:p-8 rounded-[32px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-yellow/20 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-black text-xl flex items-center gap-2">
                <User size={20} className="text-brand-pink" />
                {msg.name}
              </span>
              <span className="text-sm font-bold text-gray-500 border-2 border-gray-200 px-3 py-1 rounded-full">{msg.created_at}</span>
            </div>
            <p className="font-medium text-gray-700 text-lg leading-relaxed">{msg.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolsSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [ffmpeg, setFfmpeg] = useState<any>(null);
  const [loadError, setLoadError] = useState(false);
  const [loadingStep, setLoadingStep] = useState('准备中...');

  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 2;
    
    const loadFfmpeg = async () => {
      try {
        setLoadingStep('正在导入FFmpeg库...');
        const { FFmpeg } = await import('@ffmpeg/ffmpeg');
        const { fetchFile, toBlobURL } = await import('@ffmpeg/util');
        const ffmpegInstance = new FFmpeg();
        
        ffmpegInstance.on('log', ({ message }: any) => {
          console.log('[FFmpeg]', message);
        });
        
        ffmpegInstance.on('progress', ({ progress: p }: any) => {
          if (isMounted) {
            setProgress(Math.round(p * 100));
          }
        });

        setLoadingStep('正在加载核心文件（这可能需要一些时间，请耐心等待）...');
        
        const cdns = [
          'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd',
          'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        ];

        let loaded = false;
        
        for (let attempt = 0; attempt <= maxRetries && !loaded; attempt++) {
          if (attempt > 0) {
            setLoadingStep(`重试加载中... (${attempt}/${maxRetries})`);
            await new Promise(r => setTimeout(r, 1000));
          }
          
          for (const baseURL of cdns) {
            try {
              console.log(`[Attempt ${attempt + 1}] Trying CDN:`, baseURL);
              await ffmpegInstance.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
              });
              loaded = true;
              console.log('FFmpeg loaded successfully!');
              break;
            } catch (cdnError) {
              console.log('CDN failed:', cdnError);
              continue;
            }
          }
        }

        if (!loaded) {
          throw new Error('所有CDN都无法加载');
        }
        
        if (isMounted) {
          setFfmpeg(ffmpegInstance);
          setFfmpegLoaded(true);
          setStatus('');
        }
      } catch (error) {
        console.error('Failed to load FFmpeg:', error);
        if (isMounted) {
          setLoadError(true);
          setStatus('加载转换引擎失败。可能是网络问题，请：\n1. 检查网络连接\n2. 刷新页面重试\n3. 使用Chrome/Edge浏览器\n4. 确保网络可以访问 cdn.jsdelivr.net');
        }
      }
    };

    loadFfmpeg();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.flac')) {
        setSelectedFile(file);
        setOutputUrl(null);
        setStatus('');
        setProgress(0);
      } else {
        setStatus('请选择FLAC格式的文件');
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.flac')) {
        setSelectedFile(file);
        setOutputUrl(null);
        setStatus('');
        setProgress(0);
      } else {
        setStatus('请选择FLAC格式的文件');
      }
    }
  };

  const handleConvert = async () => {
    if (!selectedFile || !ffmpeg) return;

    setIsConverting(true);
    setStatus('正在转换...');
    setProgress(0);

    try {
      const { fetchFile } = await import('@ffmpeg/util');
      
      await ffmpeg.writeFile('input.flac', await fetchFile(selectedFile));
      
      await ffmpeg.exec(['-i', 'input.flac', '-codec:a', 'libmp3lame', '-q:a', '2', 'output.mp3']);
      
      const data = await ffmpeg.readFile('output.mp3');
      const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));
      
      setOutputUrl(url);
      setStatus('转换成功！');
    } catch (error) {
      console.error('Conversion failed:', error);
      setStatus('转换失败，请重试');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl || !selectedFile) return;
    
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = selectedFile.name.replace('.flac', '.mp3');
    a.click();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOutputUrl(null);
    setStatus('');
    setProgress(0);
  };

  return (
    <div className="space-y-12 py-12">
      <h2 className="text-5xl font-black uppercase italic underline decoration-brand-blue decoration-8 underline-offset-8">音频转换工具</h2>
      
      <div className="bg-white border-4 border-black p-8 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black mb-4">FLAC 转 MP3</h3>
            <p className="text-gray-600">免费、快速的音频格式转换工具，完全在您的浏览器中运行，数据不上传服务器</p>
          </div>

          {!ffmpegLoaded && !loadError && (
            <div className="text-center py-12 space-y-4">
              <RefreshCw size={48} className="mx-auto animate-spin text-brand-pink" />
              <p className="text-xl font-bold">{loadingStep}</p>
              <p className="text-gray-500 text-sm">
                首次加载需要下载约25MB的转换引擎文件，请耐心等待...
              </p>
              <div className="w-full max-w-md mx-auto">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
                  <motion.div
                    className="h-full bg-brand-pink"
                    animate={{
                      x: ['0%', '75%', '0%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ width: '25%' }}
                  />
                </div>
              </div>
            </div>
          )}

          {loadError && (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 bg-brand-pink rounded-full border-4 border-black flex items-center justify-center mx-auto">
                <X size={32} className="text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-bold">加载失败</p>
                <p className="text-gray-600 whitespace-pre-line">{status}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-black text-white px-8 py-4 rounded-xl font-bold border-4 border-black hover:bg-brand-blue transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                刷新重试
              </button>
            </div>
          )}

          {ffmpegLoaded && !selectedFile && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-4 border-dashed border-black rounded-2xl p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="file"
                accept=".flac"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload size={64} className="mx-auto mb-4 text-brand-pink" />
                <p className="text-xl font-bold mb-2">点击或拖拽上传FLAC文件</p>
                <p className="text-gray-500">支持FLAC格式，最大50MB</p>
              </label>
            </div>
          )}

          {selectedFile && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-gray-50 border-2 border-black rounded-xl">
                <div className="flex items-center gap-4">
                  <FileAudio size={40} className="text-brand-blue" />
                  <div>
                    <p className="font-black text-lg">{selectedFile.name}</p>
                    <p className="text-gray-500 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="bg-white border-2 border-black p-2 rounded-lg hover:bg-brand-pink hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {isConverting && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">转换进度</span>
                    <span className="font-black text-brand-pink">{progress}%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-pink"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {status && (
                <div className={`p-4 rounded-xl border-2 border-black font-bold ${
                  status.includes('成功') ? 'bg-brand-yellow' : 
                  status.includes('失败') || status.includes('请选择') ? 'bg-brand-pink text-white' : 'bg-gray-100'
                }`}>
                  {status}
                </div>
              )}

              <div className="flex gap-4">
                {!outputUrl && (
                  <button
                    onClick={handleConvert}
                    disabled={isConverting}
                    className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-bold border-4 border-black hover:bg-brand-blue transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isConverting ? (
                      <>
                        <RefreshCw size={20} className="animate-spin" />
                        转换中...
                      </>
                    ) : (
                      <>
                        <RefreshCw size={20} />
                        开始转换
                      </>
                    )}
                  </button>
                )}

                {outputUrl && (
                  <>
                    <button
                      onClick={handleDownload}
                      className="flex-1 bg-brand-yellow text-black px-8 py-4 rounded-xl font-bold border-4 border-black hover:bg-brand-blue hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      下载MP3
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-8 py-4 rounded-xl font-bold border-4 border-black bg-white hover:bg-gray-100 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
                    >
                      再转一个
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="pt-8 border-t-2 border-dashed border-gray-200">
            <h4 className="font-black text-lg mb-4">使用说明</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>选择或拖拽FLAC音频文件到上传区域</li>
              <li>点击"开始转换"按钮</li>
              <li>等待转换完成（大文件可能需要一些时间）</li>
              <li>点击"下载MP3"按钮获取转换后的文件</li>
            </ol>
            <p className="mt-4 text-sm text-gray-500">
              ⚠️ 所有转换都在您的浏览器本地完成，文件不会上传到任何服务器，请放心使用
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
