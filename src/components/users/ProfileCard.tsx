import React, { PropsWithChildren } from "react";

interface IProfile {
  avatar?: string;
  url?: string;
  title?: string;
  label?: string;
  id?: number;
  handleShow?: (id: string) => void;
  openModal: boolean;
}

const ProfileCard: React.FC<PropsWithChildren<IProfile>> = (props) => {
  const showCliclView = props.openModal ? true : false;
  const handleShow = (id: string) => props.handleShow!(id);

  let avatar = <i className="fa-brands fa-github fa-2xl"></i>;
  if (props.avatar) {
    avatar = (
      <img
        className="profile-picture rounded-circle"
        src={props.avatar}
        alt={props.title}
      />
    );
  }

  let title = <h6 className="my-0 text-break">{props.title}</h6>;

  if (props.url) {
    avatar = (
      <a href={props.url} title={props.title}>
        {avatar}
      </a>
    );
    title = (
      <a
        className="text-decoration-none text-muted"
        title={props.title}
        href={props.url}
      >
        {title}
      </a>
    );
  }
  return (
    <div className="d-flex align-items-center justify-content-start">
      <div>{avatar}</div>
      <div className="d-flex mx-1 row align-items-center justify-content-center">
        {title}
        {props.label && <p className="py-0 my-0">{props.label}</p>}
        {showCliclView && (
          <a
            href="#"
            title={props.title}
            className="text-decoration-none text-muted small"
          >
            <p
              className="pt-1 p-0 m-0 small"
              onClick={() => handleShow(`${props.id}`)}
            >
              Click to view
            </p>
          </a>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default ProfileCard;
