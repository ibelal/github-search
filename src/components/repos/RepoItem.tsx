import React from "react";
import { IRepoType } from "../../constants/searchType";

const RepoItem: React.FC<{ repo: IRepoType }> = ({ repo }) => {
  return (
    <div className="row justify-content-around align-items-stretch">
      <div className="mb-2 align-self-stretch">
        <div className="d-flex">
          <a
            target="_blank"
            href={repo.html_url + "?tab=followers"}
            className="text-decoration-none text-muted"
          >
            <h6 className="p-0 m-0">
              {repo.full_name ? repo.full_name : repo.name}
            </h6>
          </a>
          <span className="badge bg-light text-dark">Public</span>
        </div>
        {repo.description && (
          <p className="my-0 pt-1 pb-3 small text-muted">{repo.description}</p>
        )}
      </div>
      <div className="row pb-1 align-self-end small">
        <div className="col">
          <i className="fa-solid fa-code-branch pr-5" title="forks"></i>
          {repo.forks}
        </div>
        <div className="col">
          <i className="fa-solid fa-star pr-5" title="stargazer"></i>
          {repo.stargazers_count}
        </div>

        <div className="col">
          <i className="fa-solid fa-circle-dot pr-5" title="issues"></i>
          {repo.open_issues}
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
