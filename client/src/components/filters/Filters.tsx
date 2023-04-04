import { Checkbox, Slider } from "@mui/material";
import React, { FC } from "react";

interface Filters {
  data: any;
  onChange: any;
}

const Filters: FC<Filters> = ({ data, onChange }) => {
  console.log("DATA", data);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onChange(name, checked);
  };

  const handleSliderChange = (name: string, value: number) => {
    onChange(name, value);
  };

  return (
    //Remote, salary, date de publication

    <div className="w-1/4 h-screen">
      <div>
        Remote:
        <Checkbox name="remote" onChange={handleCheckboxChange} />
      </div>
      <div>
        Salary :
        <Slider
          name="min-salary"
          onChange={(event, newValue) => handleSliderChange("minSalary", newValue as number)}
          aria-label="Always visible"
          defaultValue={20000}
          step={5000}
          valueLabelDisplay="on"
          min={10000}
          max={300000}
        />
      </div>
    </div>
  );
};

export default Filters;
