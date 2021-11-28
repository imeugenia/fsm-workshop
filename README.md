# Finite State Machine in React applications

State management is a hard problem in applications not only on a global but also on the component level. It happens that components are over-stacked with boolean variables like `isLoading` , `isError`, and so on. That makes logic convoluted and easy to cause a bug.

This workshop is for developers with some experience in React who want to try shifting their state management paradigm. You will learn about a finite state machine pattern, draw your first state chart and implement a simple state machine using React without any additional library.

By the end of the workshop, you will be able to implement the UI component state in a more clean and bug-free way.

## Prerequisites

- Experience with React and React hooks

### Setup

If you would like to commit and push your work at the end of the workshop, you should fork first and then clone your fork repository.

Run these commands to set up the project:

```sh
git clone https://github.com/imeugenia/fsm-workshop.git
cd fsm-workshop
yarn
```

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Running the app

```sh
yarn start
```

### Exercises

- `src/tasks/OnOff` — a simple 2-state finite state machine implementation for a Toggle component.
- `src/tasks/QuizFSM` — a more advanced finite state machine for a quiz application.

You will find comments with instruction in both exercises. Some tips on how to follow them:

- Both exercises start from `./reducer.js` files
- Each instruction step is marked with number emoji, e.g. 1️⃣. Follow them in ascending order.
- Helpful emojis:
  - 💡 gives you useful tips
  - ❗️ warns you about possible pitfalls
  - 🔥 gives you an extra task
  - 🏃 reminds when its time to run the app and check if your code is working.
