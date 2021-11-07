// 💡 Start this task from `./reducer` file. Follow instructions in the comments.
// In case you need help, feel free to ask your mentor or check the right solution in `src/examples`.

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
          // 3️⃣  Dispatch a "toggle" action to the reducer
        }}
        // 4️⃣  Set "checked" attribute to `true`, if the status is "ON" />
      />
      <label htmlFor="toggle">{status}</label>
    </div>
  );
};

export default Toggle;
