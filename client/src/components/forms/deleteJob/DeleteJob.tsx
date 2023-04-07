import { useMutation } from "@apollo/client";
import { Backdrop, Button } from "@mui/material";
import { FC, Fragment } from "react";
import DELETEJOB_MUTATION from "../../../graphql/MUTATION/DeleteJob.mutation";

interface DeleteJobProps {
  onClick: any /* () => void; */;
  id: string;
}

const DeleteJob: FC<DeleteJobProps> = ({ onClick, id }) => {
  const [deleteJob, { data, error, loading }] = useMutation(DELETEJOB_MUTATION);

  const handleDeletion = async (event: React.MouseEvent) => {
    event.stopPropagation();
    const response = await deleteJob({ variables: { id } });
    console.log(response);
    onClick(event);
  };

  return (
    <Fragment>
      <div
        className="fixed left-0 top-0 w-full h-screen bg-slate-600 bg-opacity-50 z-10 flex justify-center items-center"
        onClick={onClick}
      ></div>
      <div className="fixed text-center left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-20 bg-white w-full max-w-2xl py-8">
        <p className="text-lg mb-3">Do you really want to delete this offer?</p>
        <Button variant="contained" color="error" onClick={handleDeletion}>
          Delete
        </Button>
      </div>
    </Fragment>
  );
};

export default DeleteJob;
