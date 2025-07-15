import {Category} from "@/types/category";

export type Blog = {
    _id: string;            // MongoDB ObjectId
    title: string;
    content: string;
    imageUrl?: string;
    tags: string[];
    author: string;
    categoryId: string;     // Ref to Category
    createdAt: string;
    updatedAt: string;
    category?: Category;    // Populated when fetched
};
