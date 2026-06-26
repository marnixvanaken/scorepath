interface LogoProps {
  variant?: 'wordmark' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconSizes = { sm: 20, md: 28, lg: 40 };
const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-xl' };
const scoreSizes = { sm: '6px', md: '7px', lg: '10px' };

export function Logo({ variant = 'wordmark', size = 'md', className = '' }: LogoProps) {
  const px = iconSizes[size];

  const icon = (
    <svg width={px} height={px} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect width="96" height="96" rx="22" fill="var(--brand-orange)"/>
      <line x1="14" y1="22" x2="30" y2="22" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.75"/>
      <line x1="14" y1="38" x2="30" y2="38" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.75"/>
      <path d="M30 22 Q30 30 38 30" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.75"/>
      <path d="M30 38 Q30 30 38 30" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.75"/>
      <line x1="38" y1="30" x2="50" y2="30" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.75"/>
      <line x1="14" y1="58" x2="30" y2="58" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.75"/>
      <line x1="14" y1="74" x2="30" y2="74" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.75"/>
      <path d="M30 58 Q30 66 38 66" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.75"/>
      <path d="M30 74 Q30 66 38 66" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.75"/>
      <line x1="38" y1="66" x2="50" y2="66" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.75"/>
      <path d="M50 30 Q50 48 58 48" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M50 66 Q50 48 58 48" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M58 48H78" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <path d="M70 40L78 48L70 56" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  if (variant === 'icon') {
    return <span className={className}>{icon}</span>;
  }

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {icon}
      <span className="flex flex-col leading-none">
        <span
          className="font-bold uppercase tracking-widest"
          style={{ fontSize: scoreSizes[size], color: 'var(--fg-subtle)' }}
        >
          Score
        </span>
        <span
          className={`font-black tracking-tight leading-none ${textSizes[size]}`}
          style={{ color: 'var(--fg)' }}
        >
          Path
        </span>
      </span>
    </span>
  );
}
