"use client"
import { useSearchParams } from 'next/navigation';

export default function AdminHeader() {
    const sp = useSearchParams();
    const entity = sp.get('entity') || 'categories';
    return (
        <header className="p-4 bg-white border-b">
            <h1 className="text-xl font-semibold">
                Admin &gt; {entity.charAt(0).toUpperCase() + entity.slice(1)}
            </h1>
        </header>
    );
}
