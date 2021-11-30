export const STATUSES = {
  IDLE: "IDLE",
  LOADING: "LOADING",
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
  questions: [],
};

function reducer(state, event) {
  switch (event.type) {
    case EVENTS.start: {
      if (
        ![STATUSES.QUIZ, STATUSES.FAILURE, STATUSES.VALIDATION].includes(
          state.status
        )
      ) {
        return {
          ...initialState,
          status: STATUSES.LOADING,
        };
      }

      return state;
    }

    case EVENTS.succeed: {
      return {
        ...initialState,
        questions: event.questions,
        status: STATUSES.QUIZ,
      };
    }

    case EVENTS.failed: {
      return {
        ...initialState,
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
