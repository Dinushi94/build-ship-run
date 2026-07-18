'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lines = [
  '> initializing devops environment...',
  '> loading cloud infrastructure...',
  '> connecting to github...',
  '> pipeline ready.',
];

export default function IntroScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onDone, 800);
        }, 600);
      }
    }, 520);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#0d1117] flex flex-col items-center justify-center gap-12 overflow-hidden"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Glow orb */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Terminal lines */}
          <div className="font-mono text-sm text-emerald-400 space-y-2 w-full max-w-md px-8">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <span>{line}</span>
                {i === visibleLines - 1 && (
                  <motion.span
                    className="inline-block w-2 h-4 bg-emerald-400"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Big title drives in */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                BUILD
              </motion.span>
              <motion.span
                className="block text-sky-400"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                SHIP
              </motion.span>
              <motion.span
                className="block text-emerald-400"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                RUN
              </motion.span>
            </h1>
            <motion.p
              className="text-slate-500 font-mono text-sm mt-4 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              University Club Workshop · DevOps & Cloud
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}