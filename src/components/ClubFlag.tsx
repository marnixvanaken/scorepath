import Image from 'next/image';

interface Props {
  code: string;  // ISO 3166-1 alpha-2, bijv. 'nl', 'gb-eng', 'xk'
  size?: number;
}

export function ClubFlag({ code, size = 20 }: Props) {
  const cdnWidth = size > 48 ? 160 : 40;
  const src = `https://flagcdn.com/w${cdnWidth}/${code.toLowerCase()}.png`;

  return (
    <span
      className="overflow-hidden inline-block shrink-0 border border-white/20"
      style={{ width: size, height: Math.round(size * 0.67), borderRadius: '0 4px 0 4px' }}
    >
      <Image
        src={src}
        alt={code}
        width={size}
        height={Math.round(size * 0.67)}
        className="w-full h-full object-cover"
        unoptimized
      />
    </span>
  );
}
