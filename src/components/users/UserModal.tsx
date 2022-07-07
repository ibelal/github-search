import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import ProfileCard from "./ProfileCard";
import { fetchUrl } from "../../services/api";
import { RootState } from "../../store";
import { userAction } from "../../store/userSlice";
import Loader from "../Layout/Loader";

const UserModal: React.FC<{
  handleClose: (event: boolean) => void;
  show: string;
  data: any;
}> = ({ handleClose, show, data }) => {
  const userState = useSelector((state: RootState) => state.user);
  const repos = userState.repos!;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDetails();
    fetchRepos();
  }, []);

  const fetchDetails = useCallback(async () => {
    if (data.url) {
      dispatch(userAction.getUserDetails());
      const response = await fetchUrl(data.url);
      if (!response.success) {
        dispatch(userAction.getUserDetailsError(response.error));
        return;
      }
      dispatch(userAction.getUserDetailsSuccess(response.results));
    }
  }, [data.url]);

  const fetchRepos = useCallback(async () => {
    if (data.repos_url) {
      dispatch(userAction.getUserRepos());
      const response = await fetchUrl(data.repos_url);
      if (!response.success) {
        dispatch(userAction.getUserReposError(response.error));
        return;
      }
      dispatch(userAction.getUserReposSuccess(response.results));
    }
  }, [data.repos_url]);

  const closeModal = () => handleClose(false);

  return (
    <Modal centered show={show ? true : false} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>
          <h5>Github Profile</h5>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col">
            <ProfileCard
              avatar={data.avatar_url}
              title={data.login}
              id={data.id}
              url={data.html_url}
              openModal={false}
            >
              {userState.userDetails?.location && (
                <span>
                  <i className="fa-solid fa-location-dot pr-5"></i>
                  {userState.userDetails?.location}
                </span>
              )}
            </ProfileCard>
          </div>
          <div className="col align-items-center">
            <>
              <a
                target="_blank"
                href={data.html_url + "?tab=followers"}
                className="text-decoration-none text-muted"
              >
                <p className="p-0 m-0">
                  <strong>Followers: </strong>
                  {userState.userDetails?.followers}
                </p>
              </a>
              <a
                target="_blank"
                href={data.html_url + "?tab=following"}
                className="text-decoration-none text-muted"
              >
                <p className="p-0 m-0">
                  <strong>Following: </strong>
                  {userState.userDetails?.following}
                </p>
              </a>
            </>
          </div>
        </div>
        <hr />
        {repos && repos.length === 0 && <p>No repository found.</p>}
        {repos && repos.length > 0 && (
          <>
            <h6>Repositories</h6>
            {userState.loading && <Loader />}
            <div className="row row-cols-2">
              {repos &&
                repos
                  .filter((item, index) => index < 6)
                  .map((repo: any) => (
                    <div className="col border py-1" key={repo.id}>
                      <a
                        href={repo.html_url}
                        title={repo.name}
                        target="_blank"
                        className="text-decoration-none text-muted"
                      >
                        {repo.name}
                      </a>
                    </div>
                  ))}
            </div>
          </>
        )}
        {repos && repos.length > 5 && (
          <div className="row">
            <div className="col py-1 text-end">
              <a
                target="_blank"
                href={data.html_url + "?tab=repositories"}
                title="View more"
                className="text-decoration-none text-muted"
              >
                View more
              </a>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={closeModal}
          className="btn-sm dark-btn"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
