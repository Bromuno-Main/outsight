"use client"
import { useSearchParams } from 'next/navigation';
import CategoryList from "@/components/CategoryList";
import BlogList from "@/components/BlogList";
import CollectionList from "@/components/CollectionList";

export default function AdminPage() {
    const entity = useSearchParams().get('entity') || 'categories';

    return (
        <div>
            {entity === 'categories' && <CategoryList />}
            {entity === 'blogs' && <BlogList />}
            {entity === 'collections' && <CollectionList />}
        </div>
    );
}
