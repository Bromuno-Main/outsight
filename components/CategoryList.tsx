'use client';

import { useState } from 'react';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/useCategories';
import EditModal from './EditModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CategoryList() {
    const { data: cats = [] } = useCategories();
    const create = useCreateCategory();
    const update = useUpdateCategory();
    const del = useDeleteCategory();

    const [editing, setEditing] = useState<{ id?: string; name: string } | null>(null);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Categories</h2>
                <Button onClick={() => setEditing({ name: '' })}>Add Category</Button>
            </div>

            <ul className="space-y-2">
                {cats.map((c) => (
                    <li
                        key={c._id}
                        className="flex justify-between items-center p-3 bg-white border rounded shadow-sm"
                    >
                        <span>{c.name}</span>
                        <div className="space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setEditing({ id: c._id, name: c.name })}>
                                Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => del.mutate(c._id)}>
                                Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            {editing && (
                <EditModal
                    open={!!editing}
                    title={editing.id ? 'Edit Category' : 'New Category'}
                    initial={{ name: editing.name }}
                    onSave={(data) => {
                        if (editing.id) {
                            update.mutate({ id: editing.id, name: data.name });
                        } else {
                            create.mutate({ name: data.name });
                        }
                        setEditing(null);
                    }}
                    onClose={() => setEditing(null)}
                >
                    {(state, setState) => (
                        <div className="space-y-3">
                            <Input
                                placeholder="Category name"
                                value={state.name}
                                onChange={(e) => setState({ ...state, name: e.target.value })}
                            />
                        </div>
                    )}
                </EditModal>
            )}
        </div>
    );
}
