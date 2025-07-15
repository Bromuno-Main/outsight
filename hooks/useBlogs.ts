import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchBlogs,
    fetchBlog,
    createBlog,
    updateBlog,
    deleteBlog,
} from '@/services/blogs';
import { Blog } from '@/types/Blog';

export const useBlogs = () => {
    return useQuery<Blog[]>({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });
};

export const useBlog = (id: string) => {
    return useQuery<Blog>({
        queryKey: ['blog', id],
        queryFn: () => fetchBlog(id),
        enabled: !!id,
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

export const useUpdateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Blog> }) =>
            updateBlog(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};
