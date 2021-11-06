import React from "react";
import Switch from "@mui/material/Switch";
import reducer, { STATUSES } from "./reducer";

const Toggle = () => {
  const [status, dispatch] = React.useReducer(reducer, STATUSES.OFF);

  return (
    <div>
      <Switch
        id="toggle"
        onChange={() => {
          // 1. Dispatch a "toggle" action to the reducer
        }}
        // 2. Set "checked" attribute to `true`, if the status is "ON" />
      />
      <label htmlFor="toggle">{status}</label>
    </div>
  );
};

export default Toggle;
