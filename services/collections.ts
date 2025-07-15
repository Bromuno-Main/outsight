import { Collection } from '@/types/Collection';

export async function fetchCollections(): Promise<Collection[]> {
    const res = await fetch('/api/collections');
    if (!res.ok) throw new Error('Failed to fetch collections');
    return res.json();
}

export async function fetchCollection(id: string): Promise<Collection> {
    const res = await fetch(`/api/collections/${id}`);
    if (!res.ok) throw new Error('Failed to fetch collection');
    return res.json();
}

export async function createCollection(data: {
    title: string;
    description?: string;
    blogIds: string[];
    imageUrl?: string;
}): Promise<Collection> {
    const res = await fetch('/api/collections', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create collection');
    return res.json();
}

export async function updateCollection(id: string, data: {
    title?: string;
    description?: string;
    blogIds?: string[];
    imageUrl?: string;
}): Promise<Collection> {
    const res = await fetch(`/api/collections/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update collection');
    return res.json();
}

export async function deleteCollection(id: string): Promise<{ deletedCount: number }> {
    const res = await fetch(`/api/collections/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete collection');
    return res.json();
}
