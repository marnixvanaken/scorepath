import { NL } from './nl';
import { EN } from './en';
import { ES } from './es';
import type { Messages } from './types';

export type { Messages };
export type Locale = 'nl' | 'en' | 'es';

export const LOCALES: Locale[] = ['nl', 'en', 'es'];
export const DEFAULT_LOCALE: Locale = 'nl';

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getMessages(locale: string): Messages {
  switch (locale) {
    case 'en': return EN;
    case 'es': return ES;
    default:   return NL;
  }
}

export function getHtmlLang(locale: Locale): string {
  switch (locale) {
    case 'en': return 'en';
    case 'es': return 'es';
    default:   return 'nl';
  }
}

export function getDateLocale(locale: Locale): string {
  switch (locale) {
    case 'en': return 'en-US';
    case 'es': return 'es-ES';
    default:   return 'nl-NL';
  }
}
