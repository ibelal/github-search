import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import IssueItem from "./IssueItem";

const IssueListing: React.FC = () => {
  const issue = useSelector((state: RootState) => state.issue);
  return (
    <Fragment>
      {issue.data &&
        issue.data.length > 0 &&
        issue.data.map((item) => (
          <div className="col mb-3" key={item.id}>
            <div className="card rounded-2 p-2 h-100">
              <IssueItem issue={item} key={item.id} />
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default IssueListing;
