'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const spring = { type: 'spring' as const, bounce: 0.3, duration: 1.5 };
const fadeUp = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: spring },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.75 } },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-28">

      {/* Radiale gradient-bundels — oranje/amber tint (naar tailark-patroon) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0 opacity-60 hidden lg:block">
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(24,95%,53%,0.09)_0,hsla(24,95%,53%,0.02)_50%,transparent_80%)]" />
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(40,80%,55%,0.07)_0,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(24,95%,53%,0.04)_0,transparent_100%)]" />
      </div>

      {/* Nacht-achtergrond (zichtbaar op alle schermen) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 2, delay: 0.8 }}
        className="absolute inset-0 -z-20 pointer-events-none"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
          alt=""
          className="absolute inset-x-0 top-0 w-full h-full object-cover object-top opacity-40"
          width="3276"
          height="4095"
        />
      </motion.div>

      {/* Bottom fade naar paginaachtergrond */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: 'radial-gradient(125% 125% at 50% 100%, transparent 0%, #080808 72%)' }}
      />

      {/* Tekst + CTA's */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

        {/* Live badge */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-8">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              Live · FIFA WK 2026 gestart
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.0] mb-6 mt-2"
          >
            <span className="text-white">Simuleer elk</span>
            <br />
            <span className="text-orange-500">toernooi.</span>
          </motion.h1>

          {/* Subtitel */}
          <motion.p
            variants={fadeUp}
            className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Vul uitslagen in, zie live de standen — met exacte FIFA-tiebreakers.
            Deel je bracket via één link. Geen account nodig.
          </motion.p>
        </motion.div>

        {/* CTA-knoppen */}
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.div variants={fadeUp} className="bg-white/10 rounded-[14px] border border-white/10 p-0.5">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Start de simulator
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link
              href="/wk-2026"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Bekijk de bracket
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
