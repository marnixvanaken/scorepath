import SimulatorClient from './SimulatorClient';
import type { InputMode } from '@/hooks/useSimulatorState';

export default async function SimulatorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rawMode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const initialMode: InputMode =
    rawMode === 'winner' || rawMode === 'quick' ? 'winner'
    : rawMode === 'drag' ? 'drag'
    : 'drag';
  const rawView = Array.isArray(params.view) ? params.view[0] : params.view;
  const initialView = rawView === 'knockout' ? 'knockout' : 'groepsfase';
  return <SimulatorClient initialMode={initialMode} initialView={initialView} />;
}
