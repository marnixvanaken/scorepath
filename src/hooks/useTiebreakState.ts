'use client';

import { useState, useCallback } from 'react';

export interface TiebreakState {
  manualOrders: Record<string, string[]>;
}

export interface TiebreakActions {
  setManualOrder: (groupKey: string, orderedTeamIds: string[]) => void;
  clearManual: (groupKey: string) => void;
  getManualOrder: (teamIds: string[]) => Record<string, number>;
}

export function useTiebreakState(): [TiebreakState, TiebreakActions] {
  const [state, setState] = useState<TiebreakState>({ manualOrders: {} });

  const setManualOrder = useCallback((groupKey: string, orderedTeamIds: string[]) => {
    setState((prev) => ({
      manualOrders: { ...prev.manualOrders, [groupKey]: orderedTeamIds },
    }));
  }, []);

  const clearManual = useCallback((groupKey: string) => {
    setState((prev) => {
      const next = { ...prev.manualOrders };
      delete next[groupKey];
      return { manualOrders: next };
    });
  }, []);

  const getManualOrder = useCallback((teamIds: string[]): Record<string, number> => {
    const key = [...teamIds].sort().join(',');
    const order = state.manualOrders[key];
    if (!order) return {};
    return Object.fromEntries(order.map((id, i) => [id, i]));
  }, [state.manualOrders]);

  return [state, { setManualOrder, clearManual, getManualOrder }];
}

export function tieGroupKey(teamIds: string[]): string {
  return [...teamIds].sort().join(',');
}
