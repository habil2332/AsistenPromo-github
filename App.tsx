import React, { useState, useRef } from 'react';
import { BookData, GeneratedContent } from './types';
import { InputSection } from './components/InputSection';
import { ResultSection } from './components/ResultSection';
import { Button } from './components/Button';
import { generateBookAssets } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<BookData>({
    title: '',
    author: '',
    synopsis: '',
    style: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof BookData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.title.trim() !== '' && 
                      formData.author.trim() !== '' && 
                      formData.synopsis.trim() !== '' && 
                      formData.style !== '';

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await generateBookAssets(formData);
      setResults(data);
      // Wait for render then scroll
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError("Maaf, terjadi kesalahan saat membuat konten. Pastikan API Key sudah benar dan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
              AmoCover AI
            </h1>
          </div>
          <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Beta v1.0
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Intro */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Buat Cover & Copywriting Novel Anda dalam Sekejap
          </h2>
          <p className="text-lg text-slate-600">
            Cukup masukkan detail cerita, pilih gaya, dan biarkan AI kami membuat visual cover menakjubkan beserta strategi promosinya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                Detail Cerita
              </h3>
              <InputSection 
                data={formData} 
                onChange={handleInputChange} 
                disabled={loading} 
              />
              
              <div className="mt-8 pt-6 border-t border-slate-100 sticky bottom-0 bg-white pb-2">
                 {error && (
                  <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                    {error}
                  </div>
                )}
                
                <Button 
                  onClick={handleSubmit} 
                  isLoading={loading} 
                  disabled={!isFormValid}
                  className="w-full text-lg shadow-blue-500/30"
                >
                  {loading ? 'Sedang Membuat Keajaiban...' : '✨ Generate Cover & Copy'}
                </Button>
                {!isFormValid && (
                  <p className="text-center text-xs text-slate-400 mt-2">
                    Mohon lengkapi semua field di atas.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7" ref={resultRef}>
            {!results && !loading && (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-8 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-600">Hasil Akan Muncul Di Sini</h3>
                <p className="text-sm max-w-xs mx-auto mt-2">
                  Pratinjau cover, judul clickbait, dan caption promosi Anda akan ditampilkan setelah proses generate selesai.
                </p>
              </div>
            )}

            {loading && (
               <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-200">
                 <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                 <h3 className="text-xl font-bold text-slate-800">Sedang Berpikir...</h3>
                 <p className="text-slate-500 mt-2">Menggambar cover dan menulis caption terbaik.</p>
                 <div className="mt-8 max-w-md w-full px-8">
                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-600 animate-pulse w-2/3 rounded-full"></div>
                   </div>
                 </div>
               </div>
            )}

            {results && !loading && (
              <ResultSection results={results} />
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;