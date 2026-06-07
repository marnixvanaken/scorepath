import SimulatorClient from './SimulatorClient';
import type { InputMode } from '@/hooks/useSimulatorState';

export default async function SimulatorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rawMode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const initialMode: InputMode = rawMode === 'quick' ? 'quick' : 'exact';
  return <SimulatorClient initialMode={initialMode} />;
}
