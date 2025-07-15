import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchCollections,
    fetchCollection,
    createCollection,
    updateCollection,
    deleteCollection,
} from '@/services/collections';
import { Collection } from '@/types/Collection';

export const useCollections = () => {
    return useQuery<Collection[]>({
        queryKey: ['collections'],
        queryFn: fetchCollections,
    });
};

export const useCollection = (id: string) => {
    return useQuery<Collection>({
        queryKey: ['collection', id],
        queryFn: () => fetchCollection(id),
        enabled: !!id,
    });
};

export const useCreateCollection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collections'] });
        },
    });
};

export const useUpdateCollection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            updateCollection(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collections'] });
        },
    });
};

export const useDeleteCollection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collections'] });
        },
    });
};
