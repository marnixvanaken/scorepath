'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { getMessages } from '@/i18n';
import { simulatorPath } from '@/lib/routes';

type Step = 1 | 2;
type Direction = 1 | -1;

const slideVariants = {
  enter: (dir: Direction) => ({ x: dir * 28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: Direction) => ({ x: dir * -28, opacity: 0 }),
};

const transition = { duration: 0.2, ease: 'easeInOut' } as const;

const COMING_SOON = [
  { name: 'Champions League', eta: 'Sep 2026' },
  { name: 'Premier League', eta: 'Aug 2026' },
  { name: 'Eredivisie', eta: 'Aug 2026' },
  { name: 'La Liga', eta: 'Aug 2026' },
];

export default function StartPage() {
  const router = useRouter();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const msg = getMessages(lang);

  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<Direction>(1);

  function goToStep2() {
    setDirection(1);
    setStep(2);
  }

  function goToStep1() {
    setDirection(-1);
    setStep(1);
  }

  function startSimulator(mode: 'quick' | 'exact') {
    router.push(`${simulatorPath(lang)}?mode=${mode}`);
  }

  return (
    <div className="min-h-dvh bg-panel text-slate-100 flex flex-col overflow-hidden">
      <header className="shrink-0 px-5 py-4 border-b border-[#141414] flex items-center justify-between">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Link href={`/${lang}`} aria-label={msg.header.backToHome}>
                <Logo size="sm" />
              </Link>
            </motion.div>
          ) : (
            <motion.button
              key="back"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              onClick={goToStep1}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white active:opacity-60 transition-colors -ml-1 py-1 pl-1 pr-2 rounded-lg"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {msg.start.backTournament}
            </motion.button>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1.5" aria-label={`${step === 1 ? msg.start.step1Label : msg.start.step2Label}`}>
          {([1, 2] as Step[]).map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s ? 'w-6 bg-orange-500' : 'w-1.5 bg-[#2a2a2a]'
              }`}
            />
          ))}
        </div>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 ? (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="flex-1 flex flex-col px-5 pt-8 pb-10 overflow-y-auto"
            >
              <div className="max-w-lg mx-auto w-full">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">
                  {msg.start.step1Label}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-8">
                  {msg.start.chooseTournament}
                </h1>

                <button
                  onClick={goToStep2}
                  className="group w-full text-left bg-[#0d0d0d] border border-[#1a1a1a] hover:border-orange-500/40 active:border-orange-500/70 active:scale-[0.99] rounded-2xl overflow-hidden transition-all duration-150 mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {['us', 'ca', 'mx'].map((code) => (
                        <span
                          key={code}
                          className="overflow-hidden rounded-sm border border-white/10 inline-block"
                          style={{ width: 26, height: 17 }}
                        >
                          <Image
                            src={`https://flagcdn.com/w40/${code}.png`}
                            alt={code}
                            width={26}
                            height={17}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="relative flex w-1.5 h-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </span>
                        Live
                      </span>
                    </div>
                    <p className="font-black text-xl text-white mb-1">{msg.start.wc2026Name}</p>
                    <p className="text-slate-500 text-sm">{msg.start.wc2026Sub}</p>
                  </div>
                  <div className="border-t border-[#1a1a1a] px-6 py-4 flex items-center justify-between bg-[#0a0a0a] group-hover:bg-[#101010] group-active:bg-[#0f0f0f] transition-colors">
                    <span className="text-sm font-bold text-orange-500 group-hover:text-orange-400 transition-colors">
                      {msg.start.select}
                    </span>
                    <svg className="text-orange-500 group-hover:translate-x-0.5 transition-transform" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2.5">
                  {msg.start.comingSoon}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {COMING_SOON.map(({ name, eta }) => (
                    <div
                      key={name}
                      className="bg-[#0d0d0d] border border-[#161616] rounded-xl p-4 opacity-30 select-none cursor-not-allowed"
                    >
                      <p className="font-bold text-white text-sm leading-snug mb-0.5">{name}</p>
                      <p className="text-slate-600 text-xs">{eta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="flex-1 flex flex-col px-5 pt-8 pb-10 overflow-y-auto"
            >
              <div className="max-w-lg mx-auto w-full">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">
                  {msg.start.step2Label}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-8">
                  {msg.start.howToFill}
                </h1>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => startSimulator('quick')}
                    className="group w-full text-left bg-[#0d0d0d] border border-[#1a1a1a] hover:border-orange-500/40 active:border-orange-500/70 active:scale-[0.99] rounded-2xl p-6 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-4">
                          {(['W', 'D', 'L'] as const).map((label) => (
                            <span
                              key={label}
                              className={`w-9 h-9 rounded-lg text-xs font-black flex items-center justify-center border shrink-0 ${
                                label === 'W'
                                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                                  : label === 'D'
                                  ? 'bg-slate-500/15 text-slate-400 border-slate-500/25'
                                  : 'bg-red-500/15 text-red-400 border-red-500/25'
                              }`}
                            >
                              {label === 'W' ? msg.match.win : label === 'D' ? msg.match.draw : msg.match.loss}
                            </span>
                          ))}
                        </div>
                        <p className="font-black text-white text-lg mb-1.5">{msg.start.quickTitle}</p>
                        <p className="text-slate-500 text-sm leading-relaxed">{msg.start.quickDesc}</p>
                      </div>
                      <svg className="shrink-0 mt-1 text-slate-700 group-hover:text-orange-500 transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  <button
                    onClick={() => startSimulator('exact')}
                    className="group w-full text-left bg-[#0d0d0d] border border-[#1a1a1a] hover:border-orange-500/40 active:border-orange-500/70 active:scale-[0.99] rounded-2xl p-6 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-3xl font-black text-white tabular-nums leading-none">2</span>
                          <span className="text-slate-700 font-bold text-xl">–</span>
                          <span className="text-3xl font-black text-white tabular-nums leading-none">1</span>
                        </div>
                        <p className="font-black text-white text-lg mb-1.5">{msg.start.exactTitle}</p>
                        <p className="text-slate-500 text-sm leading-relaxed">{msg.start.exactDesc}</p>
                      </div>
                      <svg className="shrink-0 mt-1 text-slate-700 group-hover:text-orange-500 transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>

                <p className="text-center text-xs text-slate-700 mt-6">
                  {msg.start.switchNote}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
