'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const entity = searchParams.get('entity') || 'categories';
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="md:hidden" onClick={() => setOpen(!open)}>
                ☰
            </button>
            <aside className={`${open ? 'block' : 'hidden'} md:block bg-white w-64 p-4 border-r`}>
                {['categories', 'blogs', 'collections'].map((e) => (
                    <Link href={`/admin?entity=${e}`} key={e}>
                        <p className={`block p-2 mb-2 rounded ${entity === e ? 'bg-blue-200' : 'hover:bg-gray-100'}`}>
                            {e.charAt(0).toUpperCase() + e.slice(1)}
                        </p>
                    </Link>
                ))}
            </aside>
        </>
    );
}
