import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Eye,
  Bookmark,
  Share2,
  Check,
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Send,
  ThumbsUp,
  Volume2,
  Vote,
  Terminal,
  Quote,
  Flame,
  Radio
} from 'lucide-react';
import { Article, Comment } from '../types/blog';

interface TechArticleViewProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const TechArticleView: React.FC<TechArticleViewProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState<'1x' | '1.25x' | '1.5x' | '2x'>('1x');

  // Reader Claps
  const [claps, setClaps] = useState<number>(() => {
    const saved = localStorage.getItem(`radix-claps-${article.id}`);
    return saved ? parseInt(saved, 10) : article.initialClaps;
  });
  const [hasClapped, setHasClapped] = useState(false);
  const [clapAnim, setClapAnim] = useState(false);

  // Poll state
  const [pollVoted, setPollVoted] = useState<string | null>(() => {
    return localStorage.getItem(`radix-poll-${article.id}`);
  });
  const [pollVotes, setPollVotes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    article.poll?.options.forEach((opt) => {
      initial[opt.id] = opt.votes;
    });
    return initial;
  });

  // Comments state
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(`radix-comments-${article.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      {
        id: 'c1',
        articleId: article.id,
        author: 'Elena Markov',
        role: 'Quantum Hardware Architect',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        text: 'The breakthrough on thermal dissipation attenuation matches our independent silicon-on-sapphire benchmarks. Critical validation for real-time edge decoding.',
        timestamp: '2 hours ago',
        likes: 19
      },
      {
        id: 'c2',
        articleId: article.id,
        author: 'Marcus Vance',
        role: 'Staff Bio-physicist, DeepMind Health',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        text: 'Remarkable synthesis. The Geneva Neurorights Protocol compliance hardware key is perhaps the most critical civil liberty breakthrough in this stack.',
        timestamp: 'Yesterday',
        likes: 11
      }
    ];
  });

  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Scroll to top and title sync
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const original = document.title;
    document.title = `${article.title} — RADIX`;
    return () => {
      document.title = original;
    };
  }, [article.id]);

  // Audio timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Scroll Progress and active heading observer
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total > 0) {
        setScrollProgress((doc.scrollTop / total) * 100);
      }

      // Check headings
      const headingElements = article.sections.map((s) => document.getElementById(s.id));
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveHeading(article.sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.sections]);

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClap = () => {
    const next = claps + 1;
    setClaps(next);
    setHasClapped(true);
    setClapAnim(true);
    setTimeout(() => setClapAnim(false), 600);
    localStorage.setItem(`radix-claps-${article.id}`, next.toString());
  };

  const handleVote = (optionId: string) => {
    if (pollVoted) return;
    const nextVotes = { ...pollVotes, [optionId]: (pollVotes[optionId] || 0) + 1 };
    setPollVotes(nextVotes);
    setPollVoted(optionId);
    localStorage.setItem(`radix-poll-${article.id}`, optionId);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commentName.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      articleId: article.id,
      author: commentName.trim(),
      role: commentRole.trim() || 'Independent Researcher',
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(commentName)}`,
      text: commentText.trim(),
      timestamp: 'Just now',
      likes: 1
    };

    const next = [newComment, ...comments];
    setComments(next);
    localStorage.setItem(`radix-comments-${article.id}`, JSON.stringify(next));
    setCommentName('');
    setCommentRole('');
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  const related = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  const totalPollVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0B0E] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
      />

      {/* Sticky Reader Sub-Header */}
      <div className="sticky top-16 z-30 w-full bg-white/90 dark:bg-[#0A0B0E]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>DISPATCHES</span>
          </button>

          <span className="hidden md:inline font-sans font-medium text-slate-500 dark:text-slate-400 truncate max-w-sm">
            {article.title}
          </span>

          <div className="flex items-center gap-2">
            {/* Audio narration toggle button */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlayingAudio ? 'Playing Audio' : 'Audio Brief'}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-400 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Audio Narrator Player Bar */}
      {isPlayingAudio && (
        <div className="sticky top-28 z-20 w-full bg-slate-900 text-white border-b border-cyan-500/40 p-3 shadow-xl">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(false)}
                className="w-8 h-8 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <Pause className="w-4 h-4" />
              </button>
              <div>
                <p className="font-sans font-bold text-white text-xs truncate max-w-xs sm:max-w-md">
                  Audio Briefing: {article.title}
                </p>
                <p className="text-[11px] text-cyan-400">Narrated by RADIX AI Synthesis Agent</p>
              </div>
            </div>

            {/* Simulated Audio Waveform */}
            <div className="hidden sm:flex items-center gap-1 h-6">
              {[40, 75, 90, 60, 30, 85, 95, 50, 70, 45, 80, 65].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-cyan-400 rounded-full animate-pulse"
                  style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>

            {/* Speed toggle */}
            <button
              onClick={() => {
                const speeds: ('1x' | '1.25x' | '1.5x' | '2x')[] = ['1x', '1.25x', '1.5x', '2x'];
                const nextIdx = (speeds.indexOf(audioSpeed) + 1) % speeds.length;
                setAudioSpeed(speeds[nextIdx]);
              }}
              className="px-2 py-1 rounded bg-slate-800 border border-slate-700 hover:border-cyan-400 text-cyan-300 cursor-pointer"
            >
              {audioSpeed}
            </button>
          </div>
        </div>
      )}

      {/* Main Container with 2-Column Desktop Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Table of Contents & Quick Actions (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-6">
              {/* Table of Contents */}
              <div className="p-4 bg-white dark:bg-[#10121A] rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                  <span>SECTIONS</span>
                </div>
                <nav className="space-y-1">
                  {article.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                        activeHeading === item.id
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 font-bold border-l-2 border-cyan-400'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Reader Reaction Pill */}
              <div className="p-4 bg-white dark:bg-[#10121A] rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono uppercase text-slate-500 font-semibold block">
                  Peer Endorsement
                </span>
                <button
                  onClick={handleClap}
                  className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    hasClapped
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${hasClapped ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{claps} Claps</span>
                  {clapAnim && (
                    <span className="absolute -top-3 text-cyan-400 font-mono text-xs animate-bounce">
                      +1
                    </span>
                  )}
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main Article Body (9 Cols) */}
          <main className="lg:col-span-9 max-w-3xl">
            {/* Header */}
            <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 dark:text-slate-400">{article.date}</span>
                <span className="text-slate-400">·</span>
                <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime} min read
                </span>
              </div>

              <h1
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                {article.title}
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                {article.subtitle}
              </p>

              {/* Author bar */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm font-sans">
                      {article.author.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {article.author.role} · {article.author.org}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-right font-mono text-xs text-slate-400">
                  <div>{article.views} READS</div>
                  <div className="text-cyan-500 font-semibold">PEER VERIFIED</div>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-md">
              <img
                src={article.coverImage}
                alt={article.coverImageAlt}
                className="w-full h-auto max-h-[500px] object-cover"
              />
              <div className="p-3 bg-white/95 dark:bg-[#10121A] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{article.coverImageAlt}</span>
                <span className="text-cyan-500 font-bold uppercase">DISPATCH PLATE</span>
              </div>
            </div>

            {/* Key Takeaways / Executive Brief */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-blue-900/10 via-slate-900/40 to-cyan-900/10 border border-blue-500/30">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>EXECUTIVE RESEARCH TAKEAWAYS</span>
                </div>
                <ul className="space-y-3 font-sans text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono font-bold text-cyan-400 text-xs mt-0.5">▸</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Sections */}
            <div className="space-y-10 font-sans text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="space-y-5 pt-4">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white pt-2 border-b border-slate-200/60 dark:border-slate-800/60 pb-2">
                    {section.heading}
                  </h2>

                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {/* Section Callout Card */}
                  {section.callout && (
                    <div className="my-6 p-5 rounded-xl bg-white dark:bg-[#12141F] border-l-4 border-cyan-400 border-y border-r border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                      {section.callout.type === 'quote' && (
                        <div className="flex items-start gap-3">
                          <Quote className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
                          <div>
                            <p className="font-sans font-medium text-slate-900 dark:text-white italic text-base sm:text-lg">
                              "{section.callout.body}"
                            </p>
                            {section.callout.meta && (
                              <p className="text-xs font-mono text-cyan-500 mt-1">
                                — {section.callout.meta}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {section.callout.type === 'stat' && (
                        <div className="space-y-1">
                          <span className="font-display text-2xl font-extrabold text-blue-600 dark:text-cyan-400 block">
                            {section.callout.title}
                          </span>
                          <p className="text-sm font-sans text-slate-600 dark:text-slate-300">
                            {section.callout.body}
                          </p>
                          {section.callout.meta && (
                            <span className="text-[11px] font-mono text-slate-400 block pt-1">
                              Source: {section.callout.meta}
                            </span>
                          )}
                        </div>
                      )}

                      {section.callout.type === 'code' && (
                        <div className="space-y-1 font-mono text-xs">
                          <span className="text-cyan-400 font-bold block">{section.callout.title}</span>
                          <div className="p-3 rounded-lg bg-black text-emerald-400 overflow-x-auto">
                            <code>{section.callout.body}</code>
                          </div>
                          {section.callout.meta && (
                            <span className="text-[10px] text-slate-500 block">{section.callout.meta}</span>
                          )}
                        </div>
                      )}

                      {section.callout.type === 'insight' && (
                        <div className="space-y-1">
                          <span className="font-mono text-xs font-bold text-amber-500 block uppercase">
                            {section.callout.title}
                          </span>
                          <p className="text-sm font-sans text-slate-700 dark:text-slate-200">
                            {section.callout.body}
                          </p>
                          {section.callout.meta && (
                            <span className="text-[11px] font-mono text-slate-400 block">
                              {section.callout.meta}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Interactive Reader Poll */}
            {article.poll && (
              <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#10121A] border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                  <Vote className="w-4 h-4" />
                  <span>READER SURVEY & DELPHI BENCHMARK</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {article.poll.question}
                </h3>

                <div className="space-y-2.5">
                  {article.poll.options.map((opt) => {
                    const currentOptVotes = pollVotes[opt.id] || opt.votes;
                    const percent = totalPollVotes > 0 ? Math.round((currentOptVotes / totalPollVotes) * 100) : 0;
                    const isSelected = pollVoted === opt.id;

                    return (
                      <button
                        key={opt.id}
                        disabled={!!pollVoted}
                        onClick={() => handleVote(opt.id)}
                        className={`w-full relative text-left p-3.5 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                          isSelected
                            ? 'border-cyan-400 bg-blue-950/40 font-bold'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-slate-400'
                        }`}
                      >
                        {/* Vote percentage bar fill */}
                        {pollVoted && (
                          <div
                            className="absolute inset-y-0 left-0 bg-blue-600/20 dark:bg-cyan-500/20 transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        )}

                        <div className="relative flex items-center justify-between text-xs sm:text-sm">
                          <span className="font-sans text-slate-800 dark:text-slate-200">
                            {opt.label}
                          </span>
                          {pollVoted && (
                            <span className="font-mono font-bold text-cyan-400 shrink-0 ml-2">
                              {percent}% ({currentOptVotes})
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1">
                  <span>{totalPollVotes} Verified Scholar Votes</span>
                  {pollVoted && <span className="text-emerald-400">Vote Recorded</span>}
                </div>
              </div>
            )}

            {/* Discussion & Peer Comments */}
            <section className="mt-14 space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-500" />
                  <span>Peer Discussion ({comments.length})</span>
                </h3>
              </div>

              {/* Submit Comment Form */}
              <form
                onSubmit={handleAddComment}
                className="p-5 bg-white dark:bg-[#10121A] rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
              >
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Publish a Scientific Critique or Replication Note
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Scholar / Engineer Name"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans"
                  />
                  <input
                    type="text"
                    value={commentRole}
                    onChange={(e) => setCommentRole(e.target.value)}
                    placeholder="Institution / Lab / Role"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Contribute your observation, empirical rebuttal, or methodology note..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none font-sans"
                />
                <div className="flex items-center justify-between pt-1">
                  {commentSubmitted ? (
                    <span className="text-xs font-mono text-emerald-400">
                      Critique published to the immutable thread.
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-400">
                      Indexed under Open Research Commons.
                    </span>
                  )}
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Note</span>
                  </button>
                </div>
              </form>

              {/* Comments Stream */}
              <div className="space-y-4">
                {comments.map((comm) => (
                  <div
                    key={comm.id}
                    className="p-5 bg-white dark:bg-[#10121A] rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={comm.avatar}
                          alt={comm.author}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-xs text-slate-900 dark:text-white font-sans">
                            {comm.author}
                          </p>
                          <p className="text-[10px] font-mono text-slate-500">
                            {comm.role}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">{comm.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {comm.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Prev / Next Dispatches */}
            <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <button
                  onClick={() => onSelectArticle(prevArticle)}
                  className="p-5 text-left bg-white dark:bg-[#10121A] rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mb-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform text-cyan-400" />
                    <span>PREVIOUS DISPATCH</span>
                  </div>
                  <p className="font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {prevArticle.title}
                  </p>
                </button>
              ) : (
                <div />
              )}

              {nextArticle && (
                <button
                  onClick={() => onSelectArticle(nextArticle)}
                  className="p-5 text-right sm:text-right bg-white dark:bg-[#10121A] rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-end gap-1 text-[11px] font-mono text-slate-400 mb-1">
                    <span>NEXT DISPATCH</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-cyan-400" />
                  </div>
                  <p className="font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {nextArticle.title}
                  </p>
                </button>
              )}
            </div>

            {/* Related Research */}
            <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">
                Connected Investigations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="p-4 bg-white dark:bg-[#10121A] rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-colors cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                        {rel.category}
                      </span>
                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white line-clamp-2 mt-1">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{rel.readTime}m read</span>
                      <span className="text-cyan-400">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
