import Image from 'next/image';
import { flagUrl } from '@/data/flags';

interface Props {
  teamId: string;
  size?: number;
}

export function Flag({ teamId, size = 20 }: Props) {
  const cdnWidth = size > 48 ? 160 : 40;
  const src = flagUrl(teamId, cdnWidth);
  if (!src) {
    return (
      <span
        className="bg-slate-700 inline-block shrink-0"
        style={{ width: size, height: size * 0.67, borderRadius: '0 4px 0 4px' }}
        aria-hidden="true"
      />
    );
  }
  return (
    <span
      className="overflow-hidden inline-block shrink-0 border border-white/20"
      style={{ width: size, height: size * 0.67, borderRadius: '0 4px 0 4px' }}
    >
      <Image
        src={src}
        alt={teamId}
        width={size}
        height={Math.round(size * 0.67)}
        className="w-full h-full object-cover"
        unoptimized
      />
    </span>
  );
}
