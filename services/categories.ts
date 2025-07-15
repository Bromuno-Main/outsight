import {Category} from "@/types/category";


export async function fetchCategories(): Promise<Category[]> {
    const res = await fetch('/api/categories');
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}

export async function createCategory(data: { name: string }): Promise<Category> {
    const res = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create category');
    return res.json();
}

export async function updateCategory(id: string, name: string): Promise<Category> {
    const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error('Failed to update category');
    return res.json();
}

export async function deleteCategory(id: string): Promise<{ acknowledged: boolean; deletedCount: number }> {
    const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete category');
    return res.json();
}
