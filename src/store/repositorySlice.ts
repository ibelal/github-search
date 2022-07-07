import { createSlice } from "@reduxjs/toolkit";
import { ESearchType, ISearchTypeResponse } from "../constants/searchType";

const initialRepoState: ISearchTypeResponse = {
  loading: false,
  data: [],
  page: 1,
  error: null,
  keyword: null,
};

const repositorySlice = createSlice({
  name: ESearchType.Repositories,
  initialState: initialRepoState,
  reducers: {
    getRepository: (state, action) => {
      state.loading = true;
      state.keyword = action.payload.keyword;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    getRepositorySuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.results;
    },
    getRepositoryError: (state, action) => {
      state.loading = false;
      state.page = state.page === 1 ? state.page : state.page - 1;
      state.error = action.payload.errors;
    },
  },
});

export const repositoryAction = repositorySlice.actions;
export default repositorySlice.reducer;
