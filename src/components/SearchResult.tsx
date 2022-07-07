import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ESearchType } from "../constants/searchType";
import { fetchApi } from "../services/api";
import { RootState } from "../store";
import { userAction } from "../store/userSlice";
import { repositoryAction } from "../store/repositorySlice";
import { issueAction } from "../store/issueSlice";
import Loader from "./Layout/Loader";
import UserListing from "./users/UserListing";
import RepoListing from "./repos/RepoListing";
import IssueListing from "./issues/IssueListing";

const SearchResult: React.FC<{
  searchType: string;
  keyword: string;
}> = ({ searchType, keyword }) => {
  const userState = useSelector((state: RootState) => state.user);
  const repoState = useSelector((state: RootState) => state.repository);
  const issueState = useSelector((state: RootState) => state.issue);
  const dispatch = useDispatch();
  const isKeywordValid = keyword.length >= 3;

  useEffect(() => {
    if (isKeywordValid) {
      getResults();
    }
  }, [keyword, searchType, isKeywordValid]);

  const getResults = useCallback(async () => {
    // fetch users
    if (searchType === ESearchType.Users && keyword !== userState.keyword) {
      dispatch(userAction.getUser({ keyword, page: 1 }));
      const data = await fetchApi(searchType, userState.page, keyword);
      if (!data.success) {
        dispatch(userAction.getUserError(data.error));
        return;
      }
      dispatch(userAction.getUserSuccess({ keyword, results: data.results }));
    }

    // fetch repositories
    if (
      searchType === ESearchType.Repositories &&
      keyword !== repoState.keyword
    ) {
      dispatch(repositoryAction.getRepository({ keyword, page: 1 }));
      const data = await fetchApi(searchType, repoState.page, keyword);
      if (!data.success) {
        dispatch(repositoryAction.getRepositoryError(data.error));
        return;
      }
      dispatch(repositoryAction.getRepositorySuccess(data));
    }

    // fetch issues
    if (searchType === ESearchType.Issues && keyword !== issueState.keyword) {
      dispatch(issueAction.getIssue({ keyword, page: 1 }));
      const data = await fetchApi(searchType, issueState.page, keyword);
      if (!data.success) {
        dispatch(issueAction.getIssueError(data.error));
        return;
      }
      dispatch(issueAction.getIssueSuccess(data));
    }
  }, [keyword, searchType, userState, issueState, repoState]);

  const searchLoading =
    userState.loading || repoState.loading || issueState.loading;

  return (
    <div className="container px-4 px-lg-0">
      {searchType === ESearchType.Users && (
        <>
          {searchLoading && <Loader />}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-start pt-2">
            <UserListing />
          </div>
        </>
      )}
      {searchType === ESearchType.Repositories && (
        <>
          {searchLoading && <Loader />}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 justify-content-start pt-2">
            <RepoListing />
          </div>
        </>
      )}
      {searchType === ESearchType.Issues && (
        <>
          {searchLoading && <Loader />}
          <div className="row row-cols-1 justify-content-start pt-2">
            <IssueListing />
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(SearchResult);
