import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES, CATEGORIES } from './data/articles';
import { Article } from './types/blog';
import { TechNavbar } from './components/TechNavbar';
import { BreakingTicker } from './components/BreakingTicker';
import { BentoHero } from './components/BentoHero';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { TechArticleCard } from './components/TechArticleCard';
import { TechArticleView } from './components/TechArticleView';
import { SavedQueueDrawer } from './components/SavedQueueDrawer';
import { SearchModal } from './components/SearchModal';
import { ManifestoModal } from './components/ManifestoModal';
import { TechFooter } from './components/TechFooter';

export default function App() {
  // Dark mode state (defaults to true for dark mode modern tech vibe)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('radix-theme');
      if (stored) return stored === 'dark';
      return true; // Default to dark mode for RADIX
    } catch {
      return true;
    }
  });

  // Active article state from URL hash
  const [activeArticle, setActiveArticle] = useState<Article | null>(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('article-')) {
        const id = hash.replace('article-', '');
        return ARTICLES.find((a) => a.id === id) || null;
      }
    } catch {}
    return null;
  });

  // Saved articles
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('radix-bookmarks');
      return stored ? JSON.parse(stored) : ['optical-neural-mesh', 'cryogenic-quantum-qubits'];
    } catch {
      return ['optical-neural-mesh'];
    }
  });

  // Category and sorting
  const [selectedCategory, setSelectedCategory] = useState<string>('All Dispatches');
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'deep'>('popular');

  // Modals & drawers
  const [isSavedQueueOpen, setIsSavedQueueOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  // Sync dark mode class
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('radix-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('radix-theme', 'light');
      }
    } catch {}
  }, [darkMode]);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('radix-bookmarks', JSON.stringify(bookmarkedIds));
    } catch {}
  }, [bookmarkedIds]);

  // Hash change listener (browser back/forward support)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('article-')) {
        const id = hash.replace('article-', '');
        const found = ARTICLES.find((a) => a.id === id);
        if (found) setActiveArticle(found);
      } else if (!hash) {
        setActiveArticle(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSelectArticle = (article: Article) => {
    setActiveArticle(article);
    window.location.hash = `article-${article.id}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateHome = () => {
    setActiveArticle(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
  };

  const featuredArticle = useMemo(() => {
    return ARTICLES.find((a) => a.featured) || ARTICLES[0];
  }, []);

  const trendingArticles = useMemo(() => {
    return ARTICLES.filter((a) => a.trending);
  }, []);

  const filteredArticles = useMemo(() => {
    let result = [...ARTICLES];

    if (selectedCategory !== 'All Dispatches') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    if (sortBy === 'popular') {
      result.sort((a, b) => b.initialClaps - a.initialClaps);
    } else if (sortBy === 'latest') {
      // Keep order
    } else if (sortBy === 'deep') {
      result.sort((a, b) => b.readTime - a.readTime);
    }

    return result;
  }, [selectedCategory, sortBy]);

  const savedArticles = useMemo(() => {
    return ARTICLES.filter((a) => bookmarkedIds.includes(a.id));
  }, [bookmarkedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0A0B0E] text-slate-900 dark:text-slate-100 transition-colors font-sans">
      {/* Top Navbar */}
      <TechNavbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsSavedQueueOpen(true)}
        onNavigateHome={handleNavigateHome}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenManifesto={() => setIsManifestoOpen(true)}
        activeView={activeArticle ? 'article' : 'home'}
      />

      {/* Breaking Radar Ticker */}
      <BreakingTicker />

      {/* Main View Router */}
      {activeArticle ? (
        <TechArticleView
          article={activeArticle}
          allArticles={ARTICLES}
          onBack={handleNavigateHome}
          onSelectArticle={handleSelectArticle}
          isBookmarked={bookmarkedIds.includes(activeArticle.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      ) : (
        <main className="flex-1">
          {/* Magazine Bento Cover Section */}
          <BentoHero
            featuredArticle={featuredArticle}
            trendingArticles={trendingArticles}
            onReadArticle={handleSelectArticle}
            isBookmarked={(id) => bookmarkedIds.includes(id)}
            onToggleBookmark={handleToggleBookmark}
          />

          {/* Research Domains Filter and Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <CategoryFilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalCount={filteredArticles.length}
            />

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
              {filteredArticles.map((article) => (
                <TechArticleCard
                  key={article.id}
                  article={article}
                  onReadArticle={handleSelectArticle}
                  isBookmarked={bookmarkedIds.includes(article.id)}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Saved Articles Drawer */}
      <SavedQueueDrawer
        isOpen={isSavedQueueOpen}
        onClose={() => setIsSavedQueueOpen(false)}
        savedArticles={savedArticles}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearBookmarks}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />

      {/* Manifesto Charter Modal */}
      <ManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

      {/* Footer */}
      <TechFooter
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveArticle(null);
        }}
        onOpenManifesto={() => setIsManifestoOpen(true)}
      />
    </div>
  );
}
