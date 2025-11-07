import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {Category} from "@/types/home/Category";
import {categoryService} from "@/services/home/categoryService";

interface CategoryState {
    data: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    data: [],
    loading: false,
    error: null,
};

// Fetch categories qua service
export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async () => {
        return await categoryService.getAll();
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching categories";
            });
    },
});

export const categoryReducer  = categorySlice.reducer;
