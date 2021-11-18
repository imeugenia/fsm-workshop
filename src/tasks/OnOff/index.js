// 💡 Start this task from `./reducer` file. Follow instructions in the comments.
// In case you need help, feel free to ask your mentor or check the right
// solution in `src/examples`.

import React from "react";
import Switch from "@mui/material/Switch";
import reducer, { STATUSES } from "./reducer";

const Toggle = () => {
  // The first argument of `useReducer` is the function handling the logic of
  // going from one state to the other and the second argument is the default
  // state (off, because we are environmental-friendly).
  // See: https://reactjs.org/docs/hooks-reference.html#usereducer
  const [status, dispatch] = React.useReducer(reducer, STATUSES.OFF);

  return (
    <div>
      <Switch
        id="toggle"
        // 3️⃣  Dispatch a "toggle" action to the reducer
        onChange={() => dispatch("TOGGLE")}
        // 4️⃣  Set "checked" attribute to `true`, if the status is "ON" />
        checked={status === STATUSES.ON}
      />
      <label htmlFor="toggle">{status}</label>
    </div>
  );
};

export default Toggle;
