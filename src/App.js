import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import QuizNoFSM from "./examples/QuizNoFSM";
import QuizFSM from "./examples/QuizFSM";
import Toggle from "./examples/OnOff";
import Demo from "./demo/QuizFsmVanillaFunctions";
import TaskQuiz from "./tasks/QuizFSM";
import TaskToggle from "./tasks/OnOff";
import Slides from "./theory/Slides";

export default function App() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Theory
              </ListSubheader>
            }
          >
            <ListItem>
              <Link to="/slides">Slides</Link>
            </ListItem>
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Tasks
              </ListSubheader>
            }
          >
            <ListItem>
              <Link to="/task-switch">Simple task</Link>
            </ListItem>
            <ListItem>
              <Link to="/task-quiz">Advanced task</Link>
            </ListItem>
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Examples
              </ListSubheader>
            }
          >
            <ListItem button>
              <Link to="/quiz-no-fsm">"No-FSM" Example</Link>
            </ListItem>
            <ListItem button>
              <Link to="/quiz-fsm">"FSM" Example</Link>
            </ListItem>
            <ListItem>
              <Link to="/switch">Switch example</Link>
            </ListItem>
          </List>
        </Drawer>
        <Container>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Switch>
              <Route exact path="/demo">
                <Demo />
              </Route>

              <Route exact path="/slides">
                <Slides />
              </Route>
              <Route exact path="/quiz-no-fsm">
                <h1>Quiz example without a FSM</h1>
                <QuizNoFSM />
              </Route>
              <Route exact path="/quiz-fsm">
                <h1>Quiz example with a FSM</h1>
                <QuizFSM />
              </Route>
              <Route exact path="/switch">
                <h1>Switch example</h1>
                <Toggle />
              </Route>
              <Route exact path="/task-quiz">
                <h1>Implement a quiz as a FSM!</h1>
                <TaskQuiz />
              </Route>
              <Route exact path="/task-switch">
                <h1>Implement a switch as a FSM!</h1>
                <TaskToggle />
              </Route>
            </Switch>
          </Box>
        </Container>
      </Box>
    </Router>
  );
}
