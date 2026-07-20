import { describe, it, expect } from 'vitest';
import { hotelsUrl, tripUrl, ticketsUrl, type AffiliateContext } from '@/lib/affiliates';

const ajax: AffiliateContext = {
  clubName: 'Ajax',
  stadiumName: 'Johan Cruijff ArenA',
  city: 'Amsterdam',
  lat: 52.3143,
  lng: 4.9415,
};

describe('affiliate URL builders', () => {
  it('builds a Booking link around the stadium', () => {
    const url = new URL(hotelsUrl(ajax));
    expect(url.hostname).toBe('www.booking.com');
    expect(url.searchParams.get('latitude')).toBe('52.3143');
    expect(url.searchParams.get('longitude')).toBe('4.9415');
    expect(url.searchParams.get('ss')).toBe('Johan Cruijff ArenA, Amsterdam');
    expect(url.searchParams.get('checkin')).toBeNull();
  });

  it('prefills check-in/out around the match date', () => {
    const url = new URL(hotelsUrl({ ...ajax, matchDate: '2026-09-12T18:45:00Z' }));
    expect(url.searchParams.get('checkin')).toBe('2026-09-12');
    expect(url.searchParams.get('checkout')).toBe('2026-09-13');
  });

  it('appends affiliate tags only when configured', () => {
    const bare = new URL(hotelsUrl(ajax, { bookingAid: '', gygPartnerId: '' }));
    expect(bare.searchParams.get('aid')).toBeNull();

    const tagged = new URL(hotelsUrl(ajax, { bookingAid: '123456', gygPartnerId: '' }));
    expect(tagged.searchParams.get('aid')).toBe('123456');

    const trip = new URL(tripUrl(ajax, { bookingAid: '', gygPartnerId: 'SCOREPATH' }));
    expect(trip.searchParams.get('partner_id')).toBe('SCOREPATH');
  });

  it('builds a trip search for the club city', () => {
    const url = new URL(tripUrl(ajax, { bookingAid: '', gygPartnerId: '' }));
    expect(url.hostname).toBe('www.getyourguide.com');
    expect(url.searchParams.get('q')).toContain('Amsterdam');
    expect(url.searchParams.get('q')).toContain('Ajax');
  });

  it('builds a ticket search for the club', () => {
    const url = new URL(ticketsUrl(ajax));
    expect(url.hostname).toBe('www.stubhub.com');
    expect(url.searchParams.get('q')).toBe('Ajax tickets');
  });
});
