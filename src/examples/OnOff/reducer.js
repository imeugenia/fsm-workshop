export const STATUSES = {
  ON: "ON",
  OFF: "OFF",
};

const reducer = (status, action) => {
  switch (action) {
    case "toggle": {
      if (status === STATUSES.ON) {
        return STATUSES.OFF;
      } else {
        return STATUSES.ON;
      }
    }

    default: {
      return status;
    }
  }
};

export default reducer;
