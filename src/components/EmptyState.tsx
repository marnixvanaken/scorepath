import { useMessages } from '@/hooks/useMessages';

interface Props {
  onPrefill: () => void;
}

export function EmptyState({ onPrefill }: Props) {
  const msg = useMessages();
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-card border border-themed flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      </div>
      <p className="text-slate-300 font-bold text-base mb-1">{msg.emptyState.title}</p>
      <p className="text-slate-600 text-sm mb-6 max-w-xs">
        {msg.emptyState.description}
      </p>
      <button
        onClick={onPrefill}
        className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-themed hover:border-[#C9A843]/50 hover:text-[#E2C46A] text-slate-400 text-sm font-semibold rounded-xl transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
        </svg>
        {msg.header.prefill}
      </button>
    </div>
  );
}
