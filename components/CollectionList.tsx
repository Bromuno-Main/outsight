'use client';

import { useState } from 'react';
import {
    useCollections,
    useCreateCollection,
    useUpdateCollection,
    useDeleteCollection
} from '@/hooks/useCollections';
import { useBlogs } from '@/hooks/useBlogs';
import EditModal from './EditModal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CollectionList() {
    const { data: cols = [] } = useCollections();
    const { data: blogs = [] } = useBlogs();
    const create = useCreateCollection();
    const update = useUpdateCollection();
    const del = useDeleteCollection();

    const [editing, setEditing] = useState<any | null>(null);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Collections</h2>
                <Button onClick={() => setEditing({ title: '', description: '', imageUrl: '', blogIds: [] })}>
                    Add Collection
                </Button>
            </div>

            <ul className="space-y-2">
                {cols.map((c) => (
                    <li
                        key={c._id}
                        className="p-3 bg-white rounded shadow flex justify-between items-center"
                    >
            <span>
              {c.title} ({c.blogs?.length || 0} blogs)
            </span>
                        <div className="space-x-2">
                            <Button
                                size="sm"
                                onClick={() =>
                                    setEditing({
                                        ...c,
                                        blogIds: Array.isArray(c.blogIds) ? c.blogIds : []
                                    })
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => del.mutate(c._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            {editing && (
                <EditModal
                    title={editing._id ? 'Edit Collection' : 'New Collection'}
                    open={!!editing}
                    initial={editing}
                    onSave={(data) => {
                        const payload = {
                            title: data.title,
                            description: data.description,
                            imageUrl: data.imageUrl,
                            blogIds: data.blogIds, // already an array
                        };

                        if (data._id) {
                            update.mutate({ id: data._id, data: payload });
                        } else {
                            create.mutate(payload);
                        }

                        setEditing(null);
                    }}
                    onClose={() => setEditing(null)}
                >
                    {(state, setState) => (
                        <div className="space-y-3">
                            <Input
                                placeholder="Title"
                                value={state.title}
                                onChange={(e) => setState({ ...state, title: e.target.value })}
                            />
                            <Textarea
                                placeholder="Description"
                                value={state.description}
                                onChange={(e) =>
                                    setState({ ...state, description: e.target.value })
                                }
                            />
                            <Input
                                placeholder="Image URL"
                                value={state.imageUrl}
                                onChange={(e) =>
                                    setState({ ...state, imageUrl: e.target.value })
                                }
                            />

                            <div className="space-y-1">
                                <span className="text-sm font-medium">Select Blogs</span>
                                {blogs.map((b) => (
                                    <label key={b._id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={state.blogIds.includes(b._id)}
                                            onChange={() => {
                                                const exists = state.blogIds.includes(b._id);
                                                const next = exists
                                                    ? state.blogIds.filter((id: string) => id !== b._id)
                                                    : [...state.blogIds, b._id];
                                                setState({ ...state, blogIds: next });
                                            }}
                                        />
                                        <span>{b.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </EditModal>
            )}
        </div>
    );
}
