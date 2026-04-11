import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export const Zine = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setVisibleCount(6); // Reset pagination on search change
  }, [searchParams]);

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasMore = visibleCount < filteredPosts.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="bg-black min-h-screen">
      <header className="py-[8rem] px-[1.5em] md:px-[5em] border-b-[0.3125rem] border-pink">
        <h1 className="text-[4.8rem] md:text-[7.2rem] leading-none text-cream whitespace-nowrap">THE ZINE</h1>
        <p className="text-lime text-[1rem] mt-[1rem]">// culture. campaigns. campus. chaos.</p>
        
        <div className="mt-[3rem] flex flex-col md:flex-row gap-[1.5rem] items-start md:items-center">
          <div className="relative w-full md:w-[25rem]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black z-10" size={20} />
            <input 
              type="text"
              placeholder="SEARCH THE ZINE..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-cream text-black pl-12 pr-12 py-3 brutal-border brutal-shadow-pink font-zine focus:outline-none focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-pink transition-colors z-10"
              >
                <X size={20} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-[1rem]">
            {['LATEST DROPS', 'CAMPAIGN STORIES', 'CULTURE HITS', 'BRAND BREAKDOWNS'].map((tag, i) => (
              <button 
                key={i} 
                onClick={() => {
                  const query = tag.split(' ')[0].toLowerCase();
                  setSearchQuery(query);
                  setSearchParams({ search: query });
                }}
                className="bg-lime text-black px-[1rem] py-[0.5rem] font-zine brutal-border brutal-shadow hover:bg-black hover:text-lime transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="p-[1.5em] md:p-[5em] grid grid-cols-1 md:grid-cols-3 gap-[2.5rem]">
        {filteredPosts.length > 0 ? (
          filteredPosts.slice(0, visibleCount).map((post, i) => {
            const isBig = i === 0 && searchQuery === '';
            const colors = ['bg-pink', 'bg-lime', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400', 'bg-orange-500'];
            const cardColor = colors[i % colors.length];
            
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`brutal-card group cursor-pointer overflow-hidden flex flex-col border-black border-[0.25rem] ${cardColor} ${isBig ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <Link to={`/zine/${post.slug}`} className="flex flex-col h-full">
                  <div className={`${isBig ? 'h-[25rem]' : 'h-[15.625rem]'} overflow-hidden relative border-b-[0.25rem] border-black`}>
                    <img src={post.heroImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" referrerPolicy="no-referrer" loading="lazy" />
                    <div className="absolute top-[1rem] left-[1rem] bg-black text-white px-[0.75rem] py-[0.25rem] text-[0.75rem] font-bold brutal-border">
                      [{post.category}]
                    </div>
                  </div>
                  <div className="p-[2em] flex-1 flex flex-col justify-between text-black">
                    <div>
                      <h2 className={`${isBig ? 'text-[2rem]' : 'text-[1.25rem]'} mb-[1rem] group-hover:translate-x-[0.5rem] transition-transform font-display uppercase leading-tight`}>{post.title}</h2>
                      <p className="text-black/80 font-body text-[0.75rem] line-clamp-3 font-medium">{post.excerpt}</p>
                    </div>
                    <div className="mt-[1.5rem] flex justify-between items-center text-[0.7rem] font-bold border-t-[0.125rem] border-black/20 pt-[1rem]">
                      <span>BY {post.author.toUpperCase()}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <div className="md:col-span-3 py-[10rem] text-center">
            <h2 className="text-[3rem] md:text-[5rem] font-display text-pink italic">NO RESULTS FOUND.</h2>
            <p className="text-cream font-body mt-4 tracking-widest uppercase">TRY SEARCHING FOR SOMETHING ELSE.</p>
          </div>
        )}

        <div className="md:col-span-3 py-[5rem] flex justify-center">
          <div className="text-[3rem] md:text-[5rem] font-display text-pink -rotate-2 border-y-[0.3125rem] border-pink py-[1rem] w-full text-center">
            "NO CAP. JUST IMPACT."
          </div>
        </div>
      </main>

      {hasMore && (
        <div className="px-[1.5em] md:px-[5em] pb-[5rem]">
          <button 
            onClick={loadMore}
            className="w-full py-[2.5rem] bg-cream text-black text-[3rem] font-display brutal-border brutal-shadow hover:bg-lime transition-colors"
          >
            LOAD MORE ↓
          </button>
        </div>
      )}
    </div>
  );
};


