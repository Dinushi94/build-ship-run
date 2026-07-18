'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slides, SlideData } from '../data/slides';
import IntroScreen from '../components/IntroScreen';
import { ChevronLeft, ChevronRight, Terminal, Layers, HelpCircle, Activity, Layout, Clock, Info } from 'lucide-react';

export default function Presentation() {
  const [showIntro, setShowIntro] = useState(true);
  const [current, setCurrent] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const slide: SlideData = slides[current];

  const handleNext = () => {
    if (current < slides.length - 1) {
      setDirection(1);
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(current - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntro) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, showIntro]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <>
      {showIntro && <IntroScreen onDone={() => setShowIntro(false)} />}

      <main
        className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col font-sans overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar */}
        <header className="border-b border-slate-800 bg-[#161b22]/80 backdrop-blur px-8 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-sm tracking-wider uppercase text-slate-400">
              Build → Ship → Run
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-800/60 px-2.5 py-1 rounded">
              <Clock className="w-3.5 h-3.5 text-sky-400" /> {slide.time}
            </span>
            <span>Slide {slide.id} of {slides.length}</span>
          </div>
        </header>

        {/* Slide Viewport */}
        <div className="flex-1 flex flex-col relative justify-center px-12 py-8 max-w-7xl w-full mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {slide.title}
              </h1>

              <div className="min-h-[360px] flex flex-col justify-center">

                {slide.type === 'intro' && (
                  <div className="space-y-6 max-w-4xl">
                    {slide.subtitle && <p className="text-2xl text-sky-400 font-medium leading-relaxed">{slide.subtitle}</p>}
                    {slide.content.hook && <p className="text-xl text-slate-300 border-l-4 border-emerald-400 pl-4 italic">{slide.content.hook}</p>}
                    {slide.content.negative && (
                      <div className="space-y-3 pt-4">
                        {slide.content.negative.map((n: string, i: number) => (
                          <p key={i} className="text-xl text-rose-400 font-mono">✕ {n}</p>
                        ))}
                        <p className="text-2xl text-emerald-400 font-semibold mt-4 pt-2 border-t border-slate-800">{slide.content.positive}</p>
                      </div>
                    )}
                    {slide.content.speaker && (
                      <div className="pt-8 text-sm font-mono text-slate-500">
                        Presenter: {slide.content.speaker} | {slide.content.role}
                      </div>
                    )}
                  </div>
                )}

                {slide.type === 'question' && (
                  <div className="space-y-8 max-w-3xl">
                    <p className="text-2xl md:text-3xl font-medium leading-snug text-slate-200">
                      "{slide.content.question}"
                    </p>
                    {slide.content.logos && (
                      <div className="flex flex-wrap gap-4 pt-4">
                        {slide.content.logos.map((logo: string, idx: number) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-800/80 border border-slate-700/60 px-5 py-2.5 rounded-xl font-mono text-emerald-400 font-semibold text-lg shadow-lg"
                          >
                            {logo}
                          </motion.span>
                        ))}
                      </div>
                    )}
                    {slide.content.answer && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl font-black text-sky-400 tracking-wider"
                      >
                        → {slide.content.answer}
                      </motion.div>
                    )}
                  </div>
                )}

                {slide.type === 'split' && (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="bg-[#161b22] border border-slate-800 p-6 rounded-2xl shadow-xl">
                      <h3 className="text-lg font-mono text-slate-400 mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-sky-400" />
                        {slide.content.leftTitle || 'Pipeline Flow'}
                      </h3>
                      <div className="space-y-3">
                        {(slide.content.flow || slide.content.leftItems || []).map((item: string, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className="flex items-center gap-3 bg-[#0d1117] px-4 py-3 rounded-xl border border-slate-800/80"
                          >
                            <span className="w-6 h-6 rounded-full bg-slate-800 text-xs font-mono flex items-center justify-center text-slate-400">{idx + 1}</span>
                            <span className="font-medium text-slate-300">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-rose-400">
                        {slide.content.problems ? 'The Core Failures' : slide.content.rightTitle || 'Implications'}
                      </h3>
                      <ul className="space-y-3">
                        {(slide.content.problems || slide.content.rightItems || []).map((prob: string, idx: number) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className="flex items-start gap-2.5 text-slate-300 leading-relaxed"
                          >
                            <span className="text-rose-500 mt-1">•</span>
                            <span>{prob}</span>
                          </motion.li>
                        ))}
                      </ul>
                      {slide.content.danger && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl text-sm font-mono mt-4">
                          {slide.content.danger}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {slide.type === 'flow' && (
                  <div className="w-full overflow-x-auto pb-4 flex items-center justify-start md:justify-center gap-3">
                    {slide.content.steps.map((step: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 flex-shrink-0">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-[#161b22] border-2 border-slate-800 px-5 py-4 rounded-xl text-center min-w-[140px] shadow-md hover:border-sky-500/50 transition-colors"
                        >
                          <span className="block text-xs font-mono text-slate-500 mb-1">0{idx + 1}</span>
                          <span className="font-semibold text-sm text-slate-200">{step}</span>
                        </motion.div>
                        {idx < slide.content.steps.length - 1 && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 + 0.05 }}
                            className="text-2xl font-bold text-slate-700"
                          >
                            →
                          </motion.span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {slide.type === 'lab' && (
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                      <h3 className="text-lg font-mono text-emerald-400 flex items-center gap-2">
                        <Terminal className="w-4 h-4" /> Lab Checklist
                      </h3>
                      <div className="space-y-3">
                        {slide.content.steps.map((step: string, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-4 bg-[#161b22] p-4 rounded-xl border border-slate-800"
                          >
                            <input type="checkbox" className="mt-1 w-4 h-4 rounded accent-emerald-400 bg-slate-900 border-slate-700" />
                            <span className="text-slate-300 text-sm font-mono">{step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                          <Info className="w-4 h-4" /> Insight
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">{slide.content.insight}</p>
                      </div>
                      <div className="text-xs font-mono text-emerald-500/60 mt-4">Ready...</div>
                    </div>
                  </div>
                )}

                {slide.type === 'grid' && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {slide.content.columns.map((col: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-[#161b22] border border-slate-800/80 p-5 rounded-xl hover:bg-slate-800/30 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-sky-500/10 transition-colors">
                            <Layout className="w-4 h-4 text-sky-400" />
                          </div>
                          <h3 className="font-bold text-lg text-slate-200 mb-2">{col.title}</h3>
                          <p className="text-sm text-slate-400 leading-relaxed">{col.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {slide.type === 'final' && (
                  <div className="text-center max-w-2xl mx-auto space-y-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex p-4 bg-sky-500/10 rounded-full border border-sky-500/20 mb-2"
                    >
                      <HelpCircle className="w-10 h-10 text-sky-400" />
                    </motion.div>
                    <p className="text-2xl font-medium text-slate-200">{slide.content.prompt}</p>
                    <div className="pt-6 border-t border-slate-800 space-y-2 font-mono text-sm text-slate-400">
                      <div>Email: <span className="text-emerald-400">{slide.content.contact}</span></div>
                      <div>GitHub: <span className="text-sky-400">{slide.content.github}</span></div>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="mt-auto bg-[#161b22] border-t border-slate-800 p-6 relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start gap-3 max-w-3xl">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 mt-0.5 flex-shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-0.5">Presenter Cue</span>
                <p className="text-xs text-slate-300 leading-relaxed">{slide.hint}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end md:self-center">
              <button onClick={handlePrev} disabled={current === 0} className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/60 hover:bg-slate-700 disabled:opacity-40 transition-colors">
                <ChevronLeft className="w-5 h-5 text-slate-300" />
              </button>
              <div className="px-4 text-xs font-mono text-slate-400 bg-slate-950/60 py-2.5 rounded-xl border border-slate-800/80">
                {Math.round(((current + 1) / slides.length) * 100)}% Complete
              </div>
              <button onClick={handleNext} disabled={current === slides.length - 1} className="p-2.5 rounded-xl bg-sky-600 border border-sky-500 hover:bg-sky-500 disabled:opacity-40 transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          <div className="w-full bg-slate-800 h-1 absolute bottom-0 left-0 right-0">
            <motion.div
              className="bg-gradient-to-r from-sky-500 via-emerald-400 to-teal-400 h-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </footer>
      </main>
    </>
  );
}