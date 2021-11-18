// 1️⃣  Add "ON" and "OFF" statuses
export const STATUSES = {
  ON: "ON",
  OFF: "OFF",
};

const reducer = (status, action) => {
  switch (action) {
    // @TODO: add a big box-drawing of the state machine for reference.

    // 2️⃣  Add a switch case as follows:
    //     If a "toggle" action is received and the status is "ON", change status
    //     to "OFF". Otherwise, change it to "ON".
    case "TOGGLE":
      return status === STATUSES.OFF ? STATUSES.ON : STATUSES.OFF;
    default: {
      return status;
    }
  }
};

export default reducer;
