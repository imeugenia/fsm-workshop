export const STATUSES = {
  IDLE: "IDLE",
  LOADING_QUIZ: "LOADING_QUIZ",
  FAILURE: "FAILURE",
  QUIZ: "QUIZ",
  VALIDATION: "VALIDATION",
  VICTORY: "VICTORY",
  DEFEAT: "DEFEAT",
};

export const EVENTS = {
  start: "start",
  succeed: "succeed",
  failed: "failed",
  submit: "submit",
  validate_correct: "validate_correct",
  validate_incorrect: "validate_incorrect",
};

export const initialState = {
  status: STATUSES.IDLE,
  error: "",
  questions: [],
};

function reducer(state, action) {
  switch (action.event) {
    case EVENTS.start: {
      return {
        ...initialState,
        status: STATUSES.LOADING_QUIZ,
      };
    }

    case EVENTS.succeed: {
      return {
        ...initialState,
        questions: action.questions,
        status: STATUSES.QUIZ,
      };
    }

    case EVENTS.failed: {
      return {
        ...initialState,
        error: "Error when loading questions",
        status: STATUSES.FAILURE,
      };
    }

    case EVENTS.submit: {
      return {
        ...state,
        status: STATUSES.VALIDATION,
      };
    }

    case EVENTS.validate_correct: {
      return {
        ...state,
        status: STATUSES.VICTORY,
      };
    }

    case EVENTS.validate_incorrect: {
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
