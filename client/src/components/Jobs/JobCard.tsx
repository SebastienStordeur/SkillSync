import { FC, Fragment, useState } from "react";
import MoreInfos from "./MoreInfos/MoreInfos";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import DeleteJob from "../forms/deleteJob/DeleteJob";
import { useNavigate } from "react-router-dom";

const JobCard: FC = (props: any) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { id, title, salary, company, remote, location, userId } = props;
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const navigateToJobDetails = () => {
    if (!modalIsVisible) {
      navigate(`/job/${id}`);
    }
  };

  const toggleModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setModalIsVisible((prevState) => !prevState);
  };

  return (
    <Fragment>
      <article
        onClick={navigateToJobDetails}
        className="p-6 mx-auto w-full max-w-4xl border border-blue bg-white rounded-lg"
      >
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p>
            {company} - {location}
          </p>
        </div>
        <p className="opacity-60">Yearly: {salary} €</p>
        {remote && <MoreInfos />}
        <Button variant="contained">Apply</Button>
        {currentUser.id === userId && (
          <p onClick={toggleModal} className="border p-4 cursor-pointer">
            Delete
          </p>
        )}
      </article>
      {modalIsVisible && <DeleteJob onClick={toggleModal} id={id} />}
    </Fragment>
  );
};

export default JobCard;
