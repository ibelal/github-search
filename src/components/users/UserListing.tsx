import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import UserItem from "./UserItem";

const UserListing: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  return (
    <Fragment>
      {userState.data &&
        userState.data.length > 0 &&
        userState.data.map((item) => (
          <div className="col mb-3 align-items-stretch" key={item.id}>
            <div className="card rounded-2 p-2">
              <UserItem user={item} key={item.id} />
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default UserListing;
