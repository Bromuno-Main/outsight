import {Blog} from "@/types/Blog";

export type Collection = {
    _id: string;
    title: string;
    description?: string;
    blogIds: string[];  // References to Blog._id
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
    blogs?: Blog[];     // Populated when fetched
};
