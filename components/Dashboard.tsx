'use client';

import { useMetrics } from '@/hooks/useMetrics';

export default function Dashboard() {
    const { data, isLoading, error } = useMetrics();

    if (isLoading) return <p>Loading dashboard...</p>;
    if (error) return <p className="text-red-500">Failed to load metrics</p>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MetricCard label="Blogs" value={data?.blogsCount} />
                <MetricCard label="Categories" value={data?.categoriesCount} />
                <MetricCard label="Collections" value={data?.collectionsCount} />
            </div>
        </div>
    );
}

function MetricCard({ label, value }: { label: string; value?: number }) {
    return (
        <div className="p-4 bg-white rounded shadow border">
            <div className="text-gray-500 text-sm mb-1">{label}</div>
            <div className="text-2xl font-bold">{value ?? '—'}</div>
        </div>
    );
}
