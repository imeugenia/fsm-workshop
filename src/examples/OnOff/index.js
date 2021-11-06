import React from "react";
import Switch from "@mui/material/Switch";
import reducer, { STATUSES } from "./reducer";

const Toggle = () => {
  const [status, dispatch] = React.useReducer(reducer, STATUSES.OFF);

  return (
    <div>
      <Switch
        id="toggle"
        checked={status === STATUSES.ON}
        onChange={() => {
          dispatch("toggle");
        }}
      />
      <label htmlFor="toggle">{status}</label>
    </div>
  );
};

export default Toggle;
