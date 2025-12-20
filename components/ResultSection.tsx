import React, { useState } from 'react';
import { GeneratedContent } from '../types';

interface ResultSectionProps {
  results: GeneratedContent;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<'short' | 'long'>('short');
  const [selectedCover, setSelectedCover] = useState<string | null>(results.covers[0] || null);

  const downloadImage = (base64Data: string, index: number) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = `amocover-ai-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Caption disalin!");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Clickbait Title Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-xl transform hover:scale-[1.01] transition-transform">
        <div className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-2">🔥 Judul Clickbait Rekomendasi</div>
        <h2 className="text-3xl font-bold leading-tight">{results.text.clickbait}</h2>
      </div>

      {/* Covers Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>🎨 Rekomendasi Cover</span>
          <span className="text-xs font-normal px-2 py-1 bg-blue-100 text-blue-700 rounded-full">2:3 Aspect Ratio (Fit)</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.covers.map((cover, index) => (
            <div 
              key={index} 
              className={`group relative rounded-xl overflow-hidden cursor-pointer shadow-md aspect-[2/3] transition-all duration-300 ${selectedCover === cover ? 'ring-4 ring-blue-500 scale-[1.02]' : 'hover:shadow-xl'}`}
              onClick={() => setSelectedCover(cover)}
            >
              <img 
                src={cover} 
                alt={`Cover ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <button 
                  onClick={(e) => { e.stopPropagation(); downloadImage(cover, index); }}
                  className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50"
                  title="Download"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing Text Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('short')}
            className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'short' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Caption Pendek (100 Kata)
          </button>
          <button 
            onClick={() => setActiveTab('long')}
            className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'long' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Caption Panjang (500 Kata)
          </button>
        </div>
        
        <div className="p-6 relative">
           <div className="absolute top-4 right-4">
             <button 
              onClick={() => copyToClipboard(activeTab === 'short' ? results.text.short_caption : results.text.long_caption)}
              className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
               Copy
             </button>
           </div>
           
           <div className="prose prose-slate max-w-none">
             <div className="whitespace-pre-wrap leading-relaxed text-slate-700">
               {activeTab === 'short' ? results.text.short_caption : results.text.long_caption}
             </div>
           </div>
           
           <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Includes: Hook Opening • Cliffhanger Ending • CTA</span>
           </div>
        </div>
      </div>

    </div>
  );
};