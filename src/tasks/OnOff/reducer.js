export const STATUSES = {
  // 1️⃣  Add "ON" and "OFF" statuses
};

const reducer = (status, action) => {
  switch (action) {
    // 2️⃣  Add a switch case as follows:
    //    If a "toggle" action is received and the status is "ON", change status to "OFF".
    //    Otherwise, change it to "ON".
    default: {
      return status;
    }
  }
};

export default reducer;
