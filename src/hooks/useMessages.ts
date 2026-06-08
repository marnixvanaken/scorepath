'use client';

import { useParams } from 'next/navigation';
import { getMessages } from '@/i18n';
import type { Messages } from '@/i18n';

export function useMessages(): Messages {
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  return getMessages(lang);
}
