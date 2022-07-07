import React from "react";
import { IIssueType } from "../../constants/searchType";

const IssueItem: React.FC<{ issue: IIssueType }> = ({ issue }) => {
  let state;
  if (issue.state) {
    state = (
      <span
        className={`badge rounded-pill mr-5 ${
          issue.state === "open" ? "bg-success" : "bg-danger"
        } `}
      >
        {issue.state}
      </span>
    );
  }
  return (
    <div className="row">
      <a
        target="_blank"
        href={issue.html_url}
        title={issue.user.login}
        className="d-flex my-2 text-decoration-none text-muted"
      >
        {state}
        <p className="small px-2 mb-1">{issue.user.login} </p>
      </a>
      <a
        target="_blank"
        href={issue.html_url}
        className="text-decoration-none text-muted"
      >
        <h6 className="p-0 m-0">{issue.title}</h6>
      </a>
      {issue.body && (
        <div
          className="small my-2"
          dangerouslySetInnerHTML={{ __html: issue.body }}
        />
      )}
      {issue.labels.length > 0 && (
        <div>
          {issue.labels.map((label: any) => (
            <span key={label.id} className="badge bg-light text-muted">
              {label.name}
            </span>
          ))}
        </div>
      )}

      {issue.user && (
        <div className="d-inline-flex align-items-center justify-content-start">
          <div className="mx-1">
            <a
              className="text-decoration-none text-muted mr-n1"
              target="_blank"
              href={issue.user.url}
              title={issue.user.login}
            >
              <p className="small my-2 mr-3">{issue.user.login}</p>
            </a>
          </div>
          <div className="ml-2">
            <p className="m-0 p-0 small">{` opened  ${new Date(
              issue.created_at
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueItem;
