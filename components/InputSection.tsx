import React from 'react';
import { BookData, BOOK_STYLES } from '../types';

interface InputSectionProps {
  data: BookData;
  onChange: (field: keyof BookData, value: string) => void;
  disabled: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ data, onChange, disabled }) => {
  return (
    <div className="space-y-6">
      
      {/* Text Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Judul Cerita</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Contoh: Sang Penari Langit"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nama Penulis</label>
          <input
            type="text"
            value={data.author}
            onChange={(e) => onChange('author', e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Nama Anda"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sinopsis</label>
          <textarea
            value={data.synopsis}
            onChange={(e) => onChange('synopsis', e.target.value)}
            disabled={disabled}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            placeholder="Ceritakan ringkasan cerita Anda..."
          />
        </div>
      </div>

      {/* Style Selector */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Pilih Visual Style</label>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {BOOK_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => onChange('style', style.label)}
              disabled={disabled}
              className={`
                relative p-3 rounded-xl text-left transition-all border-2 h-full flex flex-col justify-between
                ${data.style === style.label 
                  ? 'border-blue-600 bg-blue-50 shadow-md ring-1 ring-blue-600' 
                  : 'border-slate-100 bg-white hover:border-blue-300 hover:shadow-sm'
                }
              `}
            >
              <div className={`text-sm font-bold mb-1 ${data.style === style.label ? 'text-blue-700' : 'text-slate-800'}`}>
                {style.label}
              </div>
              <div className="text-xs text-slate-500 leading-tight">
                {style.desc}
              </div>
              
              {data.style === style.label && (
                <div className="absolute top-2 right-2 text-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};