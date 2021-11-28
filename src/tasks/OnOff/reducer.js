export const STATUSES = {
  // 1️⃣  Add "ON" and "OFF" statuses
};

const reducer = (status, event) => {
  switch (event) {
    // 💡 Check `src/tasks/OnOff/switch-state-chart.png` file to get a better
    // idea of possible events and transitions.
    // 2️⃣  Add a switch case as follows:
    //    If a "toggle" event is received and the status is "ON", change status
    //    to "OFF". Otherwise, change it to "ON".
    default: {
      return status;
    }
  }
};

export default reducer;
