import { Checkbox, Slider } from "@mui/material";
import React, { FC } from "react";

interface Filters {
  data: any;
  onChange: any;
}

const Filters: FC<Filters> = ({ data, onChange }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onChange(name, checked);
  };

  const handleSliderChange = (name: string, value: number) => {
    onChange(name, value);
  };
  return (
    <div className="w-full lg:w-1/4">
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
          valueLabelDisplay="auto"
          min={10000}
          max={300000}
        />
      </div>
    </div>
  );
};

export default Filters;
