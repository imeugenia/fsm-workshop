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

const TRANSITIONS = {
  start: {
    from: [STATUSES.IDLE, STATUSES.FAILURE, STATUSES.VICTORY, STATUSES.DEFEAT],
    to: STATUSES.LOADING,
  },
  succeed: {
    from: [STATUSES.LOADING],
    to: STATUSES.QUIZ,
  },
  failed: {
    from: [STATUSES.LOADING],
    to: STATUSES.FAILURE,
  },
  submit: {
    from: [STATUSES.QUIZ],
    to: STATUSES.VALIDATION,
  },
  validate_correct: {
    from: [STATUSES.VALIDATION],
    to: STATUSES.VICTORY,
  },
  validate_incorrect: {
    from: [STATUSES.VALIDATION],
    to: STATUSES.DEFEAT,
  },
};

export const initialState = {
  status: STATUSES.IDLE,
  questions: [],
};

function reducer(state, event) {
  const { type, ...rest } = event;

  if (TRANSITIONS[type].from.includes(state.status)) {
    return {
      ...state,
      status: TRANSITIONS[type].to,
      ...rest,
    };
  }

  return state;
}

export default reducer;
