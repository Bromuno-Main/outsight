import { useQuery } from '@tanstack/react-query';
import { getMetrics } from '@/services/metrics';
import { Metrics } from '@/types/metrics';

export function useMetrics() {
    return useQuery<Metrics>({
        queryKey: ['metrics'],
        queryFn: getMetrics,
    });
}
