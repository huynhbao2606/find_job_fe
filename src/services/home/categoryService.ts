import {Category} from "@/types/home/Category";
import api from "@/interceptor/api";

export const categoryService = {
    async getAll(): Promise<Category[]> {
        const res = await api.get("/category");
        return res.data.data;
    },
};
