export const STATES = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  FAILURE: "FAILURE",
  QUIZ: "QUIZ",
  VALIDATION: "VALIDATION",
  RESULT: "RESULT",
};

export const EVENTS = {
  click: "click",
  succeed: "succeed",
  failed: "failed",
  submit: "submit",
  validated: "validated",
};

function idle(currentState, event) {
  switch (event) {
    case EVENTS.click: {
      return STATES.LOADING;
    }
    // ...
    default: {
      return currentState;
    }
  }
}

function loading(currentState, event) {
  switch (event) {
    case EVENTS.succeed: {
      return STATES.QUIZ;
    }

    case EVENTS.failed: {
      return STATES.FAILURE;
    }

    default: {
      return currentState;
    }
  }
}

function failure(currentState, event) {
  switch (event) {
    case EVENTS.click: {
      return STATES.IDLE;
    }

    default: {
      return currentState;
    }
  }
}

function quiz(currentState, event) {
  switch (event) {
    case EVENTS.submit: {
      return STATES.VALIDATION;
    }

    default: {
      return currentState;
    }
  }
}

function validation(currentState, event) {
  switch (event) {
    case EVENTS.validated: {
      return STATES.RESULT;
    }

    default: {
      return currentState;
    }
  }
}

function result(currentState, event) {
  switch (event) {
    case EVENTS.click: {
      return STATES.LOADING;
    }

    default: {
      return currentState;
    }
  }
}
// ...

function transition(currentState, event) {
  console.log(currentState);

  switch (currentState) {
    case STATES.IDLE: {
      return idle(currentState, event);
    }
    case STATES.LOADING: {
      return loading(currentState, event);
    }
    case STATES.FAILURE: {
      return failure(currentState, event);
    }

    case STATES.QUIZ: {
      return quiz(currentState, event);
    }

    case STATES.VALIDATION: {
      return validation(currentState, event);
    }

    case STATES.RESULT: {
      return result(currentState, event);
    }

    default: {
      return currentState;
    }
  }
}

export const getInitialState = () => ({
  value: STATES.IDLE,
  data: null,
});

export default transition;

// const machine = {
//   context: {
//     question: null,
//   },
//   states: {
//     IDLE: {
//       on: {
//         click: { target: "LOADING" },
//       },
//     },
//     LOADING: {
//       invoke: {
//         src: () => fetchQuestion(),
//         onDone: {
//           target: "SUCCESS",
//           actions: assign({ question: (context, event) => event.data }),
//         },
//         onError: {
//           target: "FAILURE",
//         },
//       },
//     },
//   },
// };

// ...
