import React, { useState } from "react";
import UserModal from "./UserModal";
import ProfileCard from "./ProfileCard";
import { IUserType } from "../../constants/searchType";

const UserItem: React.FC<{ user: IUserType }> = ({ user }) => {
  const [show, setShow] = useState<string | null>(null);

  const handleClose = () => setShow(null);
  const handleShow = (id: string) => setShow(id);

  return (
    <div className="justify-content-start">
      <ProfileCard
        avatar={user.avatar_url}
        label=""
        title={user.login}
        url={user.html_url}
        id={user.id}
        handleShow={handleShow}
        openModal={true}
      />
      {show && <UserModal data={user} show={show} handleClose={handleClose} />}
    </div>
  );
};

export default UserItem;
