import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import SearchResult from "../components/SearchResult";
import { ESearchType } from "../constants/searchType";

const HomePage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [tempKeyword, setTempKeyword] = useState<string>("");
  const [searchType, setSearchType] = useState<string>(ESearchType.Users);
  const isKeywordValid = keyword.length >= 3;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setKeyword(tempKeyword);
    }, 500);

    return () => clearTimeout(timeout);
  }, [tempKeyword]);

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setTempKeyword(e.target.value);
  };

  const onChangeSearchType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  return (
    <>
      <div
        className={`container-fluid d-flex align-items-center justify-content-center ${
          !isKeywordValid ? "full-height" : "py-4 transition"
        }`}
      >
        <div className="media w-400">
          <div className="d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <i className="fa-brands fa-github fa-2xl"></i>
            </div>
            <div className="d-flex mx-1 row align-items-center justify-content-center">
              <h4 className="my-0">Github Searcher</h4>
              <p className="py-0 my-0">
                Search users, repositories, issues below
              </p>
            </div>
          </div>
          <div className="media-body pt-2">
            <div className="input-group ml-2 pl-2 ">
              <input
                className="form-control rounded-start"
                type="search"
                value={tempKeyword}
                placeholder="Search user, repositories, issues"
                aria-describedby="search-button"
                onChange={onChangeKeyword}
                ref={inputRef}
              />
              <div className="input-group-prepend pl-2">
                <select
                  className="custom-select form-select rounded-end border-start-0 border-radius-none "
                  onChange={onChangeSearchType}
                  defaultValue={ESearchType.Users}
                >
                  <option value={ESearchType.Users}>Users</option>
                  <option value={ESearchType.Repositories}>Repositories</option>
                  <option value={ESearchType.Issues}>Issues</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isKeywordValid && (
        <SearchResult searchType={searchType} keyword={keyword} />
      )}
    </>
  );
};

export default React.memo(HomePage);
