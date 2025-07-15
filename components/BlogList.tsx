'use client';
import { useState } from 'react';
import { useBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog } from '@/hooks/useBlogs';
import { useCategories } from '@/hooks/useCategories';
import EditModal from './EditModal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';

export default function BlogList() {
    const { data: blogs = [] } = useBlogs();
    const { data: cats = [] } = useCategories();
    const create = useCreateBlog();
    const update = useUpdateBlog();
    const del = useDeleteBlog();

    const [editing, setEditing] = useState<any | null>(null);

    return (
        <div>
            <Button onClick={() => setEditing({ title: '', content: '', author: '', categoryId: '', tags: '', imageUrl: '' })}>Add Blog</Button>
            <ul className="mt-4 space-y-2">
                {blogs.map(b => (
                    <li key={b._id} className="p-2 bg-white rounded flex justify-between items-center">
                        <span>{b.title} ({b.category?.name})</span>
                        <div className="space-x-2">
                            <Button size="sm" onClick={() => setEditing({ ...b, tags: b.tags.join(', ') })}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => del.mutate(b._id)}>Delete</Button>
                        </div>
                    </li>
                ))}
            </ul>

            {editing && (
                <EditModal
                    title={editing._id ? 'Edit Blog' : 'New Blog'}
                    open={!!editing}
                    initial={editing}
                    onSave={(data) => {
                        const payload = {
                            ...data,
                            tags: data.tags.split(',').map((t: string) => t.trim()),
                        };
                        if (data._id) update.mutate({ id: data._id, data: payload });
                        else create.mutate(payload);
                        setEditing(null);
                    }}
                    onClose={() => setEditing(null)}
                >
                    {(state, setState) => (
                        <div className="space-y-3">
                            <Input placeholder="Title" value={state.title || ''} onChange={e => setState({ ...state, title: e.target.value })}/>
                            <Textarea placeholder="Content" value={state.content || ''} onChange={e => setState({ ...state, content: e.target.value })}/>
                            <Input placeholder="Author" value={state.author || ''} onChange={e => setState({ ...state, author: e.target.value })}/>
                            <Input placeholder="Image URL" value={state.imageUrl || ''} onChange={e => setState({ ...state, imageUrl: e.target.value })}/>
                            <Input placeholder="Tags (comma separated)" value={state.tags} onChange={e => setState({ ...state, tags: e.target.value })}/>
                            <Select value={state.categoryId} onValueChange={(v) => setState({ ...state, categoryId: v })}>
                                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                                <SelectContent>
                                    {cats.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </EditModal>
            )}
        </div>
    );
}
