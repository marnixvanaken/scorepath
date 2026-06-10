'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { flagUrl } from '@/data/flags';
import { teamById, getTeamName } from '@/data/worldcup2026';

interface Props {
  teamId: string;
  size?: number;
}

export function Flag({ teamId, size = 20 }: Props) {
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const team = teamById(teamId);
  // Betekenisvolle alt-tekst: de landnaam in de huidige taal i.p.v. de afkorting.
  const label = team ? getTeamName(team, lang) : teamId;

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
        alt={label}
        width={size}
        height={Math.round(size * 0.67)}
        className="w-full h-full object-cover"
        loading="lazy"
        unoptimized
      />
    </span>
  );
}
