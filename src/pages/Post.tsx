import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BLOG_POSTS } from '../constants';

export const Post = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-[4rem] font-display mb-8">POST NOT FOUND</h1>
        <Link to="/zine" className="text-lime hover:text-pink transition-colors font-zine text-[1.5rem]">← BACK TO THE ZINE</Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="h-[70vh] relative overflow-hidden">
        <img src={post.heroImage} className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-[2.5rem] left-[2.5rem] bg-lime text-black px-[1rem] py-[0.5rem] font-zine brutal-border">
          [{post.category}]
        </div>
        <div className="absolute bottom-[2.5rem] left-[2.5rem] right-[2.5rem]">
          <h1 className="text-[2.7rem] md:text-[4.8rem] leading-none max-w-[60rem] text-white">{post.title}</h1>
          <div className="mt-[2rem] flex justify-between items-end border-t border-cream/20 pt-[1rem]">
            <div className="font-body text-cream/60">BY {post.author} // {post.date}</div>
            <div className="text-[4.8rem] font-display opacity-5 absolute -bottom-[2.5rem] right-0 text-white">{post.category}</div>
          </div>
        </div>
      </div>

      <article className="max-w-[60rem] mx-auto py-[5rem] px-[1.5em] font-body text-cream/90 leading-relaxed">
        <div className="text-[1.5rem] mb-[3rem] first-letter:text-[5rem] first-letter:font-display first-letter:text-pink first-letter:float-left first-letter:mr-[1rem] first-letter:mt-[0.5rem]">
          {post.excerpt}
        </div>
        
        <div className="markdown-body prose prose-invert prose-xl max-w-none 
            prose-headings:font-display prose-headings:uppercase prose-headings:text-pink
            prose-h2:text-[3.75rem] prose-h2:border-b-[0.125rem] prose-h2:border-lime prose-h2:pb-[0.5rem]
            prose-h3:text-[2.25rem]
            prose-blockquote:font-display prose-blockquote:text-[3rem] prose-blockquote:text-cream prose-blockquote:border-none prose-blockquote:rotate-[-1deg] prose-blockquote:my-[5rem] prose-blockquote:text-center
            prose-li:list-disc prose-li:marker:text-lime">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="mt-[5rem] flex flex-wrap gap-[1rem]">
          {post.tags.map(tag => (
            <span key={tag} className="bg-cream text-black px-[0.75rem] py-[0.25rem] text-[0.75rem] font-bold brutal-border">#{tag}</span>
          ))}
        </div>
      </article>

      <div className="border-y-[0.3125rem] border-pink py-[3rem] flex justify-center bg-cream">
        <Link 
          to="/zine"
          className="text-[3.75rem] font-display text-black hover:text-pink transition-colors"
        >
          ← BACK TO THE ZINE
        </Link>
      </div>
    </div>
  );
};
