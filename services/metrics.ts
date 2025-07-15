import { Metrics } from '@/types/metrics';

export async function getMetrics(): Promise<Metrics> {
    const res = await fetch('/api/metrics');

    if (!res.ok) {
        throw new Error('Failed to fetch metrics');
    }

    return res.json();
}
