// Affiliate deep links voor het club-globe-paneel: tickets, hotels bij het
// stadion en groundhop-trips. Eén plek voor alle partner-tags; de builders
// zijn pure functies zodat ze unit-testbaar zijn.
//
// Tags invullen kan hier of via env (NEXT_PUBLIC_* — deze links renderen
// client-side). Zolang een tag leeg is, werken de links gewoon zonder
// affiliate-parameter.

export interface AffiliateConfig {
  /** Booking.com affiliate id (standaard `aid`-parameter). */
  bookingAid: string;
  /** GetYourGuide partner id (standaard `partner_id`-parameter). */
  gygPartnerId: string;
}

export const AFFILIATE_CONFIG: AffiliateConfig = {
  bookingAid: process.env.NEXT_PUBLIC_AFF_BOOKING_AID ?? '',
  gygPartnerId: process.env.NEXT_PUBLIC_AFF_GYG_PARTNER ?? '',
};

export interface AffiliateContext {
  clubName: string;
  stadiumName: string;
  city: string;
  lat: number;
  lng: number;
  /** ISO-datum (bv. utcDate van de eerstvolgende thuiswedstrijd). */
  matchDate?: string;
}

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// Hotels rond het stadion; met wedstrijddatum wordt check-in/out voorgevuld.
export function hotelsUrl(ctx: AffiliateContext, config: AffiliateConfig = AFFILIATE_CONFIG): string {
  const params = new URLSearchParams({
    ss: `${ctx.stadiumName}, ${ctx.city}`,
    latitude: ctx.lat.toFixed(4),
    longitude: ctx.lng.toFixed(4),
    radius: '5',
  });
  if (ctx.matchDate) {
    const checkin = new Date(ctx.matchDate);
    const checkout = new Date(checkin.getTime() + 24 * 60 * 60 * 1000);
    params.set('checkin', isoDay(checkin));
    params.set('checkout', isoDay(checkout));
  }
  if (config.bookingAid) params.set('aid', config.bookingAid);
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

// Groundhop-/stadiontour-aanbod in de stad van de club.
export function tripUrl(ctx: AffiliateContext, config: AffiliateConfig = AFFILIATE_CONFIG): string {
  const params = new URLSearchParams({ q: `${ctx.city} ${ctx.clubName} stadium tour` });
  if (config.gygPartnerId) params.set('partner_id', config.gygPartnerId);
  return `https://www.getyourguide.com/s/?${params.toString()}`;
}

// Ticket-zoeklink. Generieke StubHub-zoekopdracht; vervang dit template
// zodra er een echte ticketpartner is (de rest van de app hoeft dan niet mee
// te veranderen).
export function ticketsUrl(ctx: AffiliateContext): string {
  const params = new URLSearchParams({ q: `${ctx.clubName} tickets` });
  return `https://www.stubhub.com/find/s/?${params.toString()}`;
}
