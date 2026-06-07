interface Props {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ text, children, className }: Props) {
  return (
    <span className={`relative group/tip cursor-default ${className ?? ''}`}>
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-lg bg-slate-800 border border-[#1A3050] text-[9px] text-slate-300 whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 pointer-events-none z-30 shadow-xl">
        {text}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
      </span>
    </span>
  );
}
