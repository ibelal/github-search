import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import RepoItem from "./RepoItem";

const RepoListing: React.FC = () => {
  const repos = useSelector((state: RootState) => state.repository);
  return (
    <Fragment>
      {repos.data &&
        repos.data.length > 0 &&
        repos.data.map((item) => (
          <div className="col mb-3" key={item.id}>
            <div className="card rounded-2 p-2 h-100">
              <RepoItem repo={item} key={item.id} />
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default RepoListing;
