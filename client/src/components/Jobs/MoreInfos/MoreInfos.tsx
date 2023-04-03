import { FC } from "react";

const MoreInfos: FC = () => {
  return (
    <div className="relative w-full my-4">
      <h3 className="italic text-sm">Complementary informations</h3>
      <div className="flex gap-4">
        <span className="flex justify-center items-center px-2 bg-grey w-fit text-sm text-dark font-semibold mt-2">
          Remote
        </span>
        <span className="flex justify-center items-center px-2 bg-grey w-fit text-sm text-dark font-semibold mt-2">
          Full Time
        </span>
      </div>
    </div>
  );
};

export default MoreInfos;
