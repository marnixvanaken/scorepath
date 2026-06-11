import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n';
import DrawClient from '@/app/ucl-2027/DrawClient';

export default async function UCLPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  return <DrawClient lang={lang} />;
}
