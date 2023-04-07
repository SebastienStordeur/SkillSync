import { FC, Fragment } from "react";
import CreateJobForm from "../forms/createJob/CreateJobForm";

interface BackdropInterface {
  onClick: () => void;
}

const Backdrop: FC<BackdropInterface> = ({ onClick }) => {
  return (
    <Fragment>
      <div
        className="fixed top-0 w-full h-screen bg-slate-600 bg-opacity-50 z-10 flex justify-center items-center"
        onClick={onClick}
      ></div>
      <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-20 bg-white w-full max-w-4xl py-8">
        <CreateJobForm />
      </div>
    </Fragment>
  );
};

export default Backdrop;
