// hooks/useCategories.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '@/services/categories';
import { Category } from '@/types/category';

export const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<Category, Error, { name: string }>({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<Category, Error, { id: string; name: string }>({
        mutationFn: ({ id, name }) => updateCategory(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<
        { acknowledged: boolean; deletedCount: number },
        Error,
        string
    >({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};
