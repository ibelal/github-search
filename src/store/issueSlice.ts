import { createSlice } from "@reduxjs/toolkit";
import { ESearchType, ISearchTypeResponse } from "../constants/searchType";

const initialIssueState: ISearchTypeResponse = {
  loading: false,
  data: [],
  page: 1,
  error: null,
  keyword: null,
};

const issueSlice = createSlice({
  name: ESearchType.Issues,
  initialState: initialIssueState,
  reducers: {
    getIssue: (state, action) => {
      state.loading = true;
      state.keyword = action.payload.keyword;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    getIssueSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.results;
    },
    getIssueError: (state, action) => {
      state.loading = false;
      state.page = state.page === 1 ? state.page : state.page - 1;
      state.error = action.payload.errors;
    },
  },
});

export const issueAction = issueSlice.actions;
export default issueSlice.reducer;
