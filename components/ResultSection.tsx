import React, { useState } from 'react';
import { GeneratedContent } from '../types';

interface ResultSectionProps {
  results: GeneratedContent;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ results }) => {
  type TabType = 'promo130' | 'promo250' | 'short' | 'long';
  const [activeTab, setActiveTab] = useState<TabType>('promo130');
  const [selectedCover, setSelectedCover] = useState<string | null>(results.covers[0] || null);

  const downloadImage = (base64Data: string, index: number) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = `asisten-promo-ai-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Teks disalin!");
  };

  const getActiveText = () => {
    switch (activeTab) {
      case 'promo130': return results.text.promo_130;
      case 'promo250': return results.text.promo_250;
      case 'short': return results.text.short_caption;
      case 'long': return results.text.long_caption;
      default: return '';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Clickbait Title Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-xl">
        <div className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
          🔥 5 Rekomendasi Judul Clickbait (Viral)
        </div>
        <div className="space-y-3">
          {results.text.clickbait.map((title, idx) => (
             <div key={idx} className="flex items-start gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors cursor-pointer group" onClick={() => copyToClipboard(title)}>
               <span className="bg-white/20 w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{idx + 1}</span>
               <h2 className="text-lg font-bold leading-tight">{title}</h2>
               <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-white text-blue-600 px-2 py-1 rounded">Copy</button>
             </div>
          ))}
        </div>
      </div>

      {/* Covers Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>🎨 Pilihan Visual Cover</span>
          <span className="text-xs font-normal px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Fit for Wattpad/KBM/IG</span>
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
                  className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 shadow-lg"
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
        <div className="flex flex-wrap border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('promo130')}
            className={`flex-1 min-w-[120px] py-4 text-xs font-bold text-center transition-colors ${activeTab === 'promo130' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            PROMO VIRAL (130)
          </button>
          <button 
            onClick={() => setActiveTab('promo250')}
            className={`flex-1 min-w-[120px] py-4 text-xs font-bold text-center transition-colors ${activeTab === 'promo250' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            PROMO PERSUASIF (250)
          </button>
          <button 
            onClick={() => setActiveTab('short')}
            className={`flex-1 min-w-[120px] py-4 text-xs font-medium text-center transition-colors ${activeTab === 'short' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            CAPTION (100)
          </button>
          <button 
            onClick={() => setActiveTab('long')}
            className={`flex-1 min-w-[120px] py-4 text-xs font-medium text-center transition-colors ${activeTab === 'long' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            NARASI (500)
          </button>
        </div>
        
        <div className="p-6 relative min-h-[300px]">
           <div className="absolute top-4 right-4 z-10">
             <button 
              onClick={() => copyToClipboard(getActiveText())}
              className="px-3 py-1.5 bg-blue-50 rounded-lg text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold border border-blue-100 shadow-sm"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
               SALIN TEKS
             </button>
           </div>
           
           <div className="prose prose-slate max-w-none">
             <div className="whitespace-pre-wrap leading-relaxed text-slate-700 pt-8">
               {getActiveText()}
             </div>
           </div>
           
           <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
              <span>🚀 No Spoiler • Viral Style • High Conversion</span>
              <span>Generated by Asisten Promo AI</span>
           </div>
        </div>
      </div>

    </div>
  );
};