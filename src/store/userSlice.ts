import { createSlice } from "@reduxjs/toolkit";
import { ESearchType, ISearchTypeResponse } from "../constants/searchType";

const initialUserState: ISearchTypeResponse = {
  loading: false,
  data: [],
  page: 1,
  error: null,
  keyword: null,
  userDetails: {
    followers: 0,
    following: 0,
    location: "",
    name: "",
  },
  repos: [],
};

const userSlice = createSlice({
  name: ESearchType.Users,
  initialState: initialUserState,
  reducers: {
    getUser: (state, action) => {
      state.loading = true;
      state.keyword = action.payload.keyword;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.results;
    },
    getUserError: (state, action) => {
      state.loading = false;
      state.page = state.page === 1 ? state.page : state.page - 1;
      state.error = action.payload.errors;
    },
    getUserDetails: (state) => {
      state.loading = true;
    },
    getUserDetailsSuccess: (state, action) => {
      state.loading = false;
      state.userDetails = action.payload;
    },
    getUserDetailsError: (state, action) => {
      state.loading = false;
      state.error = action.payload.errors;
    },
    getUserRepos: (state) => {
      state.loading = true;
    },
    getUserReposSuccess: (state, action) => {
      state.loading = false;
      state.repos = action.payload;
    },
    getUserReposError: (state, action) => {
      state.loading = false;
      state.error = action.payload.errors;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
