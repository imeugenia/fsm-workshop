export const STATUSES = {
  IDLE: "IDLE",
  LOADING_QUIZ: "LOADING_QUIZ",
  FAILURE: "FAILURE",
  QUIZ: "QUIZ",
  LOADING_RESULTS: "LOADING_RESULTS",
  VICTORY: "VICTORY",
  DEFEAT: "DEFEAT",
};

export const initialState = {
  status: STATUSES.IDLE,
  error: "",
  questions: [],
};

function reducer(state, action) {
  switch (action.event) {
    case "start": {
      return {
        ...initialState,
        status: STATUSES.LOADING_QUIZ,
      };
    }

    case "request_succeed": {
      return {
        ...initialState,
        questions: action.questions,
        status: STATUSES.QUIZ,
      };
    }

    case "request_failed": {
      return {
        ...initialState,
        error: "Error when loading questions",
        status: STATUSES.FAILURE,
      };
    }

    case "submit": {
      return {
        ...state,
        status: STATUSES.LOADING_RESULTS,
      };
    }

    case "correct": {
      return {
        ...state,
        status: STATUSES.VICTORY,
      };
    }

    case "wrong": {
      return {
        ...state,
        status: STATUSES.DEFEAT,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
