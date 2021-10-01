import "./styles.css";
import SideMenu from "./components/SideMenu";
import Operator from "./components/Operator/";
import Recruter from "./components/Recruter/";
import LoginForm from "./components/LoginForm";
import Statistics from "./components/Statistics/";
import {homepage} from "./components/homepage";
import Modal from './components/Modal';
import ModalChangeHR from './components/ModalChangeHR';
import SideInfo from "./components/SideInfo";

import { useReducer} from "react";
import { reducer } from "./store/reducer";
import {ContextApp} from "./store/ContextApp";
import { initialState } from "./store/initialState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //console.log("state process.env",state.environment)

  // Если не авторизован
  if (!state.login) return <LoginForm state={state} dispatch={dispatch}/>

  return (
    <ContextApp.Provider value={{dispatch, state}}>
    <Router>
      <div className={`App container ${state.appShadow ? "shading" : ""}`}>

        <SideMenu/>

        <Switch>
          <Route path={`${homepage}/operator`}>
            <Operator/>
          </Route>
          <Route path={`${homepage}/recruter`}>
            <Recruter />
          </Route>
          <Route path={`${homepage}/admin`}>
            <p>Admin</p>
          </Route>
          <Route path={`${homepage}/stat`}>
            <Statistics/>
          </Route>
          <Route path={`${homepage}/settings`}>
            <p>Settings</p>
          </Route>
          <Route path={`${homepage}/logout`}>
            <p>Logout</p>
          </Route>
        </Switch>
        {state.modalTime ? <Modal/> : ''}
        {state.modalChangeHR.show ? <ModalChangeHR/> : ''}
        <SideInfo/>

      </div>
    </Router>
    </ContextApp.Provider>
  );
}
