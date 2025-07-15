import { Blog } from '@/types/Blog';

export async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch('/api/blogs');
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
}

export async function fetchBlog(id: string): Promise<Blog> {
    const res = await fetch(`/api/blogs/${id}`);
    if (!res.ok) throw new Error('Failed to fetch blog');
    return res.json();
}

export async function createBlog(data: Omit<Blog, '_id' | 'createdAt' | 'updatedAt' | 'category'>): Promise<Blog> {
    const res = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create blog');
    return res.json();
}

export async function updateBlog(id: string, data: Partial<Omit<Blog, '_id' | 'createdAt' | 'category'>>): Promise<Blog> {
    const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update blog');
    return res.json();
}

export async function deleteBlog(id: string): Promise<{ deletedCount: number }> {
    const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete blog');
    return res.json();
}
